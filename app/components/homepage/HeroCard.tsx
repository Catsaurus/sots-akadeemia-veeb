import Link from 'next/link'
import React from 'react'

const HeroCard = ({ event }: any) => {

  let colors = ['bg-red', 'bg-green', 'bg-pink', 'bg-yellow'];

  return (
    <Link key={event._id} href={`/${event.course.slug}`}
      style={{ backgroundColor: event.course.color?.hex }}
      className='bg-gray-200 px-6 py-4 md:p-8 md:pb-10 md:pt-6 rounded-tr-md rounded-bl-md shadow-4xl group'>
      <h3 className='text-sm md:text-lg group-hover:underline lg:h-full font-semibold'>{event.course.name}</h3>

      <div className="flex flex-row md:flex-col lg:flex-row md:gap-2">
        <span className="text-xs md:text-sm">10-18 osalejat</span>
        <span className="text-xs md:text-sm">lühiklass</span>
      </div>
    </Link>
  )
}

export default HeroCard