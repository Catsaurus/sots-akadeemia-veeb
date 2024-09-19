import { Metadata } from "next";

import { PageSeo } from "@/sanity/seo-types";

export const getSeoMetadata = (slug: string, seo: PageSeo | null): Metadata => {
    console.log(seo)
    return {
        title: seo?.metaTitle,
        description: seo?.metaDescription,
        keywords: seo?.seoKeywords,
        openGraph: {
            ...seo?.openGraph as any,
            url: `${process.env.SANITY_WEBSITE_ROOT_URL}${slug}`,
            images: seo?.openGraph?.image ? {
                url: seo?.openGraph?.image.asset!.url!
            } : seo?.metaImage ? {
                url: seo.metaImage.asset?.url
            } : undefined
        },
        twitter: seo?.twitter
    }
}