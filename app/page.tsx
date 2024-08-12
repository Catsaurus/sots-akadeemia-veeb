import Image from "next/image";
import { sanityFetch } from "@/sanity/lib/fetch"
import { meistriklassidQuery } from "@/sanity/lib/queries"
import { SanityDocument } from "next-sanity";
import MeistriklassCardLarge from "./components/MeisterklassCardLarge"
import { Header } from "./components/Header"
import Hero from "./components/Hero"
import Footer from "./components/Footer";


export default async function Home() {

  const meistriklassid = await sanityFetch<SanityDocument[]>({ query: meistriklassidQuery });


  return (
    <main>
      <div className="min-h-screen max-w-screen-xl mx-auto">
        <Header />
        <Hero></Hero>

        <div className="pt-40 h-[800px]">
          <h2 className="font-display mb-8">Kalender</h2>
        </div>

        <h2 className="font-display mb-8">Meistriklassid</h2>
        <MeistriklassCardLarge meistriklassid={meistriklassid} />


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
