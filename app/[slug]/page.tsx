import React from 'react';
import { CalendarEventByCourseQuery, MasterClassPathsQuery, MasterClassQuery, SettingsQuery } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/fetch";
import { client } from "@/sanity/lib/client";
import { DetailPage } from '../components/DetailPage';
import { CalendarEventByCourseQueryResult, MasterClassQueryResult, SettingsQueryResult } from '@/sanity/types';


export async function generateStaticParams() {
    return await client.fetch(MasterClassPathsQuery);
}


const MasterClassPage = async ({ params }: { params: any }) => {

    const [settings, masterClass, events] = await Promise.all([
        sanityFetch<SettingsQueryResult>({ query: SettingsQuery }),
        sanityFetch<MasterClassQueryResult>({ query: MasterClassQuery, params }),
        sanityFetch<CalendarEventByCourseQueryResult>({ query: CalendarEventByCourseQuery, params })
    ]);

    return (
        <DetailPage settings={settings} masterClass={masterClass} events={events}></DetailPage>
    )
}

export default MasterClassPage;
