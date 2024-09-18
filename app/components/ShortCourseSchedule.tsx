import { PortableText } from "next-sanity";

import { ShortCourse } from "@/sanity/types";

import ContentBlock from "./ContentBlock"

interface ShortCourseScheduleProps {
  shortCourse: ShortCourse;
}

export default function ShortCourseSchedule({ shortCourse }: Readonly<ShortCourseScheduleProps>) {
  if (!shortCourse.organizationalInformation) {
    return null;
  }
  return (
    <ContentBlock title="Korraldus ja päevakava">
      <PortableText value={shortCourse.organizationalInformation} components={{ types: {
        'table': (props) => {

          const columnCount = props.value.rows[0]?.cells?.length ?? 0;
          return (
            <>
              <table className="hidden md:table max-w-screen-md">
                <tbody>{ props.value.rows.map((row: any, i: number) => (
                  <tr key={row._key}>
                    { row.cells.map((cell: string) => i === 0 ? <th className="text-start" key={cell}>{ cell }</th> : <td key={cell}>{ cell }</td>)}
                  </tr>
                  )) }
                </tbody>
              </table>
              <div className="block md:hidden w-full">
                { Array.from(Array(columnCount)).map((_, colIndex) => (
                  <div key={colIndex} className="mb-6">
                    { props.value.rows.map((row: any, rowIndex: number) => <p key={row._key} className={!rowIndex ? 'font-semibold' : undefined}>
                      { row.cells[colIndex] }
                    </p>)}
                  </div>
                )) }
              </div>
            </>

          )
        }
      } }} />
    </ContentBlock>
  );
}
