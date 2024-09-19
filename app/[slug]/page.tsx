import { Metadata } from 'next';
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
import { PageSeo } from '@/sanity/seo-types';
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
import { getSeoMetadata } from '../helpers/metadata.helper';

type Props = {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
  }

export async function generateStaticParams() {
    return await client.fetch(MasterClassPathsQuery);
}

export async function generateMetadata(
    { params }: Props
  ): Promise<Metadata> {
  
    const [course, genericPage] = await Promise.all([
        sanityFetch<SingleClassModuleCourseQueryResult>({ query: SingleClassModuleCourseQuery, params }),
        sanityFetch<SingleGenericPageQueryResult>({ query: SingleGenericPageQuery, params }),
    ]);

    const type = genericPage?._type ?? course?._type;

    const page = type === 'genericPage' ? genericPage : course;
    if (!page) {
        return {}
    }

    return getSeoMetadata(page.slug!.current!, page!.seo as unknown as PageSeo);
}

const Page = async ({ params }: Props) => {

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

    let Component;

    if (type === 'masterClass') {
        Component = <MasterClassPage
            settings={settings}
            masterClasses={masterClasses}
            courseModules={courseModules}
            shortCourses={shortCourses}
            masterClass={course}
            events={events}
            calendar={calendar}
        />;
    } else if (type === 'courseModule') {
        Component = <CourseModulePage
            settings={settings}
            masterClasses={masterClasses}
            courseModules={courseModules}
            shortCourses={shortCourses}
            courseModule={course}
            events={events}
            calendar={calendar}
        />;
    } else if (type === 'shortCourse') {
        Component = <ShortCoursePage
            settings={settings}
            masterClasses={masterClasses}
            courseModules={courseModules}
            shortCourse={course}
            events={events}
            calendar={calendar}
        />;
    } else {
        Component = <GenericPage
            settings={settings}
            masterClasses={masterClasses}
            courseModules={courseModules}
            shortCourses={shortCourses}
            page={genericPage as unknown as GenericPageType}
            calendar={calendar}
        />;
    }

    return Component;
}

export default Page;
