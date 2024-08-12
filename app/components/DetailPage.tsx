"use client"

import React from 'react'
import { SanityDocument } from "next-sanity";
import { PortableText } from "@portabletext/react";
import { Header } from './Header';
import Link from "next/link";
import Card from './Card';


export const DetailPage = ({ meistriklass }: { meistriklass: SanityDocument }) => {
  return (
    <main className="min-h-screen">

      <section style={{ ["background-color" as any]: meistriklass.color.value }}>
        <Header />
        <div className='container max-w-screen-xl mx-auto pb-28 pt-10'>

          <div className="mb-4">
            <Link href="/">← Tagasi</Link>
          </div>

          <h1 className="font-display">{meistriklass?.name}</h1>

        </div>

      </section>

      <section className='container max-w-screen-xl mx-auto -mt-10'>
        <Card title="Üldinfo" content={meistriklass}></Card>


        <Card title="Moodulid ja meistriklassi graafik" content={meistriklass?.ainedList}></Card>


        <Card title="Keda ootame osalema" content={meistriklass?.minOsalejaArv}></Card>


        <div className='grid grid-cols-2 cap-10'>
          <Card title="Keda ootame osalema" content={meistriklass?.minOsalejaArv}></Card>
          <Card title="Tasumine" content={meistriklass?.minOsalejaArv}></Card>

        </div>

        <Card title="Kes õpetavad?" content={meistriklass?.minOsalejaArv}></Card>



        <p>{meistriklass?.register}</p>

      </section>



    </main>
  )
}
