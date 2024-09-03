"use client"

import { CalendarQueryResult } from "@/sanity/types"
import Link from "next/link";
import { useState } from "react";

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
        <div className="flex flex-col">
            <div className="flex gap-3">
                { Object.keys(eventsByYear).map(year => (
                    <button className="border-2 rounded-lg p-3" key={year} onClick={() => setSelectedYear(year)}>{ year }</button>
                )) }
            </div>
            <div className="flex flex-col">
                { eventsByYear[selectedYear]?.map(event => (
                    <Link key={event._id} className="border-b-2 p-3 flex justify-between" href={`/${event.course.slug}`}>
                        <div className="flex flex-col">
                            <strong>{ event.course.name }</strong>
                            <small>{ event.course.moduleName }</small>
                        </div>
                        <span>{ event.startDate } - { event.endDate }</span>
                    </Link>
                ))}
            </div>
        </div>
    )
}