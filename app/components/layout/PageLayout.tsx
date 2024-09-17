import { ReactNode } from "react";

import { CourseModuleListQueryResult,MasterClassListQueryResult, SettingsQueryResult } from "@/sanity/types";

import Container from "./Container";
import Footer from "./Footer";
import Header from "./Header";

interface PageLayoutProps {
    title?: string;
    settings: SettingsQueryResult;
    masterClasses: MasterClassListQueryResult;
    courseModules: CourseModuleListQueryResult;
    isHomepage?: boolean;
    children?: ReactNode | string;
}

export default function PageLayout({
    title, settings, masterClasses, courseModules, isHomepage, children
}: Readonly<PageLayoutProps>) {

    return (
        <main className="min-h-screen flex flex-col">
            <Header
                settings={settings}
                masterClasses={masterClasses}
                courseModules={courseModules}
                onDarkBackground={false}
                hideHeaderOnTop
            />
            <Container className={`flex-grow mb-6 md:mb-16 ${isHomepage ? '' : 'bg-white p-8 rounded-md lg:rounded-lg'} `} hasLogoOnPage={!isHomepage}>
               {title && <h1 className="font-display text-2xl md:text-4xl font-normal mt-6 lg:mt-10 mb-6 lg:mb-10">{title}</h1> }
                {children}
            </Container>


            <Footer />
        </main>
    )
}