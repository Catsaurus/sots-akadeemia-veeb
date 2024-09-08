import { ShortCourseListQueryResult, CalendarQueryResult } from "@/sanity/types";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import Button from "./Button";
import { DATE_FORMAT, formatRange } from "../helpers/date.helper";

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
      <table className="w-full text-sm text-left text-gray-500">
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
          <tbody key={m.courseModule} className="border-b">
            { m.courses.map((c, i) => (
              <tr key={c._id} className="bg-white">
                { i === 0 && <td className="px-6 py-3 font-semibold" rowSpan={m.courses.length}>{ m.courseModule }</td> }
                <td className="px-6 py-3">
                  <Link href={`/${c.slug?.current}`} className="hover:underline">{ c.name }</Link>
                </td>
                <td className="px-6 py-3">{ getNextEvent(c.slug?.current) }</td>
                <td>
                    <Button>
                        Registreeri
                        <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                    </Button>
                </td>
              </tr>
            ))}
          </tbody>))
      }
    </table>
    )
  
  }