import Link from "next/link";
import React from 'react'
import { MasterClassListQueryResult } from "@/sanity/types";

const MasterClassCardLarge = ({ masterClasses = [] }: { masterClasses: MasterClassListQueryResult }) => {
    return (
        <div className="mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">

            {masterClasses.map((masterClass) =>
                <div key={masterClass._id} className="rounded-tr-lg rounded-bl-lg h-96"
                style={{ backgroundColor: masterClass.color?.hex }}>
                    <div className="bg-[url('/static/bg-image.png')] p-10 h-5 w-full rounded-tr-lg"></div>
                  

                    <div className="p-6">
                        <h2 className="text-lg md:text-2xl font-display">{masterClass.name}</h2>

                        <Link className="underline underline-offset-2"
                            key={masterClass._id}
                            href={`/${masterClass.slug?.current}`}
                        >
                            Loe rohkem
                        </Link>
                    </div>
                </div>
            )}
        </div>

    )
}

export default MasterClassCardLarge