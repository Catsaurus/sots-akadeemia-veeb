import { MetadataRoute } from "next";

import { client } from "../sanity/lib/client";
import { ContactQuery, MasterClassPathsQuery, SettingsQuery } from "../sanity/lib/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const data = await client.fetch(MasterClassPathsQuery);
	const settings = await client.fetch(SettingsQuery);
	const contacts = await client.fetch(ContactQuery);

	const pages: MetadataRoute.Sitemap = data.map((page: any) => ({
		url: `${process.env.SANITY_WEBSITE_ROOT_URL}${page.params.slug}`,
		lastModified: page.updatedAt,
		changeFrequency: 'weekly',
		priority: 0.9,
	}));

    return [
		{
			url: `${process.env.SANITY_WEBSITE_ROOT_URL}`,
			lastModified: settings._modifiedAt,
			changeFrequency: 'monthly',
			priority: 1,
		},
		{
			url: `${process.env.SANITY_WEBSITE_ROOT_URL}kontakt`,
			lastModified: contacts._modifiedAt,
			changeFrequency: 'monthly',
			priority: 0.8,
		},
        ...pages
	];
};
