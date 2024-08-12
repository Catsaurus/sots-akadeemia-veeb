import React from 'react'
import Image from "next/image";


const Footer = () => {
  return (
    <div className="bg-[url('/static/bg-image.png')] pt-20">

      <div className='bg-dark p-20 max-w-screen-xl mx-auto rounded-tr-lg rounded-tl-lg'>
        <p className='text-white'>Sotsiaaltöö akadeemia</p>
        <p className='text-white'>Registri kood: 12345098</p>
        <p className='text-white'>Panga IBAN: 12456789098765456789</p>
      </div>

    </div>
  )
}

export default Footer