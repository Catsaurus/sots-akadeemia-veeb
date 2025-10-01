import { ArrowDownIcon, ArrowTopRightOnSquareIcon } from "@heroicons/react/20/solid";
import { ArrowRightIcon } from '@heroicons/react/24/solid'
import clsx from "clsx";
import { isPast } from "date-fns";
import Link from "next/link";
import { useState } from "react";

import { CalendarEventByCourseQueryResult, CalendarQueryResult, CourseModule,MasterClass,SettingsQueryResult, ShortCourseListQueryResult, SingleClassModuleCourseQueryResult } from "@/sanity/types";

import { DATE_FORMAT, formatRange, format } from "../helpers/date.helper";
import { getEventRegisterableUntilDate, getRegisterInterestLink, getRegisterToEventLink, isEventRegisterable, sortByStartDate } from "../helpers/event.helper";
import Button from "./Button";
import FormattedPortableText from "./FormattedPortableText";

interface GroupedCourseModule {
  courseModule: CourseModule | null;
  masterClass: MasterClass | null;
  courses: ShortCourseListQueryResult;
}

interface ShortCourseTableProps {
  classCourse?: SingleClassModuleCourseQueryResult;
  shortCourses: ShortCourseListQueryResult;
  calendar: CalendarQueryResult;
  events?: CalendarEventByCourseQueryResult;
  enableRegister?: boolean;
  enableDateFilter?: boolean;
  settings: SettingsQueryResult;
  hideCourseModuleColumn?: boolean;
}

export default function ShortCourseTable({
  hideCourseModuleColumn, shortCourses, calendar, events, settings, enableDateFilter = false, enableRegister = true, classCourse
}: Readonly<ShortCourseTableProps>) {
  const [selectedEvent, setSelectedEvent] = useState<CalendarEventByCourseQueryResult[0] | undefined>(events ? events[0] : undefined);

  const classCourseMainEvent = classCourse ? calendar.find(e => e.course.slug === classCourse.slug?.current) : undefined;

  const courseModules: GroupedCourseModule[] = groupAndSortShortCourses(shortCourses, classCourse, enableRegister);

  const displayCourseModuleColumn = !hideCourseModuleColumn && (courseModules.length > 1 || !!courseModules[0]?.courseModule?.name);
  const isModuleShortCourse = shortCourses.some(c => c.isSimplifiedShortCourse);

  return (

    <div className="">
      { enableDateFilter && !!events && 
      <div className="flex flex-wrap items-center gap-1 md:gap-3 mb-4">
        { events.sort(sortByStartDate).map(event => (
          <button className={clsx(
            'border border-gray-300 rounded-md lg:rounded-lg pt-2 pb-1 px-2 md:px-4 hover:border-dark text-xs md:text-base',
            {
                  'bg-gray-900 text-white border-gray-900 shadow-lg': event.startDate == selectedEvent?.startDate,
              },
          )}
            key={event._id} onClick={() => setSelectedEvent(event)}
          >{formatRange(event.startDate!, event.endDate, DATE_FORMAT)}</button>
        ))}
      </div> }
      <div className="flex flex-col gap-10 md:hidden ">

        {
          courseModules.map(m => (
            <div key={m.courseModule?.name ?? 'undefined'} className="">
              { displayCourseModuleColumn && <h3 className="font-display text-gray-900 mb-3">{m.courseModule?.name ?? 'Muud lühiklassid'}</h3>}

              {m.courses.map((c, i) =>
                <TableRowMobile
                  key={c._id}
                  index={i}
                  settings={settings}
                  calendar={calendar}
                  groupedCourseModule={m}
                  classCourse={classCourse}
                  enableRegister={enableRegister}
                  enableDateFilter={enableDateFilter}
                  displayCourseModuleColumn={!displayCourseModuleColumn}
                  selectedEvent={selectedEvent}
                  course={c}
                />
              )}
            </div>
          ))}
        { !enableRegister && classCourseMainEvent?.course._type === 'masterClass' && !isModuleShortCourse &&
          <div className="flex flex-row rounded-md p-5 border border-gray-200 bg-gray-100 mb-2">
            <div className="flex flex-col w-full">
              Kokkuvõtlik taipamiste päev
              <p className="text-xs mt-1">{ classCourseMainEvent.summaryEventDate ? format(classCourseMainEvent.summaryEventDate, DATE_FORMAT) : 'Info peagi tulekul' }</p>
            </div>
          </div>
        }
      </div>



      <table className="hidden md:table w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 bg-gray-50">
          <tr>
            { displayCourseModuleColumn && <th className="pr-6 py-3 w-[200px]">Eriklass</th>}
            <th className={`${!displayCourseModuleColumn ? 'pr-6' : 'px-6'} py-3`}>{isModuleShortCourse ? 'Moodul' : 'Lühiklass'}</th>
            <th className="px-6 py-3">Toimumise kuupäevad</th>
            { !!enableRegister && <th className="px-6 py-3"></th>}
          </tr>
        </thead>
        {
          courseModules.map(m => (
            <tbody key={m.courseModule?.name ?? 'undefined'} className="border-b border-gray-300">
              {m.courses.map((c, i) =>
                <TableRow
                  key={c._id}
                  index={i}
                  settings={settings}
                  calendar={calendar}
                  groupedCourseModule={m}
                  classCourse={classCourse}
                  enableRegister={enableRegister}
                  enableDateFilter={enableDateFilter}
                  displayCourseModuleColumn={displayCourseModuleColumn}
                  selectedEvent={selectedEvent}
                  course={c}
                />
              )}
            </tbody>))
        }
        { !enableRegister && classCourseMainEvent?.course._type === 'masterClass' && !isModuleShortCourse &&
          <tbody>
            <tr >
              { displayCourseModuleColumn && <td></td>}
              <td className={`${!displayCourseModuleColumn ? 'pr-6' : 'px-6'} py-3`}>Kokkuvõtlik taipamiste päev</td>
              <td className="px-6 py-3">{ classCourseMainEvent.summaryEventDate ? format(classCourseMainEvent.summaryEventDate, DATE_FORMAT) : 'Info peagi tulekul' }</td>
            </tr>
          </tbody>
        }
      </table>



    </div>

  )

}

