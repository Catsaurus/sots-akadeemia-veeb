import React from 'react'

const HeroCard = ({title}: any) => {
  return (
    <div 
     className='p-8 bg-yellow rounded-tr-md rounded-bl-md shadow shadow-neutral-900 hover:shadow-neutral-950'>
      <h3 className='text-sm md:text-xl'>{title}</h3>
    </div>
  )
}

export default HeroCard