"use client"

import { PortableText } from "next-sanity";

import { isEventRegisterable, sortByStartDate } from "@/app/helpers/event.helper";
import {
    CalendarEventByCourseQueryResult,
    CalendarQueryResult,
    CourseModuleListQueryResult,
    MasterClassListQueryResult,
    SettingsQueryResult,
    ShortCourse,
    ShortCourseListQueryResult,
    SingleClassModuleCourseQueryResult,
    Teacher
} from "@/sanity/types";

import NextEventCardSet from "../cards/NextEventCardSet";
import TeacherCard from "../cards/TeacherCard";
import ContentBlock from "../ContentBlock";
import BackLink from "../links/BackLink";
import ClassCourseSchedule from "../ClassCourseSchedule";
import ShortCourseSchedule from "../ShortCourseSchedule";
import Container from "./Container";
import Footer from "./Footer";
import Header from "./Header";

interface CourseLayoutProps {
    headingContainerBackground?: string;
    headerOnDarkBackground?: boolean;
    settings: SettingsQueryResult;
    masterClasses: MasterClassListQueryResult;
    courseModules: CourseModuleListQueryResult;
    shortCourses?: ShortCourseListQueryResult;
    course: SingleClassModuleCourseQueryResult;
    events: CalendarEventByCourseQueryResult;
    calendar: CalendarQueryResult;
}

export default function CourseLayout({
    headingContainerBackground, settings, masterClasses, courseModules, shortCourses, course, events, calendar
}: Readonly<CourseLayoutProps>) {

    if (!course) {
        return null;
    }

    const nextEvent = events.sort(sortByStartDate).filter(isEventRegisterable)[0];
    
    return (
        <main className="min-h-screen flex flex-col">
          <div
            style={headingContainerBackground ? { backgroundColor: headingContainerBackground } : undefined}
            className={`${headingContainerBackground ? '' : 'bg-[url("/static/bg-image.png")] saturate-0 '}p-5 w-full rounded-br-md rounded-bl-md absolute h-[350px] z-[-1]`}>
          </div>
          <Header
            settings={settings}
            masterClasses={masterClasses}
            courseModules={courseModules}
            onDarkBackground={!headingContainerBackground}
            contentOverlap
          />
    
          <Container className="pb-10 pt-28 xxl:pt-40">
            <div className={`mb-4 xxl:mb-10 inline-block text-${!headingContainerBackground ? 'white' : 'black'}`}>
                <div>
                    <BackLink linkToHomePage={course._type !== 'shortCourse'} />
                </div>
            </div>
            <h1 className={`font-display font-normal text-2xl md:text-4xl text-${!headingContainerBackground ? 'white' : 'black'} mb-8`}>{ course.name }</h1>
    
            <div className='flex flex-col-reverse md:flex-row gap-4 md:mb-10'>

                <ContentBlock title="Õppe sisu">
                    <div className='text-sm md:text-base'>{ course.body ? <PortableText value={course.body} /> : undefined }</div>
                </ContentBlock>
    
                <NextEventCardSet event={nextEvent} course={course} settings={settings} headingContainerBackground={headingContainerBackground}/>
    
            </div>
    
            { course._type === 'shortCourse' && <ShortCourseSchedule shortCourse={course as unknown as ShortCourse} /> }
            { course._type !== 'shortCourse' && !!events.length &&
            <ClassCourseSchedule 
                classCourse={course}
                shortCourses={shortCourses!}
                events={events}
                calendar={calendar}
                settings={settings}
            /> }


            <div className='flex flex-col md:flex-row md:gap-10'>
                { !!course.expectedParticipants && <ContentBlock title="Keda ootame osalema">
                    <div className='text-sm md:text-base'><PortableText value={course.expectedParticipants} /></div>
                </ContentBlock>}
                { !!course.registrationAndPaymentInfo && <ContentBlock title="Registreerumine ja tasumine">
                    <div className='text-sm md:text-base'>
                        <PortableText value={course.registrationAndPaymentInfo} />
                    </div>
                </ContentBlock> }
            </div>
    
            { !!course.teachers?.length && <ContentBlock title="Akadeemikud">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-10 mt-5">
                    { course.teachers?.map(teacher => (
                        <TeacherCard key={teacher._id} teacher={teacher as unknown as Teacher} />
                    )) }
                </div>
            </ContentBlock>}
            { !!course.contactPerson && <ContentBlock title="Kontakt">
                <div className="grid grid-cols-1 md:grid-cols-2">
                    <p className='text-sm md:text-base'>Aadress: { course.address }</p>
                    <div>
                        <p>Küsimuste korral aitab sind { course.contactPerson?.name }</p>
                        <p className='text-sm md:text-base'>E-post: { course.contactPerson?.email }</p>
                        <p className='text-sm md:text-base'>Telefon: { course.contactPerson?.phone }</p>
                    </div>
                </div>
            </ContentBlock>}
          </Container>
          <Footer />
        </main>
      );
}