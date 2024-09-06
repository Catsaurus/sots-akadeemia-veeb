import React from 'react';
import { 
    CourseModuleListQuery,
    MasterClassListQuery,
    MasterClassPathsQuery,
    SingleClassModuleCourseQuery,
    SettingsQuery,
    ShortCourseListQuery,
    CalendarEventByCourseQuery,
    CalendarQuery
} from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/fetch";
import { client } from "@/sanity/lib/client";
import MasterClassPage from '../components/pages/MasterClassPage';
import {
    CourseModuleListQueryResult,
    MasterClassListQueryResult,
    SingleClassModuleCourseQueryResult,
    SettingsQueryResult,
    CourseModule,
    MasterClass,
    ShortCourse,
    GenericPage as GenericPageType,
    ShortCourseListQueryResult,
    CalendarEventByCourseQueryResult,
    CalendarQueryResult
} from '@/sanity/types';
import CourseModulePage from '../components/pages/CourseModulePage';
import { ShortCoursePage } from '../components/pages/ShortCoursePage';
import GenericPage from '../components/pages/GenericPage';

export async function generateStaticParams() {
    return await client.fetch(MasterClassPathsQuery);
}

const Page = async ({ params }: { params: any }) => {

    const [settings, masterClasses, courseModules, shortCourses, pageInfo, events, calendar] = await Promise.all([
        sanityFetch<SettingsQueryResult>({ query: SettingsQuery }),
        sanityFetch<MasterClassListQueryResult>({ query: MasterClassListQuery }),
        sanityFetch<CourseModuleListQueryResult>({ query: CourseModuleListQuery }),
        sanityFetch<ShortCourseListQueryResult>({ query: ShortCourseListQuery, params }),
        sanityFetch<SingleClassModuleCourseQueryResult>({ query: SingleClassModuleCourseQuery, params }),
        sanityFetch<CalendarEventByCourseQueryResult>({ query: CalendarEventByCourseQuery, params }),
        sanityFetch<CalendarQueryResult>({ query: CalendarQuery, params })
    ]);

    if (pageInfo?._type === 'masterClass') {
        return (
        <MasterClassPage
            settings={settings}
            masterClasses={masterClasses}
            courseModules={courseModules}
            masterClass={pageInfo as unknown as MasterClass}
            events={events}
        />);
    } else if (pageInfo?._type === 'courseModule') {
        return (
            <CourseModulePage
                settings={settings}
                masterClasses={masterClasses}
                courseModules={courseModules}
                courseModule={pageInfo as unknown as CourseModule}
            />
        )
    } else if (pageInfo?._type === 'shortCourse') {
        return (
            <ShortCoursePage
                settings={settings}
                masterClasses={masterClasses}
                courseModules={courseModules}
                shortCourse={pageInfo as unknown as ShortCourse}
                events={events}
            />
        )
    } else {
        return (
            <GenericPage
                settings={settings}
                masterClasses={masterClasses}
                courseModules={courseModules}
                shortCourses={shortCourses}
                page={pageInfo as unknown as GenericPageType}
                calendar={calendar}
            />
        )
    }

    return null;
}

export default Page;
