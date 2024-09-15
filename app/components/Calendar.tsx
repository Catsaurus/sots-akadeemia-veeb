"use client"

import { CalendarQueryResult } from "@/sanity/types"
import Link from "next/link";
import { useState } from "react";
import clsx from 'clsx';
import { ArrowRightIcon } from '@heroicons/react/24/solid'
import { DATE_FORMAT, format, formatRange } from "../helpers/date.helper";
import { compareAsc, compareDesc, isBefore } from "date-fns";

interface CalendarProps {
    showFullDate?: boolean;
    events: CalendarQueryResult;
}

export default function Calendar({ showFullDate, events }: Readonly<CalendarProps>) {

    const [selectedYear, setSelectedYear] = useState<string>(new Date().getFullYear().toString());

    const eventsByYear: { [key: string]: CalendarQueryResult } = {};
    for (const event of events) {
        if (!event.startDate) {
            continue;
        }
        let date;
        if (!showFullDate) {
            date = event.startDate.substring(0, 4);
        } else {
            date = event.startDate;
        }
        const existing = eventsByYear[date];
        if (existing) {
            existing.push(event);
        } else {
            eventsByYear[date] = [event];
        }
    }

    return (
        <div className="flex flex-col ">
            <div className="flex gap-3">
                {Object.keys(eventsByYear).toSorted((a, b) => compareAsc(a, b)).map(year => (
                    <button className={clsx(
                        'border border-gray-300 rounded-lg pt-2 pb-1 px-4 hover:border-dark',
                        {
                            'bg-gray-900 text-white border-gray-900 shadow-lg': year == selectedYear,
                        },
                    )}
                        key={year} onClick={() => setSelectedYear(year)}
                    >{format(year, DATE_FORMAT)}</button>
                ))}
            </div>
            <div className="flex flex-col mt-4">
                {eventsByYear[selectedYear]?.map(event => (
                    <div key={event._id} className="border-b border-gray-300 py-5 flex flex-col md:flex-row">
                         
                        <span className="pr-10 text-sm md:text-md pt-1">{formatRange(event.startDate!, event.endDate, DATE_FORMAT)}</span>
                         {/* <span className="pr-10 text-md">10.veeb-13.veeb</span>*/}
                        
                        <Link key={event._id} href={`/${event.course.slug}`} className="flex flex-auto items-center flex-row md:hover:text-gray-800 md:hover:pl-1 group transition-all justify-between active:text-gray-400">
                            <div className="flex flex-col">
                                <h6 className="text-md md:text-xl font-medium group-hover:underline">{event.course.name}</h6>
                                <small className="text-xs md:text-sm">lühiklass (20 ak), {event.course.moduleName}</small>
                            </div>
                            <ArrowRightIcon className="size-4 md:size-6 md:hidden text-gray-400 md:text-dark group-hover:block " />
                        </Link>
                      
                    </div>
                ))}
            </div>
        </div>
    )
}