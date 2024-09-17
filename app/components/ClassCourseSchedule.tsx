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
    classCourse: SingleClassModuleCourseQueryResult;
    events: CalendarEventByCourseQueryResult;
    calendar: CalendarQueryResult;
    shortCourses: ShortCourseListQueryResult;
    settings: SettingsQueryResult;
}

export default function ClassCourseSchedule({ shortCourses, classCourse, events, calendar, settings }: Readonly<MasterClassSchedule>) {
    const filteredShortCourses = shortCourses.filter(course => classCourse!.courses?.some(c => c.slug?.current === course.slug?.current))

    return (
        <ContentBlock title={`${ classCourse?._type === 'courseModule' ? 'Eriklassi' : 'Meistriklassi'} graafik`}>
            <ShortCourseTable
                shortCourses={filteredShortCourses}
                calendar={calendar}
                events={events}
                enableDateFilter
                enableRegister={false}
                hideCourseModuleColumn={classCourse?._type === 'courseModule'}
                settings={settings}
            />
        </ContentBlock>
    )

}