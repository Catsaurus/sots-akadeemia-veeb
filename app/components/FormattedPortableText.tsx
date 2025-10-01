import Image from "next/image";
import { PortableText, PortableTextReactComponents } from "next-sanity";
import { useMemo } from "react";
import { TypedObject } from "sanity";

import { urlFor } from "@/sanity/lib/image";

interface FormattedPortableTextProps {
    value: TypedObject | TypedObject[];
}

export default function FormattedPortableText({ value }: Readonly<FormattedPortableTextProps>) {

    const components = useMemo((): Partial<PortableTextReactComponents> => {
        return {
            list: {
                number: (props) => (
                    <ol className="list-counter">{props.children}</ol>
                ),
                bullet: (props) => (
                    <ul className="list-disc pl-4">
                        {props.children}
                    </ul>
                )
            },
            listItem: (props) => {
                return <li className="my-1 ml-3">{ props.children }</li>
            },
            block: {
                h2: (props) => (
                    <h2 className="text-2xl">{ props.children }</h2>
                ),
                h3: (props) => (
                    <h3 className="text-xl">{ props.children }</h3>
                ),
                h4: (props) => (
                    <h4 className="text-lg">{ props.children }</h4>
                ),
                blockquote: (props) => (
                    <blockquote className="text-lg italic text-gray-900 flex gap-2 my-4">
                        <svg className="min-w-7 w-7 h-7 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
                            <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z"/>
                        </svg>
                        <p>{props.children}</p>
                    </blockquote>
                )
            },
            types: {
                table: (props) => {
        
                  const columnCount = props.value.rows[0]?.cells?.length ?? 0;
                  return (
                    <>
                      <table className="hidden md:table w-full max-w-screen-md">
                        <tbody>{ props.value.rows.map((row: any, i: number) => (
                          <tr key={row._key}>
                            { row.cells.map((cell: string) => i === 0 ? <th className="text-start p-2 border border-gray-300" key={cell}>{ cell }</th> : <td className=" p-2 border border-gray-300" key={cell}>{ cell }</td>)}
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
                },
                image: (props) => {
                    return <Image alt="" width={500} height={300} src={urlFor(props.value.asset).width(400).url()} />
                }
              }
          }
    }, []);
 
    return (
        <PortableText
            value={value}
            components={components}
        />
    )
}