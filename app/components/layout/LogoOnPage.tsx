import Link from "next/link";
import React from 'react'

import { Logo } from '../Logo';

function LogoOnPage() {
    return (
        <div className='hidden lg:flex items-center mb-[-160px] bg-gray-200 py-5 rounded-br-md relative'>
            <span className='header__pseudo-element--bottom'></span>
            <span className='header__pseudo-element--top'></span>

            <Link href="/" className="dark:invert px-8 xl:px-12">
                <Logo />
            </Link>
        </div>
    )
}

export default LogoOnPage