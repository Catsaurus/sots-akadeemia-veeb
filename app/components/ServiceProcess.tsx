import React from 'react'

interface ServiceProcessProps {
    step: string;
    number: string

}

function ServiceProcess({ step, number }: Readonly<ServiceProcessProps>) {
    return (
        <div className='p-6 flex flex-col bg-gray-100 text-dark rounded-tr-md rounded-bl-md text-sm  gap-2 items-start shadow-sm min-w-[200px]'>
            <span className='font-display font-lg p-2 bg-gray-300 rounded-lg w-[32px] h-[24px] flex justify-center items-center'>{number}</span>
            <p>{step}</p>
        </div>

    )
}

export default ServiceProcess