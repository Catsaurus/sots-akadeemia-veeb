import {
    CalendarEventByCourseQueryResult,
    CalendarQueryResult,
    SettingsQueryResult,
    ShortCourseListQueryResult,
    SingleClassModuleCourseQueryResult
} from "@/sanity/types";
import ContentBlock from "./ContentBlock";
import ShortCourseTable from "./ShortCourseTable";

interface MasterClassSchedule {
    masterClass: SingleClassModuleCourseQueryResult;
    events: CalendarEventByCourseQueryResult;
    calendar: CalendarQueryResult;
    shortCourses: ShortCourseListQueryResult;
    settings: SettingsQueryResult;
}

export default function MasterClassSchedule({ shortCourses, masterClass, events, calendar, settings }: Readonly<MasterClassSchedule>) {


    console.log(masterClass, events, calendar);
    const shortCourseEvents = calendar.filter(event => event.course._type === 'shortCourse' && event.parent?.course?.slug && event.parent?.course?.slug === masterClass!.slug?.current);
    console.log(shortCourseEvents);
    const filteredShortCourses = shortCourses.filter(course => masterClass!.courses?.some(c => c.slug?.current === course.slug?.current))
    return (
        <ContentBlock title="Meistriklassi graafik">
            <ShortCourseTable
                shortCourses={filteredShortCourses}
                calendar={calendar}
                events={events}
                enableDateFilter
                enableRegister={false}
                settings={settings}
            />
        </ContentBlock>
    )

}