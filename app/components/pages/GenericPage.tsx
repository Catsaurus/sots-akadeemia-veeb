"use client"

import { ArrowLongRightIcon } from "@heroicons/react/24/solid";
import { PortableText } from 'next-sanity';
import React from 'react'

import {
  CalendarQueryResult,
  CourseModuleListQueryResult,
  GenericPage,
  MasterClassListQueryResult,
  SettingsQueryResult,
  ShortCourseListQueryResult
} from '@/sanity/types';

import PageLayout from '../layout/PageLayout';
import ShortCourseTable from '../ShortCourseTable';
import ServiceProcess from "./../ServiceProcess";


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
    <PageLayout
      title={page?.name}
      settings={settings}
      masterClasses={masterClasses}
      courseModules={courseModules}
    >
  {page?.slug?.current === 'luhiklassid' &&
      <div className='inline-block bg-gray-200 p-4 mb-10 rounded-md items-center overflow-x-scroll w-full'>
        <div className='flex flex-row gap-2 ali'>
          <ServiceProcess step={"Registreerid klassi"} number='1'></ServiceProcess>
          <ArrowLongRightIcon className="size-10 mt-10" />
          <ServiceProcess step={"Kirjutame sulle 1-4 päeva jooksul ja saadame arve"} number='2'></ServiceProcess>
          <ArrowLongRightIcon className="size-10 mt-10" />
          <ServiceProcess step={"Tasud arve vastavalt soovile"} number='3'></ServiceProcess>
          <ArrowLongRightIcon className="size-10 mt-10" />
          <ServiceProcess step={"Saadame kinnituse, et arve on tasutud"} number='4'></ServiceProcess>
          <ArrowLongRightIcon className="size-10 mt-10" />
          <ServiceProcess step={"7 päeva enne klassi algust saadame meeldetuletuse"} number='5'></ServiceProcess>
        </div>
      </div>
    }

      <div className='flex flex-col gap-10'>
        {page.blocks?.filter(block => block._type !== 'textBlock' || block.content).map(block => {
          if (block._type === 'textBlock') {
            return (
              <div key={block._key} className="portable-text">
                <PortableText value={block.content!} components={{
                  list: {
                    'number': (props) => (
                      <ol className="list-counter">{props.children}</ol>
                    )
                  }
                }} />
              </div>
            );
          }
          if (block._type === 'shortCourseTable') {
            return (
              <ShortCourseTable key={block._key} shortCourses={shortCourses} calendar={calendar} settings={settings} />
            )
          }
          return null;
        })
        }
      </div>
    </PageLayout>
  );
}
