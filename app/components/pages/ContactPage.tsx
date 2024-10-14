"use client"

import { PortableText } from 'next-sanity';
import React from 'react'
import Link from 'next/link'

import { urlFor } from '@/sanity/lib/image';
import {
  ContactQueryResult,
  CourseModuleListQueryResult,
  MasterClassListQueryResult,
  SettingsQueryResult,
  Teacher
} from '@/sanity/types';

import Card from '../cards/Card';
import ContactCard from '../cards/ContactCard';
import TeacherCard from '../cards/TeacherCard';
import PageLayout from '../layout/PageLayout';

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
      <div className='mb-10'>


        <div className='flex flex-col md:flex-row gap-6 mb-20 pt-10'>
          <ContactCard title="Viime oma koolitusi läbi:">
            <Link href={'https://maps.app.goo.gl/KA4TxP3FNR2Cibz16'} target='_blank' className='hover:underline'>{ settings?.address }</Link>
          </ContactCard>
          <ContactCard title="Küsimuste korral võta ühendust:">
            E-post: { settings?.mainContactEmail }<br />
            Telefon: { settings?.mainContactPhone }
          </ContactCard>
          <ContactCard title="Sotsiaaltöö Akadeemia">
            Registrikood: { settings?.companyCode }<br />
            Pangakonto IBAN: { settings?.bankIban } <br />
            <span className='text-sm pt-2'>Sotsiaaltöö Akadeemia on registreeritud Eesti Hariduse Infosüsteemis täiendkoolitusasutusena reg.nr 17006432.</span>
          </ContactCard>
        </div>

        <div id="meist" className='pt-20'></div>

        <h2 className='font-display text-2xl font-normal mb-10'>Akadeemikud</h2>

        { !!page?.teachers?.length && <Card title="Akadeemikud">
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16'>
            {
              page?.teachers?.map(teacher => (
                <TeacherCard key={teacher._key} teacher={teacher as unknown as Teacher} showContacts={true} />
              ))
            }
          </div>
        </Card>}
      </div>



    </PageLayout>
  );
}
