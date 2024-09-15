import React, { ReactNode } from 'react'

const Card = ({ title, children }: {
    title: string; children?: string | ReactNode; 
}) => {
    return (
        <div 
        >
           {/** <h3 className='font-display text-xl font-normal'>{title}</h3>*/} 
          
            { children }

        </div>
    )
}

export default Card