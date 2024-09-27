import type { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/'
    },
    sitemap: `${process.env.SANITY_WEBSITE_ROOT_URL}sitemap.xml`,
  }
}
