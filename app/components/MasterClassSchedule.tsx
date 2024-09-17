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