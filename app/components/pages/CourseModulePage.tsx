"use client"

import React from 'react'

import {
  CalendarEventByCourseQueryResult,
  CalendarQueryResult,
  CourseModuleListQueryResult,
  MasterClassListQueryResult, SettingsQueryResult, 
  ShortCourseListQueryResult, 
  SingleClassModuleCourseQueryResult} from '@/sanity/types';

import CourseLayout from '../layout/CourseLayout';

interface CourseModulePageProps {
  settings: SettingsQueryResult;
  courseModule: SingleClassModuleCourseQueryResult;
  masterClasses: MasterClassListQueryResult;
  courseModules: CourseModuleListQueryResult;
  shortCourses: ShortCourseListQueryResult;
  events: CalendarEventByCourseQueryResult;
  calendar: CalendarQueryResult;
}

export default function CourseModulePage({
  settings, masterClasses, courseModules, shortCourses, events, courseModule, calendar
}: Readonly<CourseModulePageProps>) {

  return (
    <CourseLayout
      settings={settings}
      masterClasses={masterClasses}
      courseModules={courseModules}
      shortCourses={shortCourses}
      course={courseModule}
      events={events}
      calendar={calendar}
    />
  )
}
