"use client"

import React from 'react'
import {
  CalendarEventByCourseQueryResult,
  CalendarQueryResult,
  CourseModuleListQueryResult,
  MasterClassListQueryResult,
  SettingsQueryResult,
  SingleClassModuleCourseQueryResult
} from '@/sanity/types';
import CourseLayout from '../layout/CourseLayout';

interface ShortCoursePageProps {
  settings: SettingsQueryResult;
  shortCourse: SingleClassModuleCourseQueryResult;
  events: CalendarEventByCourseQueryResult;
  masterClasses: MasterClassListQueryResult;
  courseModules: CourseModuleListQueryResult;
  calendar: CalendarQueryResult;
}

export const ShortCoursePage = ({ settings, masterClasses, courseModules, shortCourse, events, calendar }: Readonly<ShortCoursePageProps>) => {

  return (
    <CourseLayout 
      settings={settings}
      masterClasses={masterClasses}
      courseModules={courseModules}
      course={shortCourse}
      events={events}
      calendar={calendar}
    />
  )
}
