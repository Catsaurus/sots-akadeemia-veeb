"use client"

import React from 'react'
import {
  ContactQueryResult,
  CourseModuleListQueryResult,
  MasterClassListQueryResult,
  SettingsQueryResult,
  Teacher
} from '@/sanity/types';
import { PortableText } from 'next-sanity';
import PageLayout from '../layout/PageLayout';
import Card from '../cards/Card';
import { urlFor } from '@/sanity/lib/image';
import ContactCard from '../cards/ContactCard';
import TeacherCard from '../cards/TeacherCard';

interface ContactPageProps {
  settings: SettingsQueryResult;
  page: ContactQueryResult;
  masterClasses: MasterClassListQueryResult;
  courseModules: CourseModuleListQueryResult;
}

export default function ContactPage({
  settings, masterClasses, courseModules, page
}: Readonly<ContactPageProps>) {

  if (!page) {
    return null;
  }

  return (
    <PageLayout
      title={page.title}
      settings={settings}
      masterClasses={masterClasses}
      courseModules={courseModules}
    >
      <div className=' mb-20'>


        <div className='flex flex-col md:flex-row gap-6 mb-20'>
          <ContactCard title="Viime oma koolitusi läbi:">
            { settings?.address }
          </ContactCard>
          <ContactCard title="Küsimuste korral võta ühendust:">
            E-post: { settings?.mainContactEmail }<br />
            Telefon: { settings?.mainContactPhone }
          </ContactCard>
          <ContactCard title="Sotsiaaltöö akadeemia">
            Registrikood: { settings?.companyCode }<br />
            Pangakonto IBAN: { settings?.bankIban }
          </ContactCard>
        </div>

        <h2 className='font-display text-2xl font-normal mb-10'>Akadeemikud</h2>

        <Card title="Akadeemikud">
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16'>
            {
              page?.teachers?.map(teacher => (
                <TeacherCard key={teacher._key} teacher={teacher as unknown as Teacher} showContacts={true} />
              ))
            }
          </div>
        </Card>
      </div>



    </PageLayout>
  );
}
