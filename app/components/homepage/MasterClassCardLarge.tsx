import Link from "next/link";
import React from 'react'

import { MasterClassListQueryResult } from "@/sanity/types";
import { DATE_FORMAT, format, formatRange } from "@/app/helpers/date.helper";

interface SimplifiedShortCourse {
    _id: string;
    name: string | null;
    isSimplifiedShortCourse: boolean | null;
    dateRanges: Array<{
        startDate?: string;
        endDate?: string;
    }> | null;
}

const MasterClassCardLarge = ({ masterClasses = [] }: { masterClasses: MasterClassListQueryResult }) => {
    return (
        <div className="lg:mx-auto grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 xl:gap-8">

            {masterClasses.map((masterClass) => {
                const shortCourses = (((masterClass as any).simplifiedShortCourses ?? []) as (SimplifiedShortCourse | null)[]).filter((sc): sc is SimplifiedShortCourse => sc != null);

                return (
                <div key={masterClass._id} className="rounded-tr-md lg:rounded-tr-lg rounded-bl-md lg:rounded-bl-lg group transition flex flex-col"
                    style={{ backgroundColor: masterClass.color?.hex }}>

                    <div className="bg-[url('/static/bg-image.webp')] p-6 lg:p-8 w-full rounded-tr-md lg:rounded-tr-lg relative">
                        <span style={{ backgroundColor: masterClass.color?.hex }} className="opacity-40 w-full h-full absolute top-0 left-0 rounded-tr-md lg:rounded-tr-lg" ></span>
                    </div>


                    <div className="p-6 md:p-6 lg:p-8 xl:p-10 md:py-10 flex flex-col gap-3 md:gap-6 h-100">
                        <Link className="text-lg lg:text-xl xl:text-2xl font-display group-hover:underline text-wrap"

                            key={masterClass._id}
                            href={`/${masterClass.slug?.current}`}
                        >
                            {masterClass.name}
                        </Link>

                        <p className="text-sm md:text-base flex-grow">{masterClass.shortDescription}</p>

                        {shortCourses.length > 0 && (
                            <div className="flex flex-col gap-2 pt-2 border-t border-black/10">
                                <h4 className="text-xs font-semibold uppercase tracking-wide opacity-70">Lühiklasside toimumise kuupäevad</h4>
                                {shortCourses.map((sc) => {
                                    const sortedRanges = [...(sc.dateRanges ?? [])].filter(r => r.startDate).sort((a, b) => a.startDate!.localeCompare(b.startDate!));
                                    if (sortedRanges.length === 0) return null;
                                    return (
                                        <div key={sc._id} className="text-sm">
                                            <span className="font-medium">{sc.name}</span>
                                            <ul className="mt-0.5">
                                                {sortedRanges.map((range, i) => (
                                                    <li key={i} className="text-xs opacity-80">
                                                        {range.startDate === range.endDate
                                                            ? format(range.startDate!, DATE_FORMAT)
                                                            : formatRange(range.startDate!, range.endDate, DATE_FORMAT)
                                                        }
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                       {/* <div className="flex flex-row gap-2">
                            <span className="text-xs md:text-sm pb-1 pt-2 px-2 bg-dark bg-opacity-10 rounded-sm">{ masterClass.minParticipants }-{ masterClass.maxParticipants } osalejat</span>
                            <span className="text-xs md:text-sm pb-1 pt-2 px-2 bg-dark bg-opacity-10 rounded-sm">{ masterClass.courseSize } ak h</span>
                        </div>
                        <Link className="p-2 hover:underline underline-offset-2"
                            key={masterClass._id}
                            href={`/${masterClass.slug?.current}`}
                        >Loe rohkem </Link>*/}
                    </div>
                </div>
                );
            })}
        </div>

    )
}

export default MasterClassCardLarge