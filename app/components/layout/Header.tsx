"use client"

import React, { useState } from 'react'
import { Logo } from '../Logo';
import Link from "next/link";
import { CourseModuleListQueryResult, MasterClassListQueryResult, SettingsQueryResult } from '@/sanity/types';
import Dropdown from '../Dropdown';
import NavLink from '../links/NavLink';
import { useWindowScroll } from "@uidotdev/usehooks";
import Accordion from '../Accordion';

interface HeaderProps {
    onDarkBackground?: boolean;
    settings: SettingsQueryResult;
    masterClasses: MasterClassListQueryResult;
    courseModules: CourseModuleListQueryResult;
}

export const Header = ({ onDarkBackground, settings, masterClasses, courseModules }: Readonly<HeaderProps>) => {

    const [open, setOpen] = useState(false);
    const [{ y }] = useWindowScroll();

    const isHeaderSticky = (y ?? 0) > 80;

    return (
        <>
        <nav className={`flex px-4 py-4 h-20 items-center sticky top-0 ${onDarkBackground ? '' : '-mb-[80px]'} ${isHeaderSticky ? 'dark backdrop-blur' : 'relative'}`}>
            { isHeaderSticky && <div className="absolute top-0 left-0 right-0 bottom-0 bg-gray-100 dark:bg-dark opacity-0 dark:opacity-70 transition-opacity z-[-1]"></div> }

            <div className="flex items-center">
                <Link href="/" className="dark:invert">
                    <Logo />
                </Link>
            </div>
            <div className="flex w-full items-center justify-end md:justify-between">
                <button className="z-50 flex relative w-18 h-8 flex-col justify-between items-center md:hidden" onClick={() => {
                    setOpen(!open)
                }}>
                    { !open && <span className="font-display text-md dark:text-white">Menüü</span>}
                </button>

                <div className="hidden md:flex">
                    {
                        settings?.menu?.map(item => {
                            if (item.type === 'reference') {
                                return (
                                    <NavLink key={item._key} to={`/${item.slug}`}>
                                        { item.name }
                                    </NavLink>
                                )
                            } else {
                                const options = item.dropdownType === 'MASTERCLASS' ? masterClasses : courseModules;
                                return (
                                    <Dropdown key={item._key} name={item.name ?? ''} options={
                                        options.map(o => ({
                                            name: o.name!,
                                            slug: o.slug?.current ?? ''
                                        })) ?? []
                                    } />
                                )
                            }
                        })
                    }
                </div>

                <div className="hidden md:flex">
                    <NavLink to="/#">
                        Kontakt
                    </NavLink>
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
        <div className={`fixed top-0 left-0 h-screen w-full z-[1000] bg-white transform ${open ? "-translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out filter`}>
            <div className="flex items-center justify-center filter h-20">
                <Link className="text-2xl font-semibold" href="/">
                    <Logo />
                </Link>
                <button className="z-50 flex absolute right-5 w-18 h-8 flex-col justify-between items-center md:hidden" onClick={() => {
                    setOpen(!open)
                }}>
                    <span className="font-display text-md">Sulge</span>
                </button>
            </div>
            <div className="flex flex-col gap-2 ml-4 mt-10">
                {
                    settings?.menu?.map(item => {
                        if (item.type === 'reference') {
                            return (
                                <NavLink key={item._key} to={`/${item.slug}`} className="text-lg">
                                    { item.name }
                                </NavLink>
                            )
                        } else {
                            const options = item.dropdownType === 'MASTERCLASS' ? masterClasses : courseModules;
                            return (
                                <Accordion key={item._key} title={item.name ?? ''} className="text-lg">
                                    <div className="flex flex-col ms-2 mb-4">
                                        { options.map(o => (
                                            <NavLink key={o.name} to={`/${o.slug?.current}`} className="text-lg">
                                                { o.name }
                                            </NavLink>
                                        )) }
                                    </div>
                                </Accordion>
                            )
                        }
                    })
                }
            </div>
        </div>
    )
}
