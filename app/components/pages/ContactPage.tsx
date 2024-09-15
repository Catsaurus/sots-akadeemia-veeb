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

  console.log(page);

  return (
    <PageLayout
      title={page?.title}
      settings={settings}
      masterClasses={masterClasses}
      courseModules={courseModules}
    >
      <div className='bg-white p-8 rounded-lg mb-20'>

        <div className='mb-40'>
          <h3 className='font-display text-xl font-normal mb-10'>Kontakt</h3>
          <div className='flex flex-col md:flex-row gap-6'>
            <ContactCard title={"Viime oma koolitusi läbi:"} content={"Suur Kaar 53, Tartu Sissepääs hoovipoolsest uksest"}></ContactCard>
            <ContactCard title={"Küsimuste korral võta ühendust:"} content={"meistriklass@sotsiaalakadeemia.ee, Telefoni nr: 45678987654"}></ContactCard>
            <ContactCard title={"Sotsiaaltöö akadeemia"} content={"Registrikood: 1234567, Panga IBAN: 12456789098765456789"}></ContactCard>
          </div>
        </div>

        <h3 className='font-display text-xl font-normal mb-10'>Akadeemikud</h3>

        <Card title="Akadeemikud">
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8'>
            {
              page?.teachers?.map(teacher => (
                <TeacherCard key={teacher._key} teacher={teacher as unknown as Teacher} />
              ))
            }
          </div>
        </Card>
      </div>



    </PageLayout>
  );
}
