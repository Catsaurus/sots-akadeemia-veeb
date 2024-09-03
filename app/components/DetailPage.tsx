"use client"

import React from 'react'
import { PortableText } from "@portabletext/react";
import { Header } from './Header';
import Link from "next/link";
import Card from './Card';
import { CalendarEventByCourseQueryResult, MasterClassQueryResult, SettingsQueryResult } from '@/sanity/types';


export const DetailPage = ({ settings, masterClass, events }: {
  settings: SettingsQueryResult, masterClass: MasterClassQueryResult, events: CalendarEventByCourseQueryResult }) => {

  return (
    <main className="min-h-screen">

      <section style={{ backgroundColor: masterClass?.color?.hex }}>
        <Header settings={settings} />
        <div className='container max-w-screen-xl mx-auto pb-28 pt-10'>

          <div className="mb-4">
            <Link href="/">← Tagasi</Link>
          </div>

          <h1 className="font-display">{masterClass?.name}</h1>

        </div>

      </section>

      <section className='container max-w-screen-xl mx-auto -mt-10'>
        <Card title="Üldinfo" content={!!masterClass?.body && <PortableText value={masterClass?.body} />}></Card>


        <Card title="Järgmine event" content={events[0]?.startDate}></Card>


        <Card title="Keda ootame osalema" content={masterClass?.minParticipants}></Card>


        <div className='grid grid-cols-2 cap-10'>
          <Card title="Keda ootame osalema" content={masterClass?.minParticipants}></Card>
          <Card title="Tasumine" content={masterClass?.minParticipants}></Card>

        </div>

        <Card title="Kes õpetavad?" content={'keegi ikka'}></Card>



        <p>{masterClass?.registrationLink}</p>

      </section>



    </main>
  )
}
