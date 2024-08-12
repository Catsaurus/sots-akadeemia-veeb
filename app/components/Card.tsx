import React from 'react'
import { PortableText } from "@portabletext/react";


const Card = ({ title, content }) => {
    return (
        <div className='bg-white p-8 rounded-tr-lg rounded-bl-lg mb-10'
        >
            <h3 className='font-display text-xl font-normal'>{title}</h3>
          
            {content?.body ? <PortableText value={content.body} /> : null}

        </div>
    )
}

export default Card