import { ReactNode } from "react";
import { Header } from "./Header";
import { SettingsQueryResult, MasterClassListQueryResult, CourseModuleListQueryResult } from "@/sanity/types";
import BackLink from "../links/BackLink";
import Container from "./Container";
import Footer from "./Footer";

interface PageLayoutProps {
    title?: string;
    headingContainerBackground?: string;
    headerOnDarkBackground?: boolean;
    settings: SettingsQueryResult;
    masterClasses: MasterClassListQueryResult;
    courseModules: CourseModuleListQueryResult;
    children?: ReactNode | string; 
}

export default function PageLayout({
    title, headingContainerBackground, headerOnDarkBackground, settings, masterClasses, courseModules, children
}: Readonly<PageLayoutProps>) {

    return (
        <main className="min-h-screen flex flex-col">
            <Header 
                settings={settings}
                masterClasses={masterClasses}
                courseModules={courseModules}
                onDarkBackground={headerOnDarkBackground}
            />
            { !!title && <Container background={headingContainerBackground} className="pb-10 pt-20">
                <div className="mt-4 inline-block">
                    <BackLink />
                </div>
                <h1 className="font-display">{title}</h1>
            </Container>}
            <Container className="flex-grow">
                { children }
            </Container>
            <Footer />
      </main>
    )
}