import { ReactNode } from "react";
import Header from "./Header";
import { SettingsQueryResult, MasterClassListQueryResult, CourseModuleListQueryResult } from "@/sanity/types";
import Container from "./Container";
import Footer from "./Footer";

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
            <Container className={`flex-grow ${isHomepage ? '' : 'bg-white p-8 rounded-lg'} `} hasLogoOnPage={!isHomepage}>
                <h1 className="font-display font-normal">{title}</h1>
                {children}
            </Container>


            <Footer />
        </main>
    )
}