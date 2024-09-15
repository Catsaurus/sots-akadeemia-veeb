import { ShortCourseListQueryResult, CalendarQueryResult, CalendarEventByCourseQueryResult } from "@/sanity/types";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import Button from "./Button";
import { DATE_FORMAT, formatRange } from "../helpers/date.helper";
import { ArrowRightIcon } from '@heroicons/react/24/solid'
import { useState } from "react";
import { compareAsc, format } from "date-fns";
import clsx from "clsx";
import { sortByStartDate } from "../helpers/event.helper";


interface ShortCourseTableProps {
  shortCourses: ShortCourseListQueryResult;
  calendar: CalendarQueryResult;
  events?: CalendarEventByCourseQueryResult;
  enableRegister?: boolean;
  enableDateFilter?: boolean;
}

export default function ShortCourseTable({ shortCourses, calendar, events, enableDateFilter = false, enableRegister = true }: Readonly<ShortCourseTableProps>) {
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


  const getNextEvent = (courseSlug?: string) => {
    if (!courseSlug) {
      return '';
    }
    const event = calendar.find(e => e.course.slug === courseSlug && (!enableDateFilter || e.parent.startDate === selectedEvent?.startDate));
    if (!event) {
      return '';
    }

    return formatRange(event.startDate!, event.endDate, DATE_FORMAT);
  }

  return (

    <div className="mt-10">
      { enableDateFilter && !!events && 
      <div className="flex flex-col md:flex-row gap-2 md:gap-3">
      { events.toSorted(sortByStartDate).map(event => (
          <button className={clsx(
              'border border-gray-300 rounded-lg pt-2 pb-1 px-4 hover:border-dark',
              {
                  'bg-gray-900 text-white border-gray-900 shadow-lg': event.startDate == selectedEvent?.startDate,
              },
          )}
              key={event._id} onClick={() => setSelectedEvent(event)}
          >{format(event.startDate!, DATE_FORMAT)}</button>
      ))}
  </div> }
      <div className=" md:hidden">

        {
          courseModules.map(m => (
            <div key={m.courseModule} className="mb-10">
              <h3 className="font-display text-gray-900 mb-3">{m.courseModule}</h3>

              {m.courses.map((c, i) => (
                <div key={c._id} className="flex flex-row rounded-md p-5 border border-gray-200 bg-gray-100 mb-2">
                  <div className="flex flex-col w-full">
                    <Link href={`/${c.slug?.current}`} className="">{c.name}
                      <p className="text-xs mt-1">Toimub: {getNextEvent(c.slug?.current)}</p>
                      { !!enableRegister && <p className="text-xs">Registreerimine avatud kuni 03.10.2024</p> }
                    </Link>
                  </div>
                  <ArrowRightIcon className="size-4 md:size-6 md:hidden text-gray-400 md:text-dark group-hover:block " />

                </div>
              ))}
            </div>
          ))}

      </div>



      <table className="hidden md:table w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 bg-gray-50">
          <tr>
            <th className="px-6 py-3">Eriklass</th>
            <th className="px-6 py-3">Lühiklass</th>
            <th className="px-6 py-3">Toimumise aeg</th>
            <th className="px-6 py-3"></th>
          </tr>
        </thead>
        {
          courseModules.map(m => (
            <tbody key={m.courseModule} className="border-b border-gray-300">
              {m.courses.map((c, i) => (
                <tr key={c._id} className="bg-white">
                  {i === 0 && <td className="px-6 py-3" rowSpan={m.courses.length}>{m.courseModule}</td>}
                  <td className="px-6 py-3">
                    <Link href={`/${c.slug?.current}`} className="underline">{c.name}</Link>
                  </td>
                  <td className="px-6 py-3">{getNextEvent(c.slug?.current)}</td>
                  { !!enableRegister && <td className="py-2">
                    <p className="text-xs ">Registreerimine avatud kuni 03.10.2024</p>
                    <Button>
                      Registreeri
                      <ArrowTopRightOnSquareIcon className="-mt-1 h-4 w-4" />
                    </Button>
                  </td> }
                </tr>
              ))}
            </tbody>))
        }
      </table>



    </div>

  )

}