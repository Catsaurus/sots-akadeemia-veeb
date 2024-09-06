import { ReactNode } from "react";
import { Header } from "./Header";
import { SettingsQueryResult, MasterClassListQueryResult, CourseModuleListQueryResult } from "@/sanity/types";
import BackLink from "../links/BackLink";
import Container from "./Container";

interface PageLayoutProps {
    title?: string;
    headingContainerBackground?: string;
    settings: SettingsQueryResult;
    masterClasses: MasterClassListQueryResult;
    courseModules: CourseModuleListQueryResult;
    children?: ReactNode | string; 
}

export default function PageLayout({
    title, headingContainerBackground, settings, masterClasses, courseModules, children
}: Readonly<PageLayoutProps>) {

    return (
        <main className="min-h-screen">
            <Header settings={settings} masterClasses={masterClasses} courseModules={courseModules} />
            <Container background={headingContainerBackground} className="py-10">
                <div className="mt-4 -mb-8">
                    <BackLink />
                </div>
                <h1 className="font-display">{title}</h1>
            </Container>
            <Container className="mt-10">
                { children }
            </Container>
      </main>
    )
}