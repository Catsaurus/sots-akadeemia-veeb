"use client"

import React from 'react'
import Card from '../Card';
import {
  CalendarEventByCourseQueryResult,
  CourseModuleListQueryResult,
  MasterClassListQueryResult,
  SettingsQueryResult,
  ShortCourse
} from '@/sanity/types';
import PageLayout from '../layout/PageLayout';
import { DATE_FORMAT_LONG, format } from '@/app/helpers/date.helper';

import BackLink from "../links/BackLink";
import Container from "./../layout/Container";
import Footer from "./../layout/Footer";
import { Header } from '../layout/Header';
import CoursePageInfoLeaf from './CoursePageInfoLeaf'
import CourseLayout from '../layout/CourseLayout';

interface ShortCoursePageProps {
  settings: SettingsQueryResult;
  shortCourse: ShortCourse;
  events: CalendarEventByCourseQueryResult;
  masterClasses: MasterClassListQueryResult;
  courseModules: CourseModuleListQueryResult;
}

export const ShortCoursePage = ({ settings, masterClasses, courseModules, shortCourse, events }: Readonly<ShortCoursePageProps>) => {

  return (
    <CourseLayout 
      settings={settings}
      masterClasses={masterClasses}
      courseModules={courseModules}
      course={shortCourse}
      events={events}
    />
  )
}


{/**  <PageLayout
      title={shortCourse?.name}
      settings={settings}
      masterClasses={masterClasses}
      courseModules={courseModules}
      >

      <div className='bg-white'>

      </div>
      <Card title="Järgmine event">
        <h1>Järgmine event</h1>
        {events[0] ? format(events[0].startDate!, DATE_FORMAT_LONG) : ''}
      </Card>

      <Card title="Klassi maht">
  
        {shortCourse?.courseSize}
      </Card>

      <div className='grid grid-cols-2 gap-10'>
        <Card title="Min osalejaid">
          {shortCourse?.minParticipants}
        </Card>
        <Card title="Max osalejaid">
          {shortCourse?.maxParticipants}
        </Card>
      </div>
    </PageLayout>*/}