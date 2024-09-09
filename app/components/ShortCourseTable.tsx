import { ShortCourseListQueryResult, CalendarQueryResult } from "@/sanity/types";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import Button from "./Button";
import { DATE_FORMAT, formatRange } from "../helpers/date.helper";
import { ArrowRightIcon } from '@heroicons/react/24/solid'


interface ShortCourseTableProps {
  shortCourses: ShortCourseListQueryResult;
  calendar: CalendarQueryResult;
}

export default function ShortCourseTable({ shortCourses, calendar }: Readonly<ShortCourseTableProps>) {
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
    const event = calendar.find(e => e.course.slug === courseSlug);
    if (!event) {
      return '';
    }

    return formatRange(event.startDate!, event.endDate, DATE_FORMAT);
  }

  return (

    <div className="mt-10">
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
                      <p className=" text-xs">Registreerimine avatud kuni 03.10.2024</p>
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
                  {i === 0 && <td className="py-3" rowSpan={m.courses.length}>{m.courseModule}</td>}
                  <td className="px-6 py-3">
                    <Link href={`/${c.slug?.current}`} className="underline">{c.name}</Link>
                  </td>
                  <td className="px-6 py-3">{getNextEvent(c.slug?.current)}</td>
                  <td className="py-2">
                    <p className="text-xs ">Registreerimine avatud kuni 03.10.2024</p>
                    <Button>
                      Registreeri
                      <ArrowTopRightOnSquareIcon className="-mt-1 h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>))
        }
      </table>



    </div>

  )

}