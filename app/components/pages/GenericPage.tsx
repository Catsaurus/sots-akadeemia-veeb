"use client"

import React from 'react'
import { Header } from '../Header';
import Link from "next/link";
import {
  CalendarQueryResult,
  CourseModuleListQueryResult,
  GenericPage,
  MasterClassListQueryResult,
  SettingsQueryResult,
  ShortCourseListQueryResult
} from '@/sanity/types';
import { PortableText } from 'next-sanity';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/20/solid';
import { formatDate } from 'date-fns';

interface GenericPageProps {
  settings: SettingsQueryResult;
  page: GenericPage;
  calendar: CalendarQueryResult;
  masterClasses: MasterClassListQueryResult;
  courseModules: CourseModuleListQueryResult;
  shortCourses: ShortCourseListQueryResult;
}

export default function GenericPageComponent({
  settings, masterClasses, courseModules, shortCourses, calendar, page
}: Readonly<GenericPageProps>) {

  return (
    <main className="min-h-screen">

      <section>
        <Header settings={settings} masterClasses={masterClasses} courseModules={courseModules} />
        <div className='container max-w-screen-xl mx-auto pb-28 pt-10'>

          <div className="mb-4">
            <Link href="/">← Tagasi</Link>
          </div>

          <h1 className="font-display">{page?.name}</h1>
      
        </div>

      </section>

      <section className='container max-w-screen-xl mx-auto -mt-10 flex flex-col gap-10'>
        { page.blocks?.map(block => {
          if (block._type === 'textBlock' && block.content) {
            return <div key={block._key}><PortableText value={block?.content} /></div>
          }
          if (block._type === 'shortCourseTable') {
            return (
              <ShortCourseTable key={block._key} shortCourses={shortCourses} calendar={calendar} />
            )
          }
          return null;
        })
        }
      </section>



    </main>
  )
}

interface ShortCourseTableProps {
  shortCourses: ShortCourseListQueryResult;
  calendar: CalendarQueryResult;
}

function ShortCourseTable({ shortCourses, calendar }: Readonly<ShortCourseTableProps>) {
  const sortedCourses = shortCourses.toSorted((a, b) => a.courseModule!.localeCompare(b.courseModule!));

  const courseModules: { courseModule: string; courses: ShortCourseListQueryResult; }[] = [];
  for (const course of sortedCourses) {
    const existing = courseModules.find(m => m.courseModule === course.courseModule);
    if (!existing) {
      courseModules.push({
        courseModule: course.courseModule!,
        courses: [course]
      });
    } else {
      existing.courses.push(course);
    }
  }


  const getNextEvent = (courseSlug?: string) => {
    if (!courseSlug) {
      return '';
    }
    const event = calendar.find(e => e.course.slug === courseSlug);
    if (!event) {
      return '';
    }

    return `${formatDate(event.startDate!, 'dd.MM.yyyy')}${event.endDate ? ' - ' +formatDate(event.endDate, 'dd.MM.yyyy') : ''}`;
  }

  return (
    <table className="w-full text-sm text-left text-gray-500">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
      <tr>
        <th className="px-6 py-3">Eriklass</th>
        <th className="px-6 py-3">Lühiklass</th>
        <th className="px-6 py-3">Toimumise aeg</th>
        <th className="px-6 py-3"></th>
      </tr>
    </thead>
    {
      courseModules.map(m => (
        <tbody key={m.courseModule} className="border-b">
          { m.courses.map((c, i) => (
            <tr key={c._id} className="bg-white">
              { i === 0 && <td className="px-6 py-3 font-semibold" rowSpan={m.courses.length}>{ m.courseModule }</td> }
              <td className="px-6 py-3">
                <Link href={`/${c.slug?.current}`} target="_blank" className="underline">{ c.name }</Link>
              </td>
              <td className="px-6 py-3">{ getNextEvent(c.slug?.current) }</td>
              <td>
                <button className="rounded-lg bg-blue px-4 py-2 flex items-center gap-2">
                  Registreeri
                  <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>))
    }
  </table>
  )

}