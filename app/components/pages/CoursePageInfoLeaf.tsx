import React from 'react'

interface CoursePageInfoLeafProps {
  bgColorClass: string;
  title: string;
  info: string | number;
}


const CoursePageInfoLeaf = ({ bgColorClass, title, info }: Readonly<CoursePageInfoLeafProps>) => {
  return (
    <div
      className={`flex flex-col rounded-tr-md lg:rounded-tr-lg rounded-bl-md lg:rounded-bl-lg text-center justify-center w-full py-5 ${bgColorClass ?? ''}`}>
      <span className='text-xs'>{title}</span>
      <div className='flex justify-center items-center flex-col'>
        <span className='text-md md:text-lg font-display'>{info}</span>
        {title === 'Maht' && <span className='text-xs ml-1'>akadeemilist tundi</span>}
      </div>
    </div>

  )
}

export default CoursePageInfoLeaf