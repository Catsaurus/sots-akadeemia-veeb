import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";

import { DATE_FORMAT, DATE_FORMAT_LONG, format } from "@/app/helpers/date.helper";
import { getEventRegisterableUntilDate, getRegisterInterestLink, getRegisterToEventLink } from "@/app/helpers/event.helper";
import { CalendarEventByCourseQueryResult, SettingsQueryResult, SingleClassModuleCourseQueryResult } from "@/sanity/types";

import Button from "../Button";
import CoursePageInfoLeaf from "../pages/CoursePageInfoLeaf";
import Link from "next/link";

interface NextEventCardSetProps {
    event: CalendarEventByCourseQueryResult[0];
    course: SingleClassModuleCourseQueryResult;
    settings: SettingsQueryResult;
    headingContainerBackground?: string;
}

export default function NextEventCardSet({
    event, course, settings, headingContainerBackground
}: Readonly<NextEventCardSetProps>) {

    if (!course) {
        return null;
    }

    const eventRegisterUntilDate = event ? getEventRegisterableUntilDate(event) : undefined;
    const minMaxParticipants = (course.minParticipants ?? '') +
        (!!course.minParticipants && !!course.maxParticipants ? ' - ' : '') +
        (course.maxParticipants ?? '');

    const availableForInterest = course._type !== 'courseModule' || !course.notSeparatelyTakeable;

    const smallLeafStyle =  headingContainerBackground ? { backgroundColor: headingContainerBackground } : undefined;

    const getSmallLeafBgClass = (colorClass: string): string => {
        return eventRegisterUntilDate ? (headingContainerBackground ? '' : colorClass) : 'bg-gray-300';
    }

    return (
        <div className='flex flex-col gap-2 lg:gap-4 min-w-[45%] lg:min-w-[40%]'>
            <div className={clsx('px-4 py-6 md:px-6 md:py-8 rounded-tr-md lg:rounded-tr-lg rounded-bl-md lg:rounded-bl-lg text-center gap-3 flex flex-col w-full',
                    {
                'bg-blue': eventRegisterUntilDate && !headingContainerBackground,
                'bg-gray-300': !eventRegisterUntilDate,
                'brightness-110': headingContainerBackground
                }
            )}
            style={headingContainerBackground ? { backgroundColor: headingContainerBackground} : undefined}
        >
                { !!eventRegisterUntilDate && <>
                <p>Järgmine grupp alustab:</p>
                <p className="font-display font-normal text-md md:text-xl">{ format(event.startDate!, DATE_FORMAT_LONG) } </p>
                <Button size="lg" as="link" href={getRegisterToEventLink(event, course)}>
                    Registreeri
                    <ArrowTopRightOnSquareIcon className="-mt-1 h-5 w-5" />
                </Button>
                <p>Registreerimine kuni { format(eventRegisterUntilDate, DATE_FORMAT) } (k.a)</p>
                </> }
                { !eventRegisterUntilDate && <>
                    <p className="font-display font-normal text-md lg:text-xl">Klass ei ole registreerimiseks avatud</p>
                    { availableForInterest && <>
                        <Button size="lg" as="link" href={getRegisterInterestLink(settings, course)}>
                            Registreeri huvi
                            <ArrowTopRightOnSquareIcon className="-mt-1 h-5 w-5" />
                        </Button>
                        <p className="text-sm lg:text-md">Kui on piisavalt huvilisi, planeerime klassi avamist.</p>
                    </> }
                </> }

               {!!eventRegisterUntilDate &&  
               <div className="pt-4 border-t border-dark border-opacity-15 text-left">
                    <p className="text-sm text-left">Kui sulle toodud kuupäevad ei sobi, siis võid märku anda oma huvist. Me kirjutame sulle, kui avame uue grupi. 
                        <Link className="text-sm text-nowrap underline hover:no-underline ml-1" href={getRegisterInterestLink(settings, course)!} target="_blank">
                        Registreeri huvi
                       </Link>
                    </p>
                </div>}
            </div>


            <div className='grid grid-cols-4 gap-1 lg:gap-3 w-full'>
                <CoursePageInfoLeaf
                    bgColorClass={getSmallLeafBgClass('bg-green')}
                    title={"Maht"}
                    info={course.courseSize ?? ''}
                    bgStyle={smallLeafStyle}
                />
                <CoursePageInfoLeaf
                    bgColorClass={getSmallLeafBgClass('bg-pink')}
                    title={"Toimumiskoht"}
                    info={course.city ?? ''}
                    bgStyle={smallLeafStyle}
                />
                <CoursePageInfoLeaf
                    bgColorClass={getSmallLeafBgClass('bg-yellow')}
                    title={"Osalejad"}
                    info={minMaxParticipants}
                    bgStyle={smallLeafStyle}
                />
                <CoursePageInfoLeaf
                    bgColorClass={getSmallLeafBgClass('bg-orange')} 
                    title={"Hind"}
                    info={`${course.price ?? '-'} €`}
                    bgStyle={smallLeafStyle}
                />
            </div>

        </div> 
    );
}

