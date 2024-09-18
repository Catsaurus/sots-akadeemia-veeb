import { ArrowTopRightOnSquareIcon } from "@heroicons/react/20/solid";
import { ArrowRightIcon } from '@heroicons/react/24/solid'
import clsx from "clsx";
import { format } from "date-fns";
import Link from "next/link";
import { useState } from "react";

import { CalendarEventByCourseQueryResult, CalendarQueryResult, CourseModule,SettingsQueryResult, ShortCourseListQueryResult } from "@/sanity/types";

import { DATE_FORMAT, formatRange } from "../helpers/date.helper";
import { getEventRegisterableUntilDate, handleRegisterInterest, handleRegisterToEvent, isEventRegisterable, sortByStartDate } from "../helpers/event.helper";
import Button from "./Button";


interface ShortCourseTableProps {
  shortCourses: ShortCourseListQueryResult;
  calendar: CalendarQueryResult;
  events?: CalendarEventByCourseQueryResult;
  enableRegister?: boolean;
  enableDateFilter?: boolean;
  settings: SettingsQueryResult;
  hideCourseModuleColumn?: boolean;
}

export default function ShortCourseTable({
  hideCourseModuleColumn, shortCourses, calendar, events, settings, enableDateFilter = false, enableRegister = true
}: Readonly<ShortCourseTableProps>) {
  const [selectedEvent, setSelectedEvent] = useState<CalendarEventByCourseQueryResult[0] | undefined>(events ? events[0] : undefined);

  const courseModules: { courseModule: CourseModule | null; courses: ShortCourseListQueryResult; }[] = [];

  for (const course of shortCourses) {
    const existing = courseModules.find(m => m.courseModule?.name === course.courseModule?.name);
    if (!existing) {
      courseModules.push({
        courseModule: course.courseModule,
        courses: [course]
      });
    } else {
      existing.courses.push(course);
    }
  }

  courseModules.sort((a, b) => !a.courseModule ? 1 : !b.courseModule ? -1 : 0);

  for (const courseModule of courseModules) {
    const order = courseModule.courseModule?.courses?.map(c => c._ref);
    if (order) {
      courseModule.courses.sort((a, b) => order.indexOf(a._id) - order.indexOf(b._id));
    }
  }

  const getCourseEvents = (courseSlug?: string) => {
    if (!courseSlug) {
      return [];
    }
    return calendar.filter(e => e.course.slug === courseSlug && (!enableDateFilter || e.parent.startDate === selectedEvent?.startDate));
  }

  return (

    <div className="">
      { enableDateFilter && !!events && 
      <div className="flex flex-wrap items-center gap-1 md:gap-3 mb-4">
        { events.toSorted(sortByStartDate).map(event => (
          <button className={clsx(
            'border border-gray-300 rounded-md lg:rounded-lg pt-2 pb-1 px-2 md:px-4 hover:border-dark text-xs md:text-base',
            {
                  'bg-gray-900 text-white border-gray-900 shadow-lg': event.startDate == selectedEvent?.startDate,
              },
          )}
            key={event._id} onClick={() => setSelectedEvent(event)}
          >{format(event.startDate!, DATE_FORMAT)}</button>
        ))}
      </div> }
      <div className="flex flex-col gap-10 md:hidden ">

        {
          courseModules.map(m => (
            <div key={m.courseModule?.name ?? 'undefined'} className="">
              { !hideCourseModuleColumn && <h3 className="font-display text-gray-900 mb-3">{m.courseModule?.name ?? 'Muud lühiklassid'}</h3>}

              {m.courses.map((c, i) => {
                const courseEvents = getCourseEvents(c.slug!.current);
                const nextEvent = courseEvents[0];
                const nextRegisterableEvent = !c.documentNotReady && courseEvents.filter(isEventRegisterable)[0];
                const content = <>
                  {c.name}
                  {
                    !enableRegister && !!nextEvent && <p className="text-xs  mt-1">Toimub: { format(nextEvent.startDate!, DATE_FORMAT) }</p>
                  }
                  {
                    !!enableRegister && (
                      !!nextRegisterableEvent ? <>
                        <p className="text-xs mt-1">Toimub: { format(nextRegisterableEvent.startDate!, DATE_FORMAT) }</p>
                        <p className="text-xs">Registreerida saab kuni { format(getEventRegisterableUntilDate(nextRegisterableEvent), DATE_FORMAT) }</p>
                      </> :
                      <p className="text-xs">{ c.documentNotReady ? 'Info peagi tulekul' : 'Klass ei ole registreerimiseks avatud'}</p>
                    )
                  }
                </>
                return (
                <div key={c._id} className="flex flex-row rounded-md p-5 border border-gray-200 bg-gray-100 mb-2">
                  <div className="flex flex-col w-full">
                    { !c.documentNotReady && <Link href={`/${c.slug?.current}`} className="">
                      { content }
                    </Link>}
                    { !!c.documentNotReady && content }
                  </div>
                 { !c.documentNotReady && <ArrowRightIcon className="size-4 md:size-6 md:hidden text-gray-400 md:text-dark group-hover:block " />}

                </div>
              )})}
            </div>
          ))}

      </div>



      <table className="hidden md:table w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 bg-gray-50">
          <tr>
            { !hideCourseModuleColumn && <th className="pr-6 py-3 w-[200px]">Eriklass</th>}
            <th className={`${hideCourseModuleColumn ? 'pr-6' : 'px-6'} py-3`}>Lühiklass</th>
            <th className="px-6 py-3">{ enableRegister ? 'Registreerimiseks avatud' : 'Toimumise kuupäev' }</th>
            { !!enableRegister && <th className="px-6 py-3"></th>}
          </tr>
        </thead>
        {
          courseModules.map(m => (
            <tbody key={m.courseModule?.name ?? 'undefined'} className="border-b border-gray-300">
              {m.courses.map((c, i) => {
                const courseEvents = getCourseEvents(c.slug!.current);
                const nextEvent = courseEvents[0];
                const nextRegisterableEvent = !c.documentNotReady && courseEvents.filter(isEventRegisterable)[0];

                return (
                <tr key={c._id} className="bg-white">
                  {i === 0 && !hideCourseModuleColumn && <td className="pr-6 py-3 align-top" rowSpan={m.courses.length}>{m.courseModule?.name}</td>}
                  <td className={`${hideCourseModuleColumn ? 'pr-6' : 'px-6'} py-3`}>
                    { !c.documentNotReady && <Link href={`/${c.slug?.current}`} className="underline">{c.name}</Link> }
                    { !!c.documentNotReady && c.name }
                  </td>
                  <td className="px-6 py-3">
                    { !c.documentNotReady && !enableRegister && !!nextEvent && format(nextEvent.startDate!, DATE_FORMAT) }
                    { !c.documentNotReady && !!enableRegister && !!nextRegisterableEvent && formatRange(nextRegisterableEvent.startDate!, nextRegisterableEvent.endDate, DATE_FORMAT) }
                    { !enableRegister && !nextEvent && !c.documentNotReady && <span>Info peagi tulekul</span> }
                  </td>
                  { !!enableRegister && <td className="py-2">
                    { !c.documentNotReady ?
                      !!nextRegisterableEvent ? <>
                        <Button color="blue" className="min-w-[150px]" onClick={() => handleRegisterToEvent(nextRegisterableEvent, c)}>
                          Registreeri
                          <ArrowTopRightOnSquareIcon className="-mt-1 h-4 w-4" />
                        </Button>
                        <p className="text-xs mt-1">Registreerida saab kuni {format(getEventRegisterableUntilDate(nextRegisterableEvent), DATE_FORMAT) }</p>
                      </> : <>
                        <Button color="yellow" className="min-w-[150px]" onClick={() => handleRegisterInterest(settings, c)}>
                          Registreeri huvi
                          <ArrowTopRightOnSquareIcon className="-mt-1 h-4 w-4" />
                        </Button>
                      </> : <span className="px-4">Info peagi tulekul</span>
                    }
                    
                  </td>}
                </tr>
              )})}
            </tbody>))
        }
      </table>



    </div>

  )

}