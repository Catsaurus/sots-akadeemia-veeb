"use client"

import { useWindowScroll } from "@uidotdev/usehooks";
import Link from "next/link";
import React, { useState } from 'react'

import useScrollDirection from "@/app/hooks/useScrollDirection";
import { CourseModuleListQueryResult, MasterClassListQueryResult, SettingsQueryResult } from '@/sanity/types';

import Accordion from '../Accordion';
import Dropdown from '../Dropdown';
import NavLink from '../links/NavLink';
import { Logo } from '../Logo';

interface HeaderProps {
    onDarkBackground?: boolean;
    contentOverlap?: boolean;
    hideHeaderOnTop?: boolean;
    settings: SettingsQueryResult;
    masterClasses: MasterClassListQueryResult;
    courseModules: CourseModuleListQueryResult;
}

export default function Header({ onDarkBackground, contentOverlap, hideHeaderOnTop, settings, masterClasses, courseModules }: Readonly<HeaderProps>) {

    const [open, setOpen] = useState(false);
    const [{ y }] = useWindowScroll();
    const scrollDirection = useScrollDirection();

    const isHeaderSticky = (y ?? 0) > 80;

    return (
        <>
            <nav className={`flex h-20 items-center z-10 transition sticky top-0 ${scrollDirection === 'down' ? 'translate-y-[-80px]' : 'translate-x-0'} ${contentOverlap ? '-mb-[80px]' : ''} ${onDarkBackground && !isHeaderSticky ? 'dark' : ''} ${isHeaderSticky ? 'gray-200 backdrop-blur' : 'relative'}`}>
                <div className={`absolute top-0 left-0 right-0 bottom-0 bg-gray-200 ${isHeaderSticky ? 'dark:opacity-50' : 'opacity-0'} backdrop-blur transition duration-500 ease-in-out z-[-1]`}></div>
                <div className='container max-w-screen-xl mx-auto flex items-center'>

                    <div className="flex items-center">
                        <div className={`hidden lg:flex items-center ${!isHeaderSticky && hideHeaderOnTop ? 'invisible' : ''}`}>
                            <Link href="/" className="dark:invert px-8 xl:px-12" aria-label="Avalehele">
                                <Logo />
                            </Link>
                        </div>

                        <Link href="/" className="dark:invert px-5 lg:hidden" aria-label="Avalehele">
                            <Logo />
                        </Link>

                    </div>
                    <div className="flex w-full items-center justify-end lg:justify-between">
                        <button className="z-50 flex relative w-18 h-8 flex-col justify-between items-center lg:hidden px-5" onClick={() => {
                            setOpen(!open)
                        }}>
                            {!open && <span className="font-display text-md dark:text-white">Menüü</span>}
                        </button>

                        <div className="hidden lg:flex w-full justify-center items-center  lg:gap-x-4">
                            {
                                settings?.menu?.map(item => {
                                    if (item.type === 'reference') {
                                        return (
                                            <NavLink key={item._key} to={`/${item.slug}`}>
                                                {item.name}
                                            </NavLink>
                                        )
                                    } else {
                                        const options = item.dropdownType === 'MASTERCLASS' ? masterClasses : courseModules;
                                        return (
                                            <Dropdown key={item._key} name={item.name ?? ''} options={
                                                options.filter(o => !o.documentNotReady && !(o as any).notSeparatelyTakeable).map(o => ({
                                                    name: o.name!,
                                                    slug: o.slug?.current ?? ''
                                                })) ?? []
                                            } />
                                        )
                                    }
                                })
                            }
                        </div>

                        <div className="hidden lg:flex lg:w-[200px] xl:w-[300px] justify-end pr-5 lg:pr-10">
                            <NavLink to="/kontakt">
                                Kontakt
                            </NavLink>
                        </div>
                    </div>
                </div>
            </nav>

            <MobileNav
                settings={settings}
                courseModules={courseModules}
                masterClasses={masterClasses}
                open={open}
                setOpen={setOpen}
            />
        </>
    )
}

interface MobileNavProps {
    settings: SettingsQueryResult;
    masterClasses: MasterClassListQueryResult;
    courseModules: CourseModuleListQueryResult;
    open: boolean;
    setOpen: (val: boolean) => void;
}

function MobileNav({ settings, masterClasses, courseModules, open, setOpen }: Readonly<MobileNavProps>) {
    return (
        <div className={`fixed lg:hidden top-0 left-0 h-screen w-full z-[1000] bg-white transform ${open ? "-translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out filter`}>
            <div className="flex items-center justify-between pl-4 filter h-20">
                <Link className="text-2xl font-semibold" href="/" aria-label="Avalehele">
                    <Logo />
                </Link>
                <button className="z-50 flex absolute right-5 w-18 h-8 flex-col justify-between items-center lg:hidden" onClick={() => {
                    setOpen(!open)
                }}>
                    <span className="font-display text-md">Sulge</span>
                </button>
            </div>
            <div className="flex flex-col gap-2 px-4 pt-10">
                {
                    settings?.menu?.map(item => {
                        if (item.type === 'reference') {
                            return (
                                <NavLink key={item._key} to={`/${item.slug}`} className="text-lg">
                                    {item.name}
                                </NavLink>
                            )
                        } else {
                            const options = item.dropdownType === 'MASTERCLASS' ? masterClasses : courseModules;
                            return (
                                <Accordion key={item._key} title={item.name ?? ''} className="text-lg">
                                    <div className="flex flex-col ms-2 mb-4">
                                        {options.filter(o => !o.documentNotReady && !(o as any).notSeparatelyTakeable).map(o => (
                                            <NavLink key={o.name} to={`/${o.slug?.current}`} className="text-lg">
                                                {o.name}
                                            </NavLink>
                                        ))}
                                    </div>
                                </Accordion>
                            )
                        }
                    })
                }
                <NavLink to="/kontakt" className="text-lg">
                    Kontakt
                </NavLink>
            </div>
        </div>
    )
}
