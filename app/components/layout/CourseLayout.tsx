import {
    CalendarEventByCourseQueryResult,
    CalendarQueryResult,
    CourseModuleListQueryResult,
    MasterClassListQueryResult,
    SettingsQueryResult,
    ShortCourseListQueryResult,
    SingleClassModuleCourseQueryResult,
    Teacher
} from "@/sanity/types";
import Container from "./Container";
import Header from "./Header";
import BackLink from "../links/BackLink";
import Footer from "./Footer";
import { PortableText } from "next-sanity";
import TeacherCard from "../cards/TeacherCard";
import ShortCourseSchedule from "../ShortCourseSchedule";
import ContentBlock from "../ContentBlock";
import MasterClassSchedule from "../MasterClassSchedule";
import NextEventCardSet from "../cards/NextEventCardSet";
import { sortByStartDate } from "@/app/helpers/event.helper";

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

    const nextEvent = events.toSorted(sortByStartDate)[0];
    
    return (
        <main className="min-h-screen flex flex-col">
          <div
            style={headingContainerBackground ? { backgroundColor: headingContainerBackground } : undefined}
            className={`${headingContainerBackground ? '' : 'bg-[url("/static/bg-image.png")] saturate-0 '}p-5 w-full rounded-br-md rounded-bl-md absolute h-[30vh] z-[-1]`}>
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
              <BackLink linkToHomePage={course._type !== 'shortCourse'} />
            </div>
            <h1 className={`font-display font-normal text-${!headingContainerBackground ? 'white' : 'black'} mb-8`}>{ course.name }</h1>
    
            <div className='flex flex-col-reverse md:flex-row gap-4 mb-10'>

                <ContentBlock title="Õppe sisu">
                    <div className='text-sm md:text-base'>{ course.body ? <PortableText value={course.body} /> : course.shortDescription }</div>
                </ContentBlock>
    
              { nextEvent ? <NextEventCardSet event={nextEvent} course={course} /> : null }
    
            </div>
    
            { course._type === 'shortCourse' && <ShortCourseSchedule /> }
            { course._type === 'masterClass' &&
            <MasterClassSchedule 
                masterClass={course}
                shortCourses={shortCourses!}
                events={events}
                calendar={calendar}
            /> }


            <div className='flex flex-col md:flex-row md:gap-10'>
                <ContentBlock title="Keda ootame osalema">
                    <p className='text-sm md:text-base'>Konfliktide lahendamise lühiklassi eesmärgiks on saada ülevaade konfliktejate endi praktikast või soovil ja vajadusel osalejate praktikas ette tulnud juhtumite kaudu.</p>
                </ContentBlock>
                <ContentBlock title="Registreerumine ja tasumine">
                    <p className='text-sm md:text-base'> Konfliktide lahendamise lühiklassi eesmärgiks on saada ülevaade konfliktejate endi praktikast või soovil ja vajadusel osalejate praktikas ette tulnud juhtumite kaudu.</p>
                </ContentBlock>
            </div>
    
            <ContentBlock title="Akadeemikud">
                <p className='text-sm md:text-base'>Mingi akadeemikute kirjeldav tekst?</p>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-10 mt-5">
                    { course.teachers?.map(teacher => (
                        <TeacherCard key={teacher._key} teacher={teacher as unknown as Teacher} />
                    )) }
                </div>
            </ContentBlock>
            <ContentBlock title="Kontakt">
                <p className='text-sm md:text-base'>..</p>
            </ContentBlock>
          </Container>
          <Footer />
        </main>
      );
}