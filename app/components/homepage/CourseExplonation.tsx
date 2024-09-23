import Image from 'next/image'
import React from 'react'

const CourseExplonation = () => {
    return (
        <div className='flex flex-row gap-20'>
            <div className="flex-1 relative hidden lg:flex">
                <Image
                    src="/static/courseExplonation.webp"
                    alt="explonation"
                    objectFit="contain"
                    width={400}
                    height={400}
                    className="w-full h-full top-0 left-0 object-cover rounded-2xl"
                />
            </div>
            <div className='flex flex-1 flex-col justify-center'>
                <div className='mb-10'>
                    
                    <h2 className='font-display'>Meistriklass</h2>
                    <p className='text-md'>Süsteemne valitud lühiklasside sari, mis annab antud teemal süvendatud teadmised ja kogemused inimestega töös. Kõik klassid läbitakse ühe (vajadusel ka kahe) aasta jooksul. Kokku läbitakse 188 akadeemilist tundi.</p>
                </div>
                <div className='mb-10'>
                    <h2 className='font-display'>Eriklass</h2>
                    <p className='text-md'>Lühiklasside sari, kus käsitletakse vastavat teemat järjest sügavamalt. Iga järgnev klass toetub eelmisel läbitule, seetõttu soovitame alustada esimesest. Kestab 60-80 akadeemilist tundi.</p>
                </div>
                <div className='mb-10'>
                    <h2 className='font-display'>Lühiklass</h2>
                    <p className='text-md'>Konkreetsel teemal toimuv koolitus, kestvus 20 akadeemilist tundi.</p>
                </div>


            </div>


        </div>
    )
}

export default CourseExplonation