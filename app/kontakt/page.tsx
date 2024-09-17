import React from 'react';

import { client } from "@/sanity/lib/client";
import { sanityFetch } from "@/sanity/lib/fetch";
import { 
    ContactQuery,
    CourseModuleListQuery,
    MasterClassListQuery,
    MasterClassPathsQuery,
    SettingsQuery,
    TeachersQuery
} from "@/sanity/lib/queries";
import {
    ContactQueryResult,
    CourseModuleListQueryResult,
    MasterClassListQueryResult,
    SettingsQueryResult,
    TeachersQueryResult
} from '@/sanity/types';

import ContactPage from '../components/pages/ContactPage';

export async function generateStaticParams() {
    return await client.fetch(MasterClassPathsQuery);
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