interface TableRowProps {
  index: number;
  settings: SettingsQueryResult;
  calendar: CalendarQueryResult;
  groupedCourseModule: GroupedCourseModule;
  classCourse?: SingleClassModuleCourseQueryResult;
  enableRegister: boolean;
  enableDateFilter: boolean;
  displayCourseModuleColumn?: boolean;
  selectedEvent?: CalendarEventByCourseQueryResult[0];
  course: ShortCourseListQueryResult[0];
}

function TableRowMobile({ calendar, classCourse, enableRegister, enableDateFilter, course, selectedEvent }: Readonly<TableRowProps>) {

  const [expanded, setExpanded] = useState(false);

  const courseEvents = getCourseEvents(calendar, classCourse, enableDateFilter, selectedEvent, course.slug!.current);
  const nextEvent = courseEvents[0];
  const isEventInPast = !!nextEvent && isPast(nextEvent.startDate!);
  const nextRegisterableEvent = !course.documentNotReady && courseEvents.filter(isEventRegisterable)[0];
  const content = <>
    { course.name }

    { expanded && 
      <div className='text-sm gap-6 flex flex-col'>
        { course.body ? <FormattedPortableText value={course.body} /> : undefined }
        { course.organizationalInformation? <FormattedPortableText value={course.organizationalInformation} /> : undefined }

        </div>
      
    }

    { !enableRegister && !!nextEvent && !isEventInPast && <p className="text-xs mt-1">Toimub { formatRange(nextEvent.startDate!, nextEvent.endDate, DATE_FORMAT) }</p> }
    { !enableRegister && !!nextEvent && isEventInPast && <p className="text-xs mt-1">Toimus { formatRange(nextEvent.startDate!, nextEvent.endDate, DATE_FORMAT) }</p> }
    {
      !!enableRegister && (
        !!nextRegisterableEvent ? <>
          <p className="text-xs mt-1">Toimub: { formatRange(nextEvent.startDate!, nextEvent.endDate, DATE_FORMAT) }</p>
          <p className="text-xs">Registreerimine kuni { format(getEventRegisterableUntilDate(nextRegisterableEvent), DATE_FORMAT) } (k.a)</p>
        </> :
        <p className="text-xs">{ course.documentNotReady ? 'Info peagi tulekul' : 'Klass ei ole registreerimiseks avatud' }</p>
      )
    }
  </>
  return (
    <div key={course._id} className="flex flex-row rounded-md p-5 border border-gray-200 bg-gray-100 mb-2">
      <div className="flex flex-col w-full">
        { !course.documentNotReady && !course.isSimplifiedShortCourse && <Link href={`/${course.slug?.current}`} className="">
          { content }
        </Link>}
        { !!course.documentNotReady && !course.isSimplifiedShortCourse && content }
        { course.isSimplifiedShortCourse && <div onClick={() => setExpanded(!expanded)}>{ content }</div>}
      </div>
      { course.isSimplifiedShortCourse && <ArrowDownIcon aria-hidden="true" className={`size-4 md:size-6 md:hidden text-gray-400 md:text-dark group-hover:block transition ${expanded ? 'rotate-180' : ''}`} /> }
      { !course.documentNotReady && !course.isSimplifiedShortCourse && <ArrowRightIcon className="size-4 md:size-6 md:hidden text-gray-400 md:text-dark group-hover:block " />}

    </div>
  )
}

