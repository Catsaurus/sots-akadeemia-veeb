"use client"

import React from 'react'
import {
  CalendarEventByCourseQueryResult,
  CourseModuleListQueryResult,
  MasterClass,
  MasterClassListQueryResult,
  SettingsQueryResult
} from '@/sanity/types';
import CourseLayout from '../layout/CourseLayout';

interface MasterClassPageProps {
  settings: SettingsQueryResult;
  masterClass: MasterClass;
  events: CalendarEventByCourseQueryResult;
  masterClasses: MasterClassListQueryResult;
  courseModules: CourseModuleListQueryResult;
}

export default function MasterClassPage({ settings, masterClasses, courseModules, masterClass, events }: Readonly<MasterClassPageProps>) {

  return (
    <CourseLayout 
      settings={settings}
      masterClasses={masterClasses}
      courseModules={courseModules}
      course={masterClass}
      events={events}
      headingContainerBackground={masterClass.color?.hex}
    />
  )
}
