import { isFuture, isToday } from "date-fns";
import { Metadata } from "next";

import { sanityFetch } from "@/sanity/lib/fetch"
import { CalendarQuery, CourseModuleListQuery, MasterClassListQuery, SettingsQuery } from "@/sanity/lib/queries"
import { PageSeo } from "@/sanity/seo-types";
import { CalendarQueryResult, CourseModuleListQueryResult, MasterClassListQueryResult, SettingsQueryResult } from "@/sanity/types";

import Calendar from "./components/Calendar";
import { AboutUs }  from "./components/homepage/AboutUs";
import CourseExplonation from "./components/homepage/CourseExplonation";
import Hero from "./components/homepage/Hero"
import MasterClassCardLarge from "./components/homepage/MasterClassCardLarge"
import PageLayout from "./components/layout/PageLayout";
import { sortByStartDate } from "./helpers/event.helper";
import { getSeoMetadata } from "./helpers/metadata.helper";

export async function generateMetadata(): Promise<Metadata> {

  const settings = await sanityFetch<SettingsQueryResult>({ query: SettingsQuery });

  const seo = settings!.seo;

  return getSeoMetadata('', seo as unknown as PageSeo);
}

export default async function Home() {

  const [settings, masterClasses, courseModules, calendar] = await Promise.all([
    sanityFetch<SettingsQueryResult>({ query: SettingsQuery }),
    sanityFetch<MasterClassListQueryResult>({ query: MasterClassListQuery }),
    sanityFetch<CourseModuleListQueryResult>({ query: CourseModuleListQuery }),
    sanityFetch<CalendarQueryResult>({ query: CalendarQuery })
  ]);

  calendar.sort(sortByStartDate);

  const futureEvents = calendar.filter(evt => !!evt.startDate).filter(evt => isToday(evt.startDate!) || isFuture(evt.startDate!));

  return (
    <PageLayout
      settings={settings}
      masterClasses={masterClasses}
      courseModules={courseModules}
      isHomepage={true}
    >
      <Hero events={futureEvents}></Hero>

      <div className="mt-40 bg-gray-100 rounded-md lg:rounded-lg p-8 md:p-12 lg:p-20">
        <h2 className="font-display mb-10 text-2xl font-normal">Kalender</h2>
        <Calendar events={futureEvents} />
      </div>

      <div className="mt-20 lg:mt-60">
        {/*<h2 className="font-display mb-8">..</h2>*/}
        <CourseExplonation></CourseExplonation>
      </div>


      <h2 className="font-display mb-6 md:mb-10 text-2xl font-normal mt-20 lg:mt-60">Meistriklassid</h2>
      <MasterClassCardLarge masterClasses={masterClasses} />



      {/* <div className="pt-40 h-60">
        <h2 className="font-display mb-10 text-2xl font-normal mb-8">Mida meie lõpetajad arvavad?</h2>
      </div>
*/}

      <div className="mt-40 mb-40 bg-gray-100 rounded-md lg:rounded-lg p-8 md:p-12 lg:p-20">
        <h2 className="font-display mb-10 text-2xl font-normal">Kes me oleme?</h2>
        <AboutUs></AboutUs>
      </div>
    </PageLayout>
  );
}
