import Link from 'next/link'
import React from 'react'

import { DAY_MONTH_FORMAT_LONG, format } from '@/app/helpers/date.helper';
import { Color } from '@/sanity/types';

interface HeroCardProps {
  event: {
    _id: string;
    name?: string;
    timeConfirmed?: boolean;
    startDate?: string;
    endDate?: string;
    course: {
      _type: "masterClass" | "shortCourse" | 'courseModule' | null;
      slug: string | null;
      name: string | null;
      color: Color | null;
      maxParticipants: number | null;
      minParticipants: number | null | string;
    };
  };
}

const HeroCard = ({ event }: Readonly<HeroCardProps>) => {

  let type = '';
  switch (event.course._type) {
    case 'masterClass': type = 'Meistriklass'; break;
    case 'shortCourse': type = 'Lühiklass'; break;
  }

  return (
    <Link key={event._id} href={`/${event.course.slug}`}
      style={{ backgroundColor: event.course.color?.hex }}
      className='bg-gray-100 p-5 lg:p-6 rounded-tr-md rounded-bl-md shadow-2xl group flex flex-col '>
       { !(event.course._type == "masterClass") && <p className='text-xs md:text-sm opacity-60'>Grupp alustab { format(event.startDate!, DAY_MONTH_FORMAT_LONG) }</p>}
      <h3 className='text-md md:text-lg group-hover:underline font-semibold py-1 md:py-2 h-full'>{event.course.name}</h3>

      <div className="flex flex-col lg:flex-row justify-between">
        <span className="text-xs md:text-sm opacity-60">{ event.course.minParticipants }-{ event.course.maxParticipants } osalejat</span>
        <span className="text-xs md:text-sm opacity-60">{ type }</span>
      </div>
    </Link>
  )
}

export default HeroCard