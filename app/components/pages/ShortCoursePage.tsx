"use client"

import React from 'react'
import { Header } from '../Header';
import Link from "next/link";
import Card from '../Card';
import { CalendarEventByCourseQueryResult, CourseModuleListQueryResult, MasterClassListQueryResult, SettingsQueryResult, ShortCourse } from '@/sanity/types';

interface ShortCoursePageProps {
  settings: SettingsQueryResult;
  shortCourse: ShortCourse;
  events: CalendarEventByCourseQueryResult;
  masterClasses: MasterClassListQueryResult;
  courseModules: CourseModuleListQueryResult;
}

export const ShortCoursePage = ({ settings, masterClasses, courseModules, shortCourse, events }: Readonly<ShortCoursePageProps>) => {

  return (
    <main className="min-h-screen">

      <section>
        <Header settings={settings} masterClasses={masterClasses} courseModules={courseModules} />
        <div className='container max-w-screen-xl mx-auto pb-28 pt-10'>

          <div className="mb-4">
            <Link href="/">← Tagasi</Link>
          </div>

          <h1 className="font-display">{shortCourse?.name}</h1>

        </div>

      </section>

      <section className='container max-w-screen-xl mx-auto -mt-10'>


        <Card title="Järgmine event" content={events[0]?.startDate}></Card>


        <Card title="Klassi maht" content={shortCourse?.courseSize}></Card>


        <div className='grid grid-cols-2 cap-10'>
          <Card title="Min osalejaid" content={shortCourse?.minParticipants}></Card>
          <Card title="Max osalejaid" content={shortCourse?.maxParticipants}></Card>

        </div>

      </section>



    </main>
  )
}
