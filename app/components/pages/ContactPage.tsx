"use client"

import React from 'react'
import {
  ContactQueryResult,
  CourseModuleListQueryResult,
  MasterClassListQueryResult,
  SettingsQueryResult
} from '@/sanity/types';
import { PortableText } from 'next-sanity';
import PageLayout from '../layout/PageLayout';
import Card from '../Card';
import { urlFor } from '@/sanity/lib/image';

interface ContactPageProps {
  settings: SettingsQueryResult;
  page: ContactQueryResult;
  masterClasses: MasterClassListQueryResult;
  courseModules: CourseModuleListQueryResult;
}

export default function ContactPage({
  settings, masterClasses, courseModules, page
}: Readonly<ContactPageProps>) {

    console.log(page);

  return (
    <PageLayout
      title={page?.title}
      settings={settings}
      masterClasses={masterClasses}
      courseModules={courseModules}
    >
        <Card title="Akadeemikud">
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8'>
                { 
                    page?.teachers?.map(teacher => (
                        <Card key={teacher._key} title={teacher.name!}>
                            { !!teacher.image && <img className="rounded-bl-lg rounded-tr-lg" src={urlFor(teacher.image).width(200).url()} />}

                        </Card>
                    ))
                }
            </div>
        </Card>
    </PageLayout>
  );
}
