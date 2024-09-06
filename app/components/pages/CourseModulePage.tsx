"use client"

import React from 'react'
import { Header } from '../Header';
import Link from "next/link";
import { CourseModule, CourseModuleListQueryResult, MasterClassListQueryResult, SettingsQueryResult } from '@/sanity/types';

interface CourseModulePageProps {
  settings: SettingsQueryResult;
  courseModule: CourseModule;
  masterClasses: MasterClassListQueryResult;
  courseModules: CourseModuleListQueryResult;
}

export default function CourseModulePage({ settings, masterClasses, courseModules, courseModule }: Readonly<CourseModulePageProps>) {

  return (
    <main className="min-h-screen">

      <section style={{ backgroundColor: courseModule?.color }}>
        <Header settings={settings} masterClasses={masterClasses} courseModules={courseModules} />
        <div className='container max-w-screen-xl mx-auto pb-28 pt-10'>

          <div className="mb-4">
            <Link href="/">← Tagasi</Link>
          </div>

          <h1 className="font-display">{courseModule?.name}</h1>

        </div>

      </section>

      <section className='container max-w-screen-xl mx-auto -mt-10'>

      </section>



    </main>
  )
}
