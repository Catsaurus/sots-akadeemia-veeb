import Image from "next/image";
import { sanityFetch } from "@/sanity/lib/fetch"
import { CalendarQuery, CourseModuleListQuery, MasterClassListQuery, SettingsQuery } from "@/sanity/lib/queries"
import MasterClassCardLarge from "./components/homepage/MasterClassCardLarge"
import { Header } from "./components/layout/Header"
import Hero from "./components/homepage/Hero"
import Footer from "./components/layout/Footer";
import { CalendarQueryResult, CourseModuleListQueryResult, MasterClassListQueryResult, SettingsQueryResult } from "@/sanity/types";
import Calendar from "./components/Calendar";
import PageLayout from "./components/layout/PageLayout";
import CourseExplonation from "./components/homepage/CourseExplonation";
import { AboutUs }  from "./components/homepage/AboutUs";


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
    >
      <Hero events={calendar}></Hero>

      <div className="mt-40 bg-gray-100 rounded-lg p-8 md:p-12 lg:p-20">
        <h2 className="font-display mb-8">Kalender</h2>
        <Calendar events={calendar} />
      </div>

      <div className="lg:mt-60">
        {/*<h2 className="font-display mb-8">..</h2>*/}
        <CourseExplonation></CourseExplonation>
      </div>


      <h2 className="font-display lg:mt-60">Meistriklassid</h2>
      <MasterClassCardLarge masterClasses={masterClasses} />



      {/* <div className="pt-40 h-60">
        <h2 className="font-display mb-8">Mida meie lõpetajad arvavad?</h2>
      </div>
*/}

      <div className="mt-40 mb-40 bg-gray-100 rounded-lg p-8 md:p-12 lg:p-20">
        <h2 className="font-display mb-8">Kes me oleme?</h2>
        <AboutUs></AboutUs>
      </div>
    </PageLayout>
  );
}
