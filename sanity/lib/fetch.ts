import "server-only";

import type { QueryParams } from "@sanity/client";
import { draftMode } from "next/headers";
import { client } from "./client";
import { QueryOptions } from "next-sanity";

const DEFAULT_PARAMS = {} as QueryParams;
const DEFAULT_TAGS = [] as string[];

export const token = process.env.SANITY_API_READ_TOKEN;

export async function sanityFetch<QueryResponse>({
  query,
  params = {},
  revalidate = 60,
  tags = [],
}: {
  query: string;
  params?: QueryParams;
  revalidate?: number | false;
  tags?: string[];
}) {
  const isDraftMode = draftMode().isEnabled;
  if (isDraftMode && !token) {
    throw new Error("Missing environment variable SANITY_API_READ_TOKEN");
  }

  let dynamicRevalidate = revalidate;
  if (isDraftMode) {
    // Do not cache in Draft Mode
    dynamicRevalidate = 0;
  } else if (tags.length) {
    // Cache indefinitely if tags supplied, purge with revalidateTag()
    dynamicRevalidate = false;
  }

  return client.fetch<QueryResponse>(query, params, {
    ...(isDraftMode &&
      ({
        token: token,
        perspective: "previewDrafts",
        stega: true,
      } satisfies QueryOptions)),
    next: {
      revalidate: dynamicRevalidate,
      tags,
    },
  });
}
