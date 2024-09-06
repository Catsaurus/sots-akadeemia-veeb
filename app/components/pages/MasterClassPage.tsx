"use client"

import React from 'react'
import { PortableText } from "@portabletext/react";
import Card from '../Card';
import {
  CalendarEventByCourseQueryResult,
  CourseModuleListQueryResult,
  MasterClass,
  MasterClassListQueryResult,
  SettingsQueryResult
} from '@/sanity/types';
import PageLayout from '../layout/PageLayout';

interface MasterClassPageProps {
  settings: SettingsQueryResult;
  masterClass: MasterClass;
  events: CalendarEventByCourseQueryResult;
  masterClasses: MasterClassListQueryResult;
  courseModules: CourseModuleListQueryResult;
}

export default function MasterClassPage({ settings, masterClasses, courseModules, masterClass, events }: Readonly<MasterClassPageProps>) {

  return (
    <PageLayout
      title={masterClass?.name}
      settings={settings}
      masterClasses={masterClasses}
      courseModules={courseModules}
      headingContainerBackground={masterClass?.color?.hex}
    >
      <Card title="Üldinfo" content={!!masterClass?.body && <PortableText value={masterClass?.body} />}></Card>
      <Card title="Järgmine event" content={events[0]?.startDate}></Card>
      <Card title="Keda ootame osalema" content={masterClass?.minParticipants}></Card>

      <div className='grid grid-cols-2 cap-10'>
        <Card title="Keda ootame osalema" content={masterClass?.minParticipants}></Card>
        <Card title="Tasumine" content={masterClass?.minParticipants}></Card>
      </div>

      <Card title="Kes õpetavad?" content={'keegi ikka'}></Card>

      <p>{masterClass?.registrationLink}</p>
    </PageLayout>
  );
}
