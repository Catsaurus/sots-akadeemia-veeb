import React from 'react'

interface CoursePageInfoLeafProps {
    bgColorClass: string;
    title: string;
    info: string;
  }


const CoursePageInfoLeaf = ({bgColorClass, title, info}: Readonly<CoursePageInfoLeafProps>) => {
  return (
    <div 
     className={`flex flex-col rounded-tr-lg rounded-bl-lg text-center content-center w-full py-3 ${bgColorClass ?? ''}`}>
    <span className='text-xs'>{title}</span>
    <span className='text-md md:text-lg font-display'>{info}</span>
  </div>

  )
}

export default CoursePageInfoLeaf