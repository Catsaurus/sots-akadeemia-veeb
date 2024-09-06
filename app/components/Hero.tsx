import React from 'react'
import HeroCard from './HeroCard'

const Hero = () => {
    return (
        <div className="bg-[url('/static/bg-image.png')] p-10 rounded-md -mx-5 lg:-mx-10">
            <div className="flex justify-center flex-col pt-40 ">
                <div className='grid grid-cols-1 md:grid-cols-4 gap-4 pt-10'>
                    <HeroCard title="Sotsiaaltöö juhtimise meistriklass" />
                    <HeroCard title="Sotsiaaltöö juhtimise meistriklass" />

                    <HeroCard title="Sotsiaaltöö juhtimise meistriklass" />
                    <HeroCard title="Perelepituse meistriklass" />

                </div>

                <div className='bg-dark p-10 md:p-20 flex flex-col rounded-tr-lg rounded-bl-lg -mb-28 mt-10 shadow shadow-neutral-900'>
                    <h1 className='text-white text-center text-sm md:text-2xl lg:text-4xl font-light'>Kõige praktilisema suunitlusega koolituskeskus</h1>
                    <h1 className='text-white text-center text-2xl md:text-4xl lg:text-5xl font-display'>sotsiaaltöö spetsialistidele</h1>
                </div>

            </div>
        </div>
    )
}

export default Hero