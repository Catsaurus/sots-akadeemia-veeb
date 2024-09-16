import { CalendarEventByCourseQueryResult, SettingsQueryResult } from "@/sanity/types"
import { compareAsc, isBefore, startOfDay, subDays } from "date-fns"
import { DATE_FORMAT, format } from "./date.helper";

export const EVENT_REGISTRATION_DAYS = 7;

export const sortByStartDate = (event1: CalendarEventByCourseQueryResult[0], event2: CalendarEventByCourseQueryResult[0]) => {
    return compareAsc(event1.startDate!, event2.startDate!);
};

export const isEventRegisterable = (event: CalendarEventByCourseQueryResult[0]) => {
    return event.active && isBefore(new Date(), startOfDay(getEventRegisterableUntilDate(event)))
}

export const getEventRegisterableUntilDate = (event: CalendarEventByCourseQueryResult[0]) => {
    return subDays(event.startDate!, EVENT_REGISTRATION_DAYS)
};

interface Course {
    _type?: 'shortCourse' | 'courseModule' | 'masterClass';
    name?: string | null;
    registrationLink?: string | null;
}

export const handleRegisterInterest = (settings: SettingsQueryResult, course: Course) => {
    if (course?._type === 'shortCourse' && settings?.registerInterestShortCourse) {
        window.open(settings.registerInterestShortCourse + course.name, '_blank')
    } else if (course?._type === 'courseModule' && settings?.registerInterestCourseModule) {
        window.open(settings.registerInterestCourseModule + course.name, '_blank')
    } else if (course?._type === 'masterClass' && settings?.registerInterestMasterClass) {
        window.open(settings.registerInterestMasterClass + course.name, '_blank')
    }
}

export const handleRegisterToEvent = (event: CalendarEventByCourseQueryResult[0], course: Course) => {
    if (course.registrationLink) {
        window.open(course.registrationLink + format(event.startDate!, DATE_FORMAT) + '-' + format(event.endDate!, DATE_FORMAT))
    }
}