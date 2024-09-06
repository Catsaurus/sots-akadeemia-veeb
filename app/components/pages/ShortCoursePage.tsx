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

interface ShortCoursePageProps {
  settings: SettingsQueryResult;
  shortCourse: ShortCourse;
  events: CalendarEventByCourseQueryResult;
  masterClasses: MasterClassListQueryResult;
  courseModules: CourseModuleListQueryResult;
}

export const ShortCoursePage = ({ settings, masterClasses, courseModules, shortCourse, events }: Readonly<ShortCoursePageProps>) => {

  return (
    <PageLayout
      title={shortCourse?.name}
      settings={settings}
      masterClasses={masterClasses}
      courseModules={courseModules}
    >
      <Card title="Järgmine event" content={events[0]?.startDate}></Card>
      <Card title="Klassi maht" content={shortCourse?.courseSize}></Card>

      <div className='grid grid-cols-2 cap-10'>
        <Card title="Min osalejaid" content={shortCourse?.minParticipants}></Card>
        <Card title="Max osalejaid" content={shortCourse?.maxParticipants}></Card>
      </div>
    </PageLayout>
  );
}
