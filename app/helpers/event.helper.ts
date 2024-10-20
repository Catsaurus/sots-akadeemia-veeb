import { compareAsc, endOfDay, isBefore, subDays } from "date-fns"

import { CalendarEventByCourseQueryResult, SettingsQueryResult } from "@/sanity/types"

import { EVENT_URL_DATE_FORMAT, format } from "./date.helper";

export const EVENT_REGISTRATION_DAYS = 7;

export const sortByStartDate = (event1: CalendarEventByCourseQueryResult[0], event2: CalendarEventByCourseQueryResult[0]) => {
    return compareAsc(event1.startDate!, event2.startDate!);
};

export const isEventRegisterable = (event: CalendarEventByCourseQueryResult[0]) => {
    return event.active && isBefore(new Date(), endOfDay(getEventRegisterableUntilDate(event)))
}

export const getEventRegisterableUntilDate = (event: CalendarEventByCourseQueryResult[0]) => {
    return subDays(event.startDate!, EVENT_REGISTRATION_DAYS)
};

interface Course {
    _type?: 'shortCourse' | 'courseModule' | 'masterClass';
    name?: string | null;
    registrationLink?: string | null;
}

export const getRegisterInterestLink = (settings: SettingsQueryResult, course: Course) => {
    if (course?._type === 'shortCourse' && settings?.registerInterestShortCourse) {
        return settings.registerInterestShortCourse + course.name;
    } else if (course?._type === 'courseModule' && settings?.registerInterestCourseModule) {
        return settings.registerInterestCourseModule + course.name;
    } else if (course?._type === 'masterClass' && settings?.registerInterestMasterClass) {
        return settings.registerInterestMasterClass + course.name;
    }
    return undefined;
}

export const getRegisterToEventLink = (event: CalendarEventByCourseQueryResult[0], course: Course) => {
    if (course.registrationLink) {
        let eventDate = format(event.startDate!, EVENT_URL_DATE_FORMAT);
        if (event.endDate) {
            eventDate += '-' + format(event.endDate!, EVENT_URL_DATE_FORMAT);
        }
        return course.registrationLink + eventDate;
    }
    return undefined;
}