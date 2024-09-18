"use client"

import React from 'react'

import {
  CalendarEventByCourseQueryResult,
  CalendarQueryResult,
  CourseModuleListQueryResult,
  MasterClass,
  MasterClassListQueryResult,
  SettingsQueryResult,
  ShortCourseListQueryResult,
  SingleClassModuleCourseQueryResult
} from '@/sanity/types';

import CourseLayout from '../layout/CourseLayout';

interface MasterClassPageProps {
  settings: SettingsQueryResult;
  masterClass: SingleClassModuleCourseQueryResult;
  events: CalendarEventByCourseQueryResult;
  masterClasses: MasterClassListQueryResult;
  courseModules: CourseModuleListQueryResult;
  shortCourses: ShortCourseListQueryResult;
  calendar: CalendarQueryResult;
}

export default function MasterClassPage({
  settings, masterClasses, courseModules, shortCourses, masterClass, events, calendar
}: Readonly<MasterClassPageProps>) {

  return (
    <CourseLayout 
      settings={settings}
      masterClasses={masterClasses}
      courseModules={courseModules}
      shortCourses={shortCourses}
      course={masterClass}
      events={events}
      calendar={calendar}
      headingContainerBackground={(masterClass as unknown as MasterClass).color?.hex}
    />
  )
}
