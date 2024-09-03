import React, { ReactNode } from 'react'
import { PortableText } from "@portabletext/react";


const Card = ({ title, content }: {
    title: string; content: string | ReactNode; 
}) => {
    return (
        <div className='bg-white p-8 rounded-tr-lg rounded-bl-lg mb-10'
        >
            <h3 className='font-display text-xl font-normal'>{title}</h3>
          
            { content }

        </div>
    )
}

export default Card