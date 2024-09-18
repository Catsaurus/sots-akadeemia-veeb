import React from 'react';

import { sanityFetch } from "@/sanity/lib/fetch";
import { 
    ContactQuery,
    CourseModuleListQuery,
    MasterClassListQuery,
    SettingsQuery,
} from "@/sanity/lib/queries";
import {
    ContactQueryResult,
    CourseModuleListQueryResult,
    MasterClassListQueryResult,
    SeoMetaFields,
    SettingsQueryResult,
} from '@/sanity/types';

import ContactPage from '../components/pages/ContactPage';
import { Metadata } from 'next';
import { getSeoMetadata } from '../helpers/metadata.helper';

export async function generateMetadata(): Promise<Metadata> {
    // read route params
  
    const contactPage = await sanityFetch<ContactQueryResult>({ query: ContactQuery });

    const seo = contactPage!.seo;

    return getSeoMetadata(seo as unknown as SeoMetaFields);

}

const Page = async ({ params }: { params: any }) => {

    const [settings, masterClasses, courseModules, pageInfo] = await Promise.all([
        sanityFetch<SettingsQueryResult>({ query: SettingsQuery }),
        sanityFetch<MasterClassListQueryResult>({ query: MasterClassListQuery }),
        sanityFetch<CourseModuleListQueryResult>({ query: CourseModuleListQuery }),
        sanityFetch<ContactQueryResult>({ query: ContactQuery, params })
    ]);

    return (
        <ContactPage
            settings={settings}
            masterClasses={masterClasses}
            courseModules={courseModules}
            page={pageInfo}
        />
    )
}

export default Page;
