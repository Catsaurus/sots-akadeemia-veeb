"use client"

import React from 'react'
import { Header } from '../layout/Header';
import { CourseModule, CourseModuleListQueryResult, MasterClassListQueryResult, SettingsQueryResult } from '@/sanity/types';
import BackLink from '../links/BackLink';
import PageLayout from '../layout/PageLayout';
import Card from '../Card';

interface CourseModulePageProps {
  settings: SettingsQueryResult;
  courseModule: CourseModule;
  masterClasses: MasterClassListQueryResult;
  courseModules: CourseModuleListQueryResult;
}

export default function CourseModulePage({ settings, masterClasses, courseModules, courseModule }: Readonly<CourseModulePageProps>) {

  return (
    <PageLayout
      title={courseModule?.name}
      headingContainerBackground={courseModule?.color}
      settings={settings}
      masterClasses={masterClasses}
      courseModules={courseModules}
    >
      <Card title="Lühiklassi kaart">
        Content
      </Card>
    </PageLayout>
  )
}
