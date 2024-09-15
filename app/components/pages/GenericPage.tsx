"use client"

import React from 'react'
import {
  CalendarQueryResult,
  CourseModuleListQueryResult,
  GenericPage,
  MasterClassListQueryResult,
  SettingsQueryResult,
  ShortCourseListQueryResult
} from '@/sanity/types';
import { PortableText } from 'next-sanity';
import PageLayout from '../layout/PageLayout';
import ShortCourseTable from '../ShortCourseTable';

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
      { page.blocks?.filter(block => block._type !== 'textBlock' || block.content).map(block => {
        if (block._type === 'textBlock') {
          return (
            <div key={block._key} className="portable-text">
              <PortableText value={block.content!} components={{
                list: {
                  'number': (props) => (
                    <ol className="list-counter">{ props.children }</ol>
                  )
                }
              }} />
            </div>
          );
        }
        if (block._type === 'shortCourseTable') {
          return (
            <ShortCourseTable key={block._key} shortCourses={shortCourses} calendar={calendar} />
          )
        }
        return null;
      })
      }
    </PageLayout>
  );
}
