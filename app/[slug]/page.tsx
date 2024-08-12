import React from 'react';
import { SanityDocument } from "next-sanity";
import { meistriklassPathsQuery, MEISTRIKLASS_QUERY } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/fetch";
import { client } from "@/sanity/lib/client";
import { DetailPage } from '../components/DetailPage';


export async function generateStaticParams() {
    const meistriklassid = await client.fetch(meistriklassPathsQuery)
    return meistriklassid
}


const MeistriklassPage = async ({ params }: { params: any }) => {
    const meistriklass = await sanityFetch<SanityDocument>({ query: MEISTRIKLASS_QUERY, params })
    
    return (
        <DetailPage meistriklass={meistriklass}></DetailPage>
    )
}

export default MeistriklassPage