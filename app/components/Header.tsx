"use client"
import React, { useState } from 'react'
import { Logo } from './Logo';
import Link from "next/link";


export const Header = () => {

    const [open, setOpen] = useState(false)


    return (
        <nav className="flex filter px-4 py-4 h-20 items-center">
            <MobileNav open={open} setOpen={setOpen} />
            <div className="flex items-center">
                <Link href="/">
                    <Logo />
                </Link>
            </div>
            <div className="flex w-full items-center justify-between">
                <div className="z-50 flex relative w-8 h-8 flex-col justify-between items-center md:hidden" onClick={() => {
                    setOpen(!open)
                }}>
                    <span className='font-display text-md'>Menüü</span>
                </div>

                <div className="hidden md:flex">
                    <NavLink to="/#">
                        Meistriklassid
                    </NavLink>
                    <NavLink to="/#">
                        Lühiklassid
                    </NavLink>
                    <NavLink to="/#">
                        Kõik ained
                    </NavLink>
                    <NavLink to="/#">
                        Õppetöö korraldus
                    </NavLink>
                </div>

                <div className="hidden md:flex">
                    <NavLink to="/#">
                        Kontakt
                    </NavLink>
                </div>
            </div>
        </nav>
    )
}


function MobileNav({ open, setOpen }: any) {
    return (
        <div className={`absolute top-0 left-0 h-screen w-full bg-white transform ${open ? "-translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out filter`}>
            <div className="flex items-center justify-center filter h-20">
                <Link className="text-2xl font-semibold" href="/">
                    <Logo />
                </Link>
            </div>
            <div className="flex flex-col ml-4">
                <a className="text-xl my-4" href="/#" onClick={() => setTimeout(() => { setOpen(!open) }, 100)}>
                    Meistriklass 1
                </a>
                <a className="text-xl my-4" href="/#" onClick={() => setTimeout(() => { setOpen(!open) }, 100)}>
                    Meistriklass 1
                </a>
                <a className="text-xl my-4" href="/#" onClick={() => setTimeout(() => { setOpen(!open) }, 100)}>
                    Meistriklass 1
                </a>
            </div>
        </div>
    )
}

function NavLink({ to, children }: any) {
    return <a href={to} className={`mx-4`}>
        {children}
    </a>
}