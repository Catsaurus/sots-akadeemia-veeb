// /lib/isUniqueAcrossAllDocuments.ts
import { client } from "./client";

export function isUniqueAcrossAllDocuments(slug: string, options: any) {
    const { document } = options

    const id = document._id.replace(/^drafts\./, '')
    const params = {
        draft: `drafts.${id}`,
        published: id,
        slug
    }

    const query = `!defined(*[!(_id in [$draft, $published]) && _type in ["masterClass", "courseModule", "shortCourse", "genericPage"] && slug.current == $slug][0]._id)`

    return client.fetch(query, params)
}