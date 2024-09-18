import { PageSeo } from "@/sanity/seo-types";
import { Metadata } from "next";

export const getSeoMetadata = (slug: string, seo: PageSeo | null): Metadata => {

    return {
        title: seo?.metaTitle,
        description: seo?.metaDescription,
        keywords: seo?.seoKeywords,
        openGraph: {
            ...seo?.openGraph as any,
            url: `${process.env.SANITY_WEBSITE_ROOT_URL}${slug}`,
            images: seo?.openGraph?.image ? {
                url: seo?.openGraph?.image.asset!.url!
            } : undefined
        },
        twitter: seo?.twitter
    }
}