import React from 'react'

import { CalendarQueryResult } from '@/sanity/types';

import LogoOnPage from "./../layout/LogoOnPage"
import HeroCard from './HeroCard'

interface CalendarProps {
    events: CalendarQueryResult;
}

const Hero = ({ events }: Readonly<CalendarProps>) => {
    return (
        <>
            <div className="bg-[url('/static/bg-image.webp')] p-4 md:p-10 rounded-md xl:-mx-10 relative">
            
                <div className='absolute left-0 top-0'>
                    <LogoOnPage></LogoOnPage>
                </div>

                <div className="flex justify-center flex-col pt-40 md:pt-60 xl:max-w-[1000px] m-auto">
                    <div className='hidden lg:grid md:grid-cols-4 gap-4'>
                        {events.slice(0, 4).map((event) =>
                            <HeroCard key={event._id} event={event} />
                        )}
                    </div>
                    <div className='lg:hidden grid grid-row-2 gap-4'>
                        {events.slice(0, 2).map((event) =>
                            <HeroCard key={event._id} event={event} />
                        )}
                    </div>
                    <div className='bg-dark p-12 md:p-16 xl:p-20 px-4 flex flex-col rounded-tr-md lg:rounded-tr-lg rounded-bl-md lg:rounded-bl-lg -mb-20 mt-4 shadow-3xl'>
                        <h1 className='text-white text-center text-xl md:text-2xl lg:text-4xl font-light'>Praktiliseima suunitlusega koolituskeskus</h1>
                        <h1 className='text-white text-center text-2xl md:text-4xl lg:text-5xl font-display'>sotsiaaltöö spetsialistidele</h1>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Hero