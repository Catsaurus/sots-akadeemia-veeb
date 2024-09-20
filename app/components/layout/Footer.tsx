import Link from 'next/link'
import React from 'react'

import { Logo } from '../Logo'


const Footer = () => {
  return (
    <div className="bg-[url('/static/bg-image.webp')] pt-10 lg:pt-20 mt-auto">

      <div className='bg-dark px-10 lg:px-20 max-w-screen-xl mx-auto rounded-t-md lg:rounded-t-lg'>

        <div className='flex flex-col md:flex-row justify-between gap-10 pt-10 md:pt-20 pb-10'>
          <div className='flex flex-1 flex-col  justify-start'>
            <Link href="/" className="invert" aria-label="Avalehele">
              <Logo />
            </Link>
           {/**  <p className='text-white'>Registrikood: 12345098</p>*/}
          </div>
          <div className='flex flex-1 flex-col items-start'>
            <Link className='text-yellow hover:underline p-1' href={"/"}>Avakuva</Link>
            <Link className='text-yellow hover:underline p-1' href={"/kontakt"}>Kontakt</Link>
          </div>

          <div className='flex flex-1 flex-col'>
            <Link className="text-yellow p-2 flex items-center hover:underline" href="https://www.facebook.com/people/Sotsiaalt%C3%B6%C3%B6-Akadeemia/61565116932721/" target='_blank'>
            <span className="bg-[url('/static/icon-facebook.svg')] bg-yellow flex h-[24px] w-[24px] rounded-lg mr-2" ></span>Facebook</Link>

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