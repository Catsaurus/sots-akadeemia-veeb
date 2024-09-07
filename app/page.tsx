import Image from "next/image";
import { sanityFetch } from "@/sanity/lib/fetch"
import { CalendarQuery, CourseModuleListQuery, MasterClassListQuery, SettingsQuery } from "@/sanity/lib/queries"
import MasterClassCardLarge from "./components/MasterClassCardLarge"
import { Header } from "./components/layout/Header"
import Hero from "./components/Hero"
import Footer from "./components/layout/Footer";
import { CalendarQueryResult, CourseModuleListQueryResult, MasterClassListQueryResult, SettingsQueryResult } from "@/sanity/types";
import Calendar from "./components/Calendar";
import PageLayout from "./components/layout/PageLayout";


export default async function Home() {

  const [settings, masterClasses, courseModules, calendar] = await Promise.all([
    sanityFetch<SettingsQueryResult>({ query: SettingsQuery }),
    sanityFetch<MasterClassListQueryResult>({ query: MasterClassListQuery }),
    sanityFetch<CourseModuleListQueryResult>({ query: CourseModuleListQuery }),
    sanityFetch<CalendarQueryResult>({ query: CalendarQuery })
  ])

  return (
    <PageLayout
      settings={settings}
      masterClasses={masterClasses}
      courseModules={courseModules}
      headerOnDarkBackground
    >
      <Hero></Hero>
      <div className="mt-40 bg-gray-100 rounded-lg p-8 md:p-20">
        <h2 className="font-display mb-8">Kalender</h2>
        <Calendar events={calendar} />
      </div>


      <h2 className="font-display mb-8 pt-40">Meistriklassid</h2>
      <MasterClassCardLarge masterClasses={masterClasses} />


      <div className="pt-40 h-60">
        <h2 className="font-display mb-8">Lühiklassid</h2>
      </div>


      <div className="pt-40 h-60">
        <h2 className="font-display mb-8">Mida meie lõpetajad arvavad?</h2>
      </div>


      <div className="pt-40 h-60">
        <h2 className="font-display mb-8">Kes me oleme?</h2>
      </div>
    </PageLayout>
  );
}
