import { CalendarEventByCourseQueryResult, CourseModule, CourseModuleListQueryResult, MasterClass, MasterClassListQueryResult, SettingsQueryResult, ShortCourse } from "@/sanity/types";
import Container from "./Container";
import { Header } from "./Header";
import settings from "@/sanity/schemas/documents/settings";
import { ReactNode } from "react";
import BackLink from "../links/BackLink";
import CoursePageInfoLeaf from "../pages/CoursePageInfoLeaf";
import Footer from "./Footer";
import { PortableText } from "next-sanity";
import { DATE_FORMAT, DATE_FORMAT_LONG, EVENT_REGISTRATION_DAYS, format } from "@/app/helpers/date.helper";
import { isBefore, subDays, subWeeks } from "date-fns";

interface CourseLayoutProps {
    headingContainerBackground?: string;
    headerOnDarkBackground?: boolean;
    settings: SettingsQueryResult;
    masterClasses: MasterClassListQueryResult;
    courseModules: CourseModuleListQueryResult;
    course: MasterClass | CourseModule | ShortCourse;
    events: CalendarEventByCourseQueryResult;
}

export default function CourseLayout({
    headingContainerBackground, settings, masterClasses, courseModules, course, events
}: Readonly<CourseLayoutProps>) {
    const nextEvent = events[0];
    const eventRegisterUntilDate = nextEvent ? subDays(nextEvent.startDate!, EVENT_REGISTRATION_DAYS) : null;
    
    return (
        <main className="min-h-screen flex flex-col">
          <div
            style={headingContainerBackground ? { backgroundColor: headingContainerBackground } : undefined}
            className={`${headingContainerBackground ? '' : 'bg-[url("/static/bg-image.png")] saturate-0 '}p-5 w-full rounded-br-md rounded-bl-md absolute h-[30%] z-[-1]`}>
          </div>
          <Header
            settings={settings}
            masterClasses={masterClasses}
            courseModules={courseModules}
            onDarkBackground={!headingContainerBackground}
            contentOverlap
          />
    
          <Container className="pb-10 pt-20">
            <div className={`mt-4 inline-block text-${!headingContainerBackground ? 'white' : 'black'}`}>
              <BackLink />
            </div>
            <h1 className={`font-display font-normal text-${!headingContainerBackground ? 'white' : 'black'} mb-8`}>{ course.name }</h1>
    
            <div className='flex flex-col-reverse md:flex-row gap-4 mb-10'>
    
              <div className='bg-white p-6 md:p-8 lg:p-10 rounded-tr-lg rounded-bl-lg flex flex-col gap-4'>
                <h2 className="font-display font-normal text-xl  md:text-2xl">Õppe sisu</h2>
                <div className='text-sm md:text-base'>{ course.body ? <PortableText value={course.body} /> : course.shortDescription }</div>
              </div>
    
              { nextEvent ? <div className='flex flex-col gap-2 min-w-[40%]'>
                <div className='bg-blue p-6 rounded-tr-lg rounded-bl-lg text-center gap-2 flex flex-col w-full'>
                  <p>Järgmine grupp alustab</p>
                  <p className="font-display font-normal text-md md:text-xl">{ format(nextEvent.startDate!, DATE_FORMAT_LONG) }</p>
                  { !!eventRegisterUntilDate && isBefore(eventRegisterUntilDate, new Date()) &&
                  <>
                    <button className='bg-white pt-2 pb-1 px-3 w-full rounded-lg'>Registreeri</button>
                    <p>Registreerimine kuni { format(eventRegisterUntilDate, DATE_FORMAT) } (k.a)</p>
                  </> }
                </div>
    
                <div className='flex flex-row gap-1 w-full'>
                  <CoursePageInfoLeaf bgColorClass={'bg-green'} title={"Maht"} info={course.courseSize ?? ''}></CoursePageInfoLeaf>
                  <CoursePageInfoLeaf bgColorClass={'bg-pink'} title={"Toimumiskoht"} info={course.city ?? ''}></CoursePageInfoLeaf>
                  <CoursePageInfoLeaf bgColorClass={'bg-yellow'} title={"Osalejad"} info={`${course.minParticipants} - ${course.maxParticipants}`}></CoursePageInfoLeaf>
                  <CoursePageInfoLeaf bgColorClass={'bg-orange'} title={"Hind"} info={`${course.price ?? '-'} €`}></CoursePageInfoLeaf>
                </div>
              </div> : null}
    
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