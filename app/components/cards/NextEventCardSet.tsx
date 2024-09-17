import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";

import { DATE_FORMAT, DATE_FORMAT_LONG, format } from "@/app/helpers/date.helper";
import { getEventRegisterableUntilDate, handleRegisterInterest, handleRegisterToEvent } from "@/app/helpers/event.helper";
import { CalendarEventByCourseQueryResult, SettingsQueryResult, SingleClassModuleCourseQueryResult } from "@/sanity/types";

import Button from "../Button";
import CoursePageInfoLeaf from "../pages/CoursePageInfoLeaf";

interface NextEventCardSetProps {
    event: CalendarEventByCourseQueryResult[0];
    course: SingleClassModuleCourseQueryResult;
    settings: SettingsQueryResult;
    headingContainerBackground?: string;
}

export default function NextEventCardSet({ event, course, settings, headingContainerBackground }: Readonly<NextEventCardSetProps>) {

    if (!course) {
        return null;
    }

    const eventRegisterUntilDate = event ? getEventRegisterableUntilDate(event) : undefined;
    const minMaxParticipants = (course.minParticipants ?? '') +
        (!!course.minParticipants && !!course.maxParticipants ? ' - ' : '') +
        (course.maxParticipants ?? '');

    const availableForInterest = course._type !== 'courseModule' || !course.notSeparatelyTakeable;

    return (
        <div className='flex flex-col gap-2 lg:gap-4 min-w-[45%]'>
            <div className={clsx('bg-blue px-4 py-6 md:px-6 md:py-8 rounded-tr-md lg:rounded-tr-lg rounded-bl-md lg:rounded-bl-lg text-center gap-3 flex flex-col w-full')}>
                { !!eventRegisterUntilDate && <>
                <p>Registreerimine avatud</p>
                <p className="font-display font-normal text-md md:text-xl">{ format(event.startDate!, DATE_FORMAT_LONG) }</p>
                <Button size="lg" onClick={() => handleRegisterToEvent(event, course)}>
                    Registreeri
                    <ArrowTopRightOnSquareIcon className="-mt-1 h-5 w-5" />
                </Button>
                <p>Registreerimine kuni { format(eventRegisterUntilDate, DATE_FORMAT) } (k.a)</p>
                </> }
                { !eventRegisterUntilDate && <>
                    <p className="font-display font-normal text-md lg:text-xl">Klass ei ole registreerimiseks avatud</p>
                    { availableForInterest && <>
                        <Button size="lg"  onClick={() => handleRegisterInterest(settings, course)}>
                            Registreeri huvi
                            <ArrowTopRightOnSquareIcon className="-mt-1 h-5 w-5" />
                        </Button>
                        <p className="text-sm lg:text-md">Kui on piisavalt huvilisi, planeerime klassi avamist.</p>
                    </> }
                </> }
            </div>

            <div className='grid grid-cols-4 gap-1 lg:gap-3 w-full'>
                <CoursePageInfoLeaf bgColorClass={'bg-green'} title={"Maht"} info={course.courseSize ?? ''}></CoursePageInfoLeaf>
                <CoursePageInfoLeaf bgColorClass={'bg-pink'} title={"Toimumiskoht"} info={course.city ?? ''}></CoursePageInfoLeaf>
                <CoursePageInfoLeaf bgColorClass={'bg-yellow'} title={"Osalejad"} info={minMaxParticipants}></CoursePageInfoLeaf>
                <CoursePageInfoLeaf bgColorClass={'bg-orange'} title={"Hind"} info={`${course.price ?? '-'} €`}></CoursePageInfoLeaf>
            </div>
        </div> 
    );
}

