import React from 'react'
import { ReactNode } from "react"

interface ContactCardProps {
    title?: ReactNode | string;
    children?: ReactNode | string;
}

const ContactCard = ({ title, children}: Readonly<ContactCardProps>) => {
    return (
        <div className="rounded-tr-md rounded-bl-md transition border-gray-200 border flex-1">

            <div className="bg-[url('/static/bg-image.webp')] p-5 w-full rounded-tr-md relative saturate-0">
            </div>
            <div className="p-4 flex flex-col">
                <strong className="text-md md:text-lg font-display font-normal mb-3 text-gray-900">{title}</strong>
                <p className="text-sm md:text-base text-gray-800">
                    { children }
                </p>
            </div>
        </div>
    )
}

export default ContactCard