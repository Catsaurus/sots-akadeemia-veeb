import Image from 'next/image'
import Link from 'next/link'
import React from 'react'


export const AboutUs = () => {
    return (
        <div className='flex flex-col md:flex-row gap-4 md:gap-10'>
            <div className='flex flex-1 flex-col items-start'>
                <p className='mb-8 text-base'>
                    Meie missiooniks on sotsiaalteaduslike teadmiste kaasaegne ja uuenduslik õpetamine praktilisi ja professionaalseid tehnikaid kasutades.
                </p>
                <p className='mb-8 text-base'>Oleme uuenduslikud, kaasaegsed, professionaalsed ning õppija vajadustest lähtuvad.
                </p>
                <Link className="bg-gray-200 hover:brightness-90 hover:saturate-150 py-2 px-4 gap-1 rounded-lg" href={"/kontakt#meist"}>Loe meist lähemalt</Link>

            </div>
            <div className='custom-image-wrap flex flex-col flex-1 gap-2 relative rounded-md'>
                <Image
                    src="/static/aboutUsImage1.webp"
                    alt="about"
                    height={500}
                    width={500}
                />
                <p className='text-sm'>Pilt on tehtud 2023. aastal Sotsiaalkindlustusameti korraldatud konverentsil 
                <a className='underline pl-2' href='https://sotsiaalkindlustusamet.ee/uudised/konverents-teekond-riikliku-perelepitusteenuseni-ja-edasi-27-oktoobril-tallinnas' target='_blank'>&quot;Teekond riikliku perelepitusteenuseni ja edasi ...&quot;</a>
                . Aila, Ülla ja Merle rääkisid konverentsil riikliku perelepitusteenuse kvaliteedist ja professionaalsusest.
                </p>
            
            </div>
        </div>
    )
}
