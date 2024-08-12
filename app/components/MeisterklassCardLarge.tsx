import type { SanityDocument } from "next-sanity";
import Link from "next/link";
import Image from "next/image";
import React from 'react'

const MeisterklassCardLarge = ({ meistriklassid = [] }: { meistriklassid: SanityDocument[] }) => {
    return (
        <div className="mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">

            {meistriklassid.map((meistriklass) =>
                <div className="rounded-tr-lg rounded-bl-lg h-96"
                style={{ ["background-color" as any]: meistriklass.color.value }}>

                    <div className="bg-[url('/static/bg-image.png')] p-10 h-5 w-full rounded-tr-lg"></div>
                  

                    <div className="p-6">
                        <h2 className="text-lg md:text-2xl font-display">{meistriklass.name}</h2>

                        <Link className="underline underline-offset-2"
                            key={meistriklass._id}
                            href={`/${meistriklass.slug.current}`}
                        >
                            Loe rohkem
                        </Link>
                    </div>
                </div>
            )}
        </div>

    )
}

export default MeisterklassCardLarge