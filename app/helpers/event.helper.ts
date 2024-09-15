import { CalendarEventByCourseQueryResult } from "@/sanity/types"
import { compareAsc } from "date-fns"

export const sortByStartDate = (event1: CalendarEventByCourseQueryResult[0], event2: CalendarEventByCourseQueryResult[0]) => {
    return compareAsc(event1.startDate!, event2.startDate!);
}