function TableRow({
  index, settings, calendar, classCourse, enableRegister, enableDateFilter,
  displayCourseModuleColumn, groupedCourseModule, course, selectedEvent
}: Readonly<TableRowProps>) {

  const [expanded, setExpanded] = useState(false);

  const courseEvents = getCourseEvents(calendar, classCourse, enableDateFilter, selectedEvent, course.slug!.current);
  const nextEvent = courseEvents[0];
  const isEventInPast = !!nextEvent && isPast(nextEvent.startDate!);
  const nextRegisterableEvent = !course.documentNotReady && courseEvents.filter(isEventRegisterable)[0];

  return (
    <tr key={course._id} className="bg-white">
      {index === 0 && displayCourseModuleColumn && <td className="pr-6 py-3 align-top" rowSpan={groupedCourseModule.courses.length}>{groupedCourseModule.courseModule?.name}</td>}
      <td className={`${!displayCourseModuleColumn ? 'pr-6' : 'px-6'} py-3`}>
        { !course.documentNotReady && !course.isSimplifiedShortCourse && <Link href={`/${course.slug?.current}`} className="underline">{course.name}</Link> }
        { course.isSimplifiedShortCourse && <button className="underline-offset-2, hover:decoration-2 flex gap-2 -mx-2 px-2 py-1 rounded-md hover:text-blue-800" onClick={() => setExpanded(!expanded)}>
            <ArrowDownIcon aria-hidden="true" className={`size-4 text-gray-400 hover:text-blue-800 md:text-dark group-hover:block transition ${expanded ? 'rotate-0' : '-rotate-90'}`} />

          { course.name }

          </button>}
        { !!course.documentNotReady && !course.isSimplifiedShortCourse && course.name }
        { expanded && 
          <div className='p-8 bg-gray-100 border border-gray-200 gap-2 flex flex-col'>
            { course.body ? <FormattedPortableText value={course.body} /> : undefined }
            { course.organizationalInformation? <FormattedPortableText value={course.organizationalInformation} /> : undefined }
          </div>
        }
      </td>
      <td className="px-6 py-3 align-top">
        { (course.documentNotReady || !course.documentNotReady && !enableRegister && !nextEvent) && <span>Info peagi tulekul</span> }
        { !course.documentNotReady && !enableRegister && isEventInPast && <span>Toimus {format(nextEvent.startDate!, DATE_FORMAT)}</span> }
        { !course.documentNotReady && !enableRegister && !!nextEvent && !isEventInPast && <span className="font-bold">{ formatRange(nextEvent.startDate!, nextEvent.endDate, DATE_FORMAT) }</span> }
        { !course.documentNotReady && !!enableRegister && !!nextRegisterableEvent && formatRange(nextRegisterableEvent.startDate!, nextRegisterableEvent.endDate, DATE_FORMAT) }
        
      </td>
      { !!enableRegister && <td className="py-2">
        { !course.documentNotReady && !!nextRegisterableEvent && <>
            <Button color="blue" as="link" className="min-w-[150px]" href={getRegisterToEventLink(nextRegisterableEvent, course)}>
              Registreeri
              <ArrowTopRightOnSquareIcon className="-mt-1 h-4 w-4" />
            </Button>
            <p className="text-xs mt-1">Registreerimine kuni {format(getEventRegisterableUntilDate(nextRegisterableEvent), DATE_FORMAT) } (k.a)</p>
          </> 
        }
        { !course.documentNotReady && !nextRegisterableEvent &&
          <Button color="yellow" className="min-w-[150px]" as="link" href={getRegisterInterestLink(settings, course)}>
            Registreeri huvi
            <ArrowTopRightOnSquareIcon className="-mt-1 h-4 w-4" />
          </Button>
          }
        { !!course.documentNotReady && <span className="px-4">Info peagi tulekul</span> }
        
      </td> }
    </tr>
  )
}

