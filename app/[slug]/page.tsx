import React from 'react';

import { client } from "@/sanity/lib/client";
import { sanityFetch } from "@/sanity/lib/fetch";
import { 
    CalendarEventByCourseQuery,
    CalendarQuery,
    CourseModuleListQuery,
    MasterClassListQuery,
    MasterClassPathsQuery,
    SettingsQuery,
    ShortCourseListQuery,
    SingleClassModuleCourseQuery,
    SingleGenericPageQuery
} from "@/sanity/lib/queries";
import {
    CalendarEventByCourseQueryResult,
    CalendarQueryResult,
    CourseModuleListQueryResult,
    GenericPage as GenericPageType,
    MasterClassListQueryResult,
    SettingsQueryResult,
    ShortCourseListQueryResult,
    SingleClassModuleCourseQueryResult,
    SingleGenericPageQueryResult
} from '@/sanity/types';

import CourseModulePage from '../components/pages/CourseModulePage';
import GenericPage from '../components/pages/GenericPage';
import MasterClassPage from '../components/pages/MasterClassPage';
import { ShortCoursePage } from '../components/pages/ShortCoursePage';
import { sortByStartDate } from '../helpers/event.helper';

export async function generateStaticParams() {
    return await client.fetch(MasterClassPathsQuery);
}

const Page = async ({ params }: { params: any }) => {

    const [settings, masterClasses, courseModules, shortCourses, course, genericPage, events, calendar] = await Promise.all([
        sanityFetch<SettingsQueryResult>({ query: SettingsQuery }),
        sanityFetch<MasterClassListQueryResult>({ query: MasterClassListQuery }),
        sanityFetch<CourseModuleListQueryResult>({ query: CourseModuleListQuery }),
        sanityFetch<ShortCourseListQueryResult>({ query: ShortCourseListQuery, params }),
        sanityFetch<SingleClassModuleCourseQueryResult>({ query: SingleClassModuleCourseQuery, params }),
        sanityFetch<SingleGenericPageQueryResult>({ query: SingleGenericPageQuery, params }),
        sanityFetch<CalendarEventByCourseQueryResult>({ query: CalendarEventByCourseQuery, params }),
        sanityFetch<CalendarQueryResult>({ query: CalendarQuery, params })
    ]);

    calendar.sort(sortByStartDate);

    const type = genericPage?._type ?? course?._type;

    if (type === 'masterClass') {
        return (
            <MasterClassPage
                settings={settings}
                masterClasses={masterClasses}
                courseModules={courseModules}
                shortCourses={shortCourses}
                masterClass={course}
                events={events}
                calendar={calendar}
            />);
    } else if (type === 'courseModule') {
        return (
            <CourseModulePage
                settings={settings}
                masterClasses={masterClasses}
                courseModules={courseModules}
                shortCourses={shortCourses}
                courseModule={course}
                events={events}
                calendar={calendar}
            />
        )
    } else if (type === 'shortCourse') {
        return (
            <ShortCoursePage
                settings={settings}
                masterClasses={masterClasses}
                courseModules={courseModules}
                shortCourse={course}
                events={events}
                calendar={calendar}
            />
        )
    } else {
        return (
            <GenericPage
                settings={settings}
                masterClasses={masterClasses}
                courseModules={courseModules}
                shortCourses={shortCourses}
                page={genericPage as unknown as GenericPageType}
                calendar={calendar}
            />
        )
    }

    return null;
}

export default Page;
