import { SeoMetaFields } from "@/sanity/types";
import { Metadata } from "next";

export const getSeoMetadata = (seo?: SeoMetaFields | null): Metadata => {

    return {
        title: seo?.metaTitle,
        description: seo?.metaDescription,
        keywords: seo?.seoKeywords,
        openGraph: seo?.openGraph,
        twitter: seo?.twitter
    }
}