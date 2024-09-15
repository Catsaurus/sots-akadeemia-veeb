import React from 'react'
import { Logo } from '../Logo';
import Link from "next/link";

function LogoOnPage() {
    return (
        <div className='hidden lg:flex items-center mb-[-160px] bg-gray-200  py-10  rounded-br-lg relative'>
            <span className='header-pseudo-element-bottom'></span>
            <span className='header-pseudo-element-top'></span>

            <Link href="/" className="dark:invert px-12">
                <Logo />
            </Link>
        </div>
    )
}

export default LogoOnPage