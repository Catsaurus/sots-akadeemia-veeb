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
import { DATE_FORMAT_LONG, format } from '@/app/helpers/date.helper';

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
      <Card title="Üldinfo">
        {!!masterClass?.body && <PortableText value={masterClass?.body} />}
      </Card>
      <Card title="Järgmine event">
        {events[0] ? format(events[0].startDate!, DATE_FORMAT_LONG) : ''}
      </Card>
      <Card title="Keda ootame osalema">
        {masterClass?.minParticipants}
      </Card>

      <div className='grid grid-cols-2 gap-10'>
        <Card title="Keda ootame osalema">
          {masterClass?.minParticipants}
        </Card>
        <Card title="Tasumine">
          {masterClass?.minParticipants}
        </Card>
      </div>

      <Card title="Kes õpetavad?"></Card>

      <p>{masterClass?.registrationLink}</p>
    </PageLayout>
  );
}
