import React from 'react'
import Link from 'next/link'
import Image from 'next/image'


export const AboutUs = () => {
    return (
        <div className='flex flex-col md:flex-row gap-4 md:gap-10'>
            <div className='flex flex-1 flex-col'>
                <p className='mb-8 text-base'>
                    Meie missiooniks on sotsiaalteaduslike teadmiste kaasaegne ja uuenduslik õpetamine praktilisi ja professionaalseid tehnikaid kasutades.
                </p>
                <p className='mb-8 text-base'>Oleme uuenduslikud, kaasaegsed, professionaalsed ning õppija vajadustest lähtuvad.
                </p>

            </div>
            <div className='custom-image-wrap flex flex-1 relative rounded-md'>
                <Image
                    src="/static/aboutUsImage1.jpeg"
                    alt="about"
                    height={500}
                    width={500}
                    objectFit="contain"
                />
            </div>

        </div>
    )
}
