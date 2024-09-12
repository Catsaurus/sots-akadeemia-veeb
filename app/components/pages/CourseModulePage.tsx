"use client"

import React from 'react'
import {
  CalendarEventByCourseQueryResult,
  CourseModule,
  CourseModuleListQueryResult,
  MasterClassListQueryResult, SettingsQueryResult } from '@/sanity/types';
import CourseLayout from '../layout/CourseLayout';

interface CourseModulePageProps {
  settings: SettingsQueryResult;
  courseModule: CourseModule;
  masterClasses: MasterClassListQueryResult;
  courseModules: CourseModuleListQueryResult;
  events: CalendarEventByCourseQueryResult;
}

export default function CourseModulePage({ settings, masterClasses, courseModules, events, courseModule }: Readonly<CourseModulePageProps>) {

  return (
    <CourseLayout
      settings={settings}
      masterClasses={masterClasses}
      courseModules={courseModules}
      course={courseModule}
      events={events}
    />
  )
}
