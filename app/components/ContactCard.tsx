import React from 'react'

const ContactCard = ({ title, content }) => {
    return (
        <div className="rounded-tr-md rounded-bl-md transition border-gray-200 border flex-1">

            <div className="bg-[url('/static/bg-image.png')] p-5 w-full rounded-tr-md relative saturate-0">
            </div>


            <div className="p-4 flex flex-col">
                <h6 className="text-md md:text-lg font-display">{title}</h6>

                <p className="text-sm md:text-base">{content}</p>
                


            </div>
        </div>
    )
}

export default ContactCard