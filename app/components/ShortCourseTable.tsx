import { ShortCourseListQueryResult, CalendarQueryResult, CalendarEventByCourseQueryResult, SettingsQueryResult } from "@/sanity/types";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import Button from "./Button";
import { DATE_FORMAT, formatRange } from "../helpers/date.helper";
import { ArrowRightIcon } from '@heroicons/react/24/solid'
import { useState } from "react";
import { format } from "date-fns";
import clsx from "clsx";
import { getEventRegisterableUntilDate, handleRegisterInterest, handleRegisterToEvent, isEventRegisterable, sortByStartDate } from "../helpers/event.helper";


interface ShortCourseTableProps {
  shortCourses: ShortCourseListQueryResult;
  calendar: CalendarQueryResult;
  events?: CalendarEventByCourseQueryResult;
  enableRegister?: boolean;
  enableDateFilter?: boolean;
  settings: SettingsQueryResult;
}

export default function ShortCourseTable({ shortCourses, calendar, events, settings, enableDateFilter = false, enableRegister = true }: Readonly<ShortCourseTableProps>) {
  const [selectedEvent, setSelectedEvent] = useState<CalendarEventByCourseQueryResult[0] | undefined>(events ? events[0] : undefined);

  const sortedCourses = shortCourses.toSorted((a, b) => a.courseModule!.localeCompare(b.courseModule!));

  const courseModules: { courseModule: string; courses: ShortCourseListQueryResult; }[] = [];
  for (const course of sortedCourses) {
    const existing = courseModules.find(m => m.courseModule === course.courseModule);
    if (!existing) {
      courseModules.push({
        courseModule: course.courseModule!,
        courses: [course]
      });
    } else {
      existing.courses.push(course);
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
      <div className="flex flex-col md:flex-row gap-2 md:gap-3">
      { events.toSorted(sortByStartDate).map(event => (
          <button className={clsx(
              'border border-gray-300 rounded-md lg:rounded-lg pt-2 pb-1 px-4 hover:border-dark',
              {
                  'bg-gray-900 text-white border-gray-900 shadow-lg': event.startDate == selectedEvent?.startDate,
              },
          )}
              key={event._id} onClick={() => setSelectedEvent(event)}
          >{format(event.startDate!, DATE_FORMAT)}</button>
      ))}
  </div> }
      <div className="flex flex-col gap-10 md:hidden">

        {
          courseModules.map(m => (
            <div key={m.courseModule} className="">
              <h3 className="font-display text-gray-900 mb-3">{m.courseModule}</h3>

              {m.courses.map((c, i) => {
                const courseEvents = getCourseEvents(c.slug!.current);
                const nextEvent = courseEvents[0];
                const nextRegisterableEvent = courseEvents.filter(isEventRegisterable)[0];

                return (
                <div key={c._id} className="flex flex-row rounded-md p-5 border border-gray-200 bg-gray-100 mb-2">
                  <div className="flex flex-col w-full">
                    <Link href={`/${c.slug?.current}`} className="">{c.name}
                      {
                        !enableRegister && !!nextEvent && <p className="text-xs mt-1">Toimub: { format(nextEvent.startDate!, DATE_FORMAT) }</p>
                      }
                      {
                        !!enableRegister && (
                          !!nextRegisterableEvent ? <>
                            <p className="text-xs mt-1">Toimub: { format(nextRegisterableEvent.startDate!, DATE_FORMAT) }</p>
                            <p className="text-xs">Registreerida saab kuni { format(getEventRegisterableUntilDate(nextRegisterableEvent), DATE_FORMAT) }</p>
                          </> :
                          <p className="text-xs">Klass ei ole registreerimiseks avatud</p>
                        )
                      }
                      
                    </Link>
                  </div>
                  <ArrowRightIcon className="size-4 md:size-6 md:hidden text-gray-400 md:text-dark group-hover:block " />

                </div>
              )})}
            </div>
          ))}

      </div>



      <table className="hidden md:table w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 bg-gray-50">
          <tr>
            <th className="pr-6 py-3 w-[200px]">Eriklass</th>
            <th className="px-6 py-3">Lühiklass</th>
            <th className="px-6 py-3">Registreerimiseks avatud</th>
            <th className="px-6 py-3"></th>
          </tr>
        </thead>
        {
          courseModules.map(m => (
            <tbody key={m.courseModule} className="border-b border-gray-300">
              {m.courses.map((c, i) => {
                const nextRegisterableEvent = getCourseEvents(c.slug!.current).filter(isEventRegisterable)[0];
                return (
                <tr key={c._id} className="bg-white">
                  {i === 0 && <td className="pr-6 py-3 align-top" rowSpan={m.courses.length}>{m.courseModule}</td>}
                  <td className="px-6 py-3">
                    <Link href={`/${c.slug?.current}`} className="underline">{c.name}</Link>
                  </td>
                  <td className="px-6 py-3">
                    {nextRegisterableEvent ? formatRange(nextRegisterableEvent.startDate!, nextRegisterableEvent.endDate, DATE_FORMAT) : '-'}
                  </td>
                  <td className="py-2">
                    {
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
                      </> 
                    }
                    
                  </td>
                </tr>
              )})}
            </tbody>))
        }
      </table>



    </div>

  )

}