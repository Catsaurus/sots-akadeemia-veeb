import Image from "next/image";
import { sanityFetch } from "@/sanity/lib/fetch"
import { CalendarQuery, CourseModuleListQuery, MasterClassListQuery, SettingsQuery } from "@/sanity/lib/queries"
import MasterClassCardLarge from "./components/MasterClassCardLarge"
import { Header } from "./components/layout/Header"
import Hero from "./components/Hero"
import Footer from "./components/layout/Footer";
import { CalendarQueryResult, CourseModuleListQueryResult, MasterClassListQueryResult, SettingsQueryResult } from "@/sanity/types";
import Calendar from "./components/Calendar";


export default async function Home() {

  const [settings, masterClasses, courseModules, calendar] = await Promise.all([
    sanityFetch<SettingsQueryResult>({ query: SettingsQuery }),
    sanityFetch<MasterClassListQueryResult>({ query: MasterClassListQuery }),
    sanityFetch<CourseModuleListQueryResult>({ query: CourseModuleListQuery }),
    sanityFetch<CalendarQueryResult>({ query: CalendarQuery })
  ])

  return (
    <main>
      <div className="min-h-screen max-w-screen-xl mx-auto">
        <Header settings={settings} masterClasses={masterClasses} courseModules={courseModules} />
        <Hero></Hero>

        <div className="pt-40 h-[800px]">
          <h2 className="font-display mb-8">Kalender</h2>
          <Calendar events={calendar} />
        </div>

        <h2 className="font-display mb-8">Meistriklassid</h2>
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


      </div>
      <Footer />
    </main>
  );
}
