import React from 'react'
import Link from 'next/link'

export const AboutUs = () => {
    return (
        <div className='flex flex-row'>
            <div className='flex flex-1 flex-col'>
                <p className='mb-8'>Visioon, Rakvere nimi on järgmisel viisil sündinud: Ennemuiste tulnud Kalevipoeg ükskord Venemaalt sõjast kodu poole, suur kott kulda õlal. Õhtuks jõudnud ta Rakvere linna kohta, </p>
                <p className='mb-8'>Missioon, Rakvere nimi on järgmisel viisil sündinud: Ennemuiste tulnud Kalevipoeg ükskord Venemaalt sõjast kodu poole, suur kott kulda õlal. Õhtuks jõudnud ta Rakvere linna kohta, </p>

                <Link href={"/"} className="hover:underline">Loe meist rohkem</Link>
            </div>
            <div className='flex flex-1'>
                
            </div>

        </div>
    )
}