const getCourseEvents = (
  calendar: CalendarQueryResult, 
  classCourse: SingleClassModuleCourseQueryResult | undefined,
  enableDateFilter: boolean, 
  selectedEvent?: CalendarEventByCourseQueryResult[0], 
  courseSlug?: string
) => {

  if (!courseSlug) {
    return [];
  }
  return calendar.filter(e => {

    const parents = classCourse?._type === 'courseModule' ? e.parentCourseModules : e.parentMasterClasses;

    return e.course.slug === courseSlug && (!enableDateFilter ||
      (parents ?? []).some(parent => parent.startDate === selectedEvent?.startDate && parent.course.name === selectedEvent?.course.name));
  });
}

function groupAndSortShortCourses(
  shortCourses: ShortCourseListQueryResult, classCourse: SingleClassModuleCourseQueryResult | undefined, enableRegister: boolean
) {
  const courseModules: GroupedCourseModule[] = [];

  for (const course of shortCourses) {
    if (enableRegister && course.isSimplifiedShortCourse) {
      continue;
    }
    const existing = courseModules.find(m => m.courseModule?.name === course.courseModule?.name);

    if (!existing) {
      courseModules.push({
        courseModule: course.courseModule,
        masterClass: course.masterClass,
        courses: [course]
      });
    } else {
      existing.courses.push(course);
    }
  }


  for (const courseModule of courseModules) {
    const order = (courseModule.courseModule ?? courseModule.masterClass)?.courses?.map(c => c._ref);

    if (order) {
      courseModule.courses.sort((a, b) => order.indexOf(a._id) - order.indexOf(b._id));
    }
  }

  const classCourseCourses = classCourse ? (classCourse.courses ?? []).map(c => c.slug?.current) : undefined;
  return courseModules.sort((a, b) => !a.courseModule ? 1 : !b.courseModule ? -1 : (
    classCourseCourses ? classCourseCourses.indexOf(a.courses[0].slug?.current) - classCourseCourses?.indexOf(b.courses[0].slug?.current) : 0
  ));

  return courseModules;
}
