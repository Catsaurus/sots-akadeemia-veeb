import { CalendarQueryResult, Color } from '@/sanity/types';
import Link from 'next/link'
import React from 'react'

interface HeroCardProps {
  event: {
    _id: string;
    name?: string;
    timeConfirmed?: boolean;
    startDate?: string;
    endDate?: string;
    course: {
      _type: "masterClass" | "shortCourse" | null;
      slug: string | null;
      name: string | null;
      moduleName: null | string;
      color: Color | null;
      maxParticipants: number | null;
      minParticipants: number | null | string;
    };
  };
}

const HeroCard = ({ event }: Readonly<HeroCardProps>) => {

  let colors = ['bg-red', 'bg-green', 'bg-pink', 'bg-yellow'];

  let type = '';
  switch (event.course._type) {
    case 'masterClass': type = 'Meistriklass'; break;
    case 'shortCourse': type = 'Lühiklass'; break;
  }

  return (
    <Link key={event._id} href={`/${event.course.slug}`}
      style={{ backgroundColor: event.course.color?.hex }}
      className='bg-gray-200 px-6 py-4 md:p-8 md:pb-10 md:pt-6 rounded-tr-md rounded-bl-md shadow-4xl group'>
      <h3 className='text-sm md:text-lg group-hover:underline lg:h-full font-semibold'>{event.course.name}</h3>

      <div className="flex flex-col lg:flex-row md:gap-2">
        <span className="text-xs md:text-sm">{ event.course.minParticipants }-{ event.course.maxParticipants } osalejat</span>
        <span className="text-xs md:text-sm">{ type }</span>
      </div>
    </Link>
  )
}

export default HeroCard