import { CalendarEventByCourseQueryResult, SingleClassModuleCourseQueryResult } from "@/sanity/types";
import CoursePageInfoLeaf from "../pages/CoursePageInfoLeaf";
import { isBefore, subDays } from "date-fns";
import { DATE_FORMAT, DATE_FORMAT_LONG, EVENT_REGISTRATION_DAYS, format } from "@/app/helpers/date.helper";

interface NextEventCardSetProps {
    event: CalendarEventByCourseQueryResult[0];
    course: SingleClassModuleCourseQueryResult;
}

export default function NextEventCardSet({ event, course }: Readonly<NextEventCardSetProps>) {

    if (!course) {
        return null;
    }

    const eventRegisterUntilDate = subDays(event.startDate!, EVENT_REGISTRATION_DAYS);

    return (
        <div className='flex flex-col gap-2 lg:gap-4 min-w-[40%]'>
            <div className='bg-blue px-6 py-8 rounded-tr-lg rounded-bl-lg text-center gap-2 flex flex-col w-full'>
                <p>Järgmine grupp alustab</p>
                <p className="font-display font-normal text-md md:text-xl">{ format(event.startDate!, DATE_FORMAT_LONG) }</p>
                { !!eventRegisterUntilDate && isBefore(new Date(), eventRegisterUntilDate) &&
                <>
                <button className='bg-white hover:brightness-95 pt-2 pb-1 px-3 w-full rounded-lg transition'>Registreeri</button>
                <p>Registreerimine kuni { format(eventRegisterUntilDate, DATE_FORMAT) } (k.a)</p>
                </> }
            </div>

            <div className='grid grid-cols-2 lg:grid-cols-4 gap-1 lg:gap-3 w-full'>
                <CoursePageInfoLeaf bgColorClass={'bg-green'} title={"Maht"} info={course.courseSize ?? ''}></CoursePageInfoLeaf>
                <CoursePageInfoLeaf bgColorClass={'bg-pink'} title={"Toimumiskoht"} info={course.city ?? ''}></CoursePageInfoLeaf>
                <CoursePageInfoLeaf bgColorClass={'bg-yellow'} title={"Osalejad"} info={`${course.minParticipants} - ${course.maxParticipants}`}></CoursePageInfoLeaf>
                <CoursePageInfoLeaf bgColorClass={'bg-orange'} title={"Hind"} info={`${course.price ?? '-'} €`}></CoursePageInfoLeaf>
            </div>
        </div> 
    );
}