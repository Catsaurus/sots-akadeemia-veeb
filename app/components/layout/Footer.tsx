import Link from 'next/link'
import React from 'react'
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/20/solid";

import { Logo } from '../Logo'


const Footer = () => {
  return (
    <div className="bg-[url('/static/bg-image.webp')] pt-10 lg:pt-20 mt-auto">

      <div className='bg-dark px-10 lg:px-20 max-w-screen-xl mx-auto rounded-t-md lg:rounded-t-lg'>

        <div className='flex flex-col md:flex-row justify-between gap-10 pt-10 md:pt-20 pb-10'>
          <div className='flex flex-1 flex-col  justify-start'>
            <Link href="/" className="invert grow" aria-label="Avalehele">
              <Logo />
            </Link>
           <p className='text-white text-sm pt-8 mr-32 font-normal opacity-70'>Sotsiaaltöö Akadeemia on registreeritud Eesti Hariduse Infosüsteemis täiendkoolitusasutusena reg.nr 17006432.</p>
          </div>
          <div className='flex flex-1 flex-col items-start'>
            <h4 className='text-yellow uppercase text-sm font-display pb-2'>Kontakt</h4>
           
           {/** <Link className='text-yellow hover:underline p-1' href={"/"}>Avakuva</Link>
            <Link className='text-yellow hover:underline p-1' href={"/kontakt"}>Kontakt</Link>
            */} 
            <p className='text-sm text-white opacity-80'>aila@sotsiaalakadeemia.ee</p>
            <p className='text-sm text-white opacity-80'>+372 50 90 680</p>

            <h4 className='text-yellow uppercase text-sm font-display pb-2 mt-10'>Koolitame</h4>
            <Link className='text-sm text-white flex items-center opacity-80 hover:underline hover:opacity-100' href={'https://maps.app.goo.gl/KA4TxP3FNR2Cibz16'} target='_blank'>Suur Kaar 53, Tartu
            <ArrowTopRightOnSquareIcon className="-mt-1 h-4 w-4 ml-2" /></Link>

          </div>

          <div className='flex flex-1 flex-col'>

          <h4 className='text-yellow uppercase text-sm font-display pb-2'>Meist</h4>
          
          <Link className="text-white text-sm opacity-80 hover:underline hover:opacity-100" href={"/kontakt#meist"}>Loe meist lähemalt</Link>


            <Link className="text-orange flex items-center hover:underline mt-12 lg:mt-16" href="https://www.facebook.com/people/Sotsiaalt%C3%B6%C3%B6-Akadeemia/61565116932721/" target='_blank'>
            <span className="bg-[url('/static/icon-facebook.svg')] bg-orange flex h-[24px] w-[24px] rounded-lg mr-2 mb-1" ></span>Facebook</Link>
         
          </div>

        </div>

        <div className='border-t border-gray-800 flex justify-center p-4'>
          <p className='text-gray-400 text-xs'>© 2024 Sotsiaaltöö akadeemia OÜ</p>
        </div>

      </div>



    </div>
  )
}

export default Footer