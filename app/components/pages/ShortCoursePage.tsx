"use client"

import React from 'react'
import Card from '../Card';
import {
  CalendarEventByCourseQueryResult,
  CourseModuleListQueryResult,
  MasterClassListQueryResult,
  SettingsQueryResult,
  ShortCourse
} from '@/sanity/types';
import PageLayout from '../layout/PageLayout';
import { DATE_FORMAT_LONG, format } from '@/app/helpers/date.helper';

import BackLink from "../links/BackLink";
import Container from "./../layout/Container";
import Footer from "./../layout/Footer";
import { Header } from '../layout/Header';
import CoursePageInfoLeaf from './CoursePageInfoLeaf'

interface ShortCoursePageProps {
  settings: SettingsQueryResult;
  shortCourse: ShortCourse;
  events: CalendarEventByCourseQueryResult;
  masterClasses: MasterClassListQueryResult;
  courseModules: CourseModuleListQueryResult;
}

export const ShortCoursePage = ({ settings, masterClasses, courseModules, shortCourse, events }: Readonly<ShortCoursePageProps>) => {

  return (


    <main className="min-h-screen flex flex-col">
      <div className="bg-[url('/static/bg-image.png')] p-5 w-full rounded-br-md rounded-bl-md saturate-0 absolute h-[30%] z-[-1]">
      </div>
      <Header
        settings={settings}
        masterClasses={masterClasses}
        courseModules={courseModules}
        onDarkBackground={true}
      />



      <Container className="pb-10 pt-20">
        <div className="mt-4 inline-block text-white">
          <BackLink />
        </div>
        <h1 className="font-display font-normal text-white mb-8">pealkiri</h1>


        <div className='flex flex-col-reverse md:flex-row gap-4 mb-10'>

          <div className='bg-white p-6 md:p-8 lg:p-10 rounded-tr-lg rounded-bl-lg flex flex-col gap-4'>
            <h2 className="font-display font-normal text-xl  md:text-2xl">Õppe sisu</h2>
            <p className='text-sm md:text-base'>Konfliktide lahendamise lühiklassi eesmärgiks on saada ülevaade konflikte käsitlevatest teooriatest sh tutvustamisele tulevad teooriad saavad seostatud praktiliset juhtumite ja olukordadega, kas koolitajate endi praktikast või soovil ja vajadusel osalejate praktikas ette tulnud juhtumite kaudu.</p>
          </div>

          <div className='flex flex-col gap-2 min-w-[40%]'>
            <div className='bg-blue p-6 rounded-tr-lg rounded-bl-lg text-center gap-2 flex flex-col w-full'>
              <p>Järgmine grupp alustab</p>
              <p className="font-display font-normal text-md md:text-xl">10.oktoober</p>
              <button className='bg-white pt-2 pb-1 px-3 w-full rounded-lg'>Registreeri</button>
              <p>Registreerimine kuni 03.04.2024 (k.1)</p>
            </div>

            <div className='flex flex-row gap-1 w-full'>
              <CoursePageInfoLeaf bgColorClass={'bg-green'} title={"Maht"} info={"20h"}></CoursePageInfoLeaf>
              <CoursePageInfoLeaf bgColorClass={'bg-pink'} title={"Toimumiskoht"} info={"Tartu"}></CoursePageInfoLeaf>
              <CoursePageInfoLeaf bgColorClass={'bg-yellow'} title={"Osalejad"} info={"10.18"}></CoursePageInfoLeaf>
              <CoursePageInfoLeaf bgColorClass={'bg-orange'} title={"Hind"} info={"320 €"}></CoursePageInfoLeaf>
            </div>
          </div>

        </div>

        <div className='bg-white p-6 md:p-8 lg:p-10 rounded-tr-lg rounded-bl-lg mb-10 gap-4 flex flex-col'>
          <h2 className="font-display font-normal text-xl  md:text-2xl ">Korraldus ja päevakava</h2>
          <div className='flex flex-row gap-8'>
            <div >
              <p className='font-bold'>Päev 1</p>
              <p className='text-sm md:text-base'>13:00-14:00 koolitus</p>
            </div>
            <div>
              <p className='font-bold'>Päev 2</p>
              <p className='text-sm md:text-base'>13:00-14:00 koolitus</p>
            </div>
            <div>
              <p className='font-bold'>Päev 3</p>
              <p className='text-sm md:text-base'>13:00-14:00 koolitus</p>
            </div>
          </div>
          <p className='text-sm md:text-base'>Konfliktide lahendamise lühiklassi eesmärgiks on saada ülevaade konflikte käsitlevatest teooriatest sh tutvustamisele tulevad teooriad saavad seostatud praktiliset juhtumite ja olukordadega, kas koolitajate endi praktikast või soovil ja vajadusel osalejate praktikas ette tulnud juhtumite kaudu.</p>
        </div>

        <div className='bg-white p-6 md:p-8 lg:p-10 rounded-tr-lg rounded-bl-lg mb-10 flex flex-col gap-4'>
          <h2 className="font-display font-normal text-xl  md:text-2xl">Toimumised</h2>
          <p className='text-sm md:text-base'>Konfliktide lahendamise lühiklassi eesmärgiks on saada ülevaade konflikte käsitlevatest teooriatest sh tutvustamisele tulevad teooriad saavad seostatud praktiliset juhtumite ja olukordadega, kas koolitajate endi praktikast või soovil ja vajadusel osalejate praktikas ette tulnud juhtumite kaudu.</p>
        </div>

        <div className='flex flex-col md:flex-row md:gap-10'>
          <div className='bg-white p-6 md:p-8 lg:p-10 rounded-tr-lg rounded-bl-lg mb-10 flex flex-col gap-4'>
            <h2 className="font-display font-normal text-xl  md:text-2xl">Keda ootame osalema</h2>
            <p className='text-sm md:text-base'>Konfliktide lahendamise lühiklassi eesmärgiks on saada ülevaade konfliktejate endi praktikast või soovil ja vajadusel osalejate praktikas ette tulnud juhtumite kaudu.</p>
          </div>

          <div className='bg-white p-6 md:p-8 lg:p-10 rounded-tr-lg rounded-bl-lg mb-10 flex flex-col gap-4'>
            <h2 className="font-display font-normal text-xl  md:text-2xl">Registreerumine ja tasumine</h2>
            <p className='text-sm md:text-base'> Konfliktide lahendamise lühiklassi eesmärgiks on saada ülevaade konfliktejate endi praktikast või soovil ja vajadusel osalejate praktikas ette tulnud juhtumite kaudu.</p>
          </div>

        </div>

        <div className='bg-white p-6 md:p-8 lg:p-10 rounded-tr-lg rounded-bl-lg mb-10 flex flex-col gap-4'>
          <h2 className="font-display font-normal text-xl  md:text-2xl">Akadeemikud</h2>
          <p className='text-sm md:text-base'>Konfliktide lahendamise lühiklassi eesmärgiks on saada ülevaade konfliktejate endi praktikast või soovil ja vajadusel osalejate praktikas ette tulnud juhtumite kaudu.</p>
        </div>


        <div className='bg-white p-6 md:p-8 lg:p-10 rounded-tr-lg rounded-bl-lg mb-10 flex flex-col gap-4'>
          <h2 className="font-display font-normal text-xl  md:text-2xl">Kontakt</h2>
          <p className='text-sm md:text-base'>..</p>
        </div>



      </Container>




      <Footer />
    </main>
  );
}


{/**  <PageLayout
      title={shortCourse?.name}
      settings={settings}
      masterClasses={masterClasses}
      courseModules={courseModules}
      >

      <div className='bg-white'>

      </div>
      <Card title="Järgmine event">
        <h1>Järgmine event</h1>
        {events[0] ? format(events[0].startDate!, DATE_FORMAT_LONG) : ''}
      </Card>

      <Card title="Klassi maht">
  
        {shortCourse?.courseSize}
      </Card>

      <div className='grid grid-cols-2 gap-10'>
        <Card title="Min osalejaid">
          {shortCourse?.minParticipants}
        </Card>
        <Card title="Max osalejaid">
          {shortCourse?.maxParticipants}
        </Card>
      </div>
    </PageLayout>*/}