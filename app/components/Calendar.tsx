"use client"

import { CalendarQueryResult } from "@/sanity/types"
import Link from "next/link";
import { useState } from "react";
import clsx from 'clsx';
import { ArrowRightIcon } from '@heroicons/react/24/solid'

interface CalendarProps {
    events: CalendarQueryResult;
}

export default function Calendar({ events }: Readonly<CalendarProps>) {

    const [selectedYear, setSelectedYear] = useState<string>(new Date().getFullYear().toString());

    const eventsByYear: { [key: string]: CalendarQueryResult } = {};
    for (const event of events) {
        if (!event.startDate) {
            continue;
        }
        const year = event.startDate.substring(0, 4);
        const existing = eventsByYear[year];
        if (existing) {
            existing.push(event);
        } else {
            eventsByYear[year] = [event];
        }
    }

    return (
        <div className="flex flex-col ">
            <div className="flex gap-3">
                {Object.keys(eventsByYear).map(year => (
                    <button className={clsx(
                        'border border-gray-300 rounded-lg pt-2 pb-1 px-4 hover:border-dark',
                        {
                            'bg-gray-900 text-white border-gray-900 shadow-lg': year == selectedYear,
                        },
                    )}
                        key={year} onClick={() => setSelectedYear(year)}
                    >{year}</button>
                ))}
            </div>
            <div className="flex flex-col mt-4">
                {eventsByYear[selectedYear]?.map(event => (
                    <div className="border-b border-gray-300 py-5 flex flex-col md:flex-row">
                         
                        <span className="pr-10 text-sm md:text-md">{event.startDate} - {event.endDate}</span>
                         {/* <span className="pr-10 text-md">10.veeb-13.veeb</span>*/}
                        
                        <Link key={event._id} href={`/${event.course.slug}`} className="flex flex-auto items-center flex-row hover:text-gray-800 hover:pl-1 group transition-all justify-between active:text-gray-400">
                            <div className="flex flex-col">
                                <h6 className="text-xl font-medium group-hover:underline">{event.course.name}</h6>
                                <small className="text-sm">lühiklass (20 ak), {event.course.moduleName}</small>
                            </div>
                            <ArrowRightIcon className="size-6 md:hidden text-gray-400 md:text-dark group-hover:block " />
                        </Link>
                      
                    </div>
                ))}
            </div>
        </div>
    )
}