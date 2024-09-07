import React from 'react'
import HeroCard from './HeroCard'
import { CalendarQueryResult } from '@/sanity/types';

interface CalendarProps {
    events: CalendarQueryResult;
}

const Hero = ({ events }: Readonly<CalendarProps>) => {
    return (
        <div className="bg-[url('/static/bg-image.png')] p-4 md:p-10 rounded-md lg:-mx-10">
            <div className="flex justify-center flex-col pt-40 md:pt-60 ">
                <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                    {events.slice(0, 4).map((event) =>
                        <HeroCard key={event._id} event={event} />
                    )}
                </div>
                <div className='bg-dark p-12 md:p-20 px-4 flex flex-col rounded-tr-lg rounded-bl-lg -mb-20 mt-10 shadow-3xl'>
                    <h1 className='text-white text-center text-lg md:text-2xl lg:text-4xl font-light'>Kõige praktilisema suunitlusega koolituskeskus</h1>
                    <h1 className='text-white text-center text-xl md:text-4xl lg:text-5xl font-display'>sotsiaaltöö spetsialistidele</h1>
                </div>

            </div>
        </div>
    )
}

export default Hero