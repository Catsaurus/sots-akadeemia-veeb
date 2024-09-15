import Link from "next/link";
import React from 'react'
import { MasterClassListQueryResult } from "@/sanity/types";

const MasterClassCardLarge = ({ masterClasses = [] }: { masterClasses: MasterClassListQueryResult }) => {
    return (
        <div className="lg:mx-auto grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8">

            {masterClasses.map((masterClass) =>
                <div key={masterClass._id} className="rounded-tr-md lg:rounded-tr-lg rounded-bl-md lg:rounded-bl-lg group transition"
                    style={{ backgroundColor: masterClass.color?.hex }}>

                    <div className="bg-[url('/static/bg-image.png')] p-6 lg:p-8 w-full rounded-tr-md lg:rounded-tr-lg relative">
                        <span style={{ backgroundColor: masterClass.color?.hex }} className="opacity-40 w-full h-full absolute top-0 left-0 rounded-tr-md lg:rounded-tr-lg" ></span>
                    </div>


                    <div className="p-6 md:p-6 lg:p-8 xl:p-10 md:py-10 flex flex-col gap-3 md:gap-6">
                        <Link className="text-lg md:text-xl lg:text-2xl font-display group-hover:underline"

                            key={masterClass._id}
                            href={`/${masterClass.slug?.current}`}
                        >
                            {masterClass.name}
                        </Link>

                        <p className="text-sm md:text-base">{masterClass.shortDescription}</p>

                        <div className="flex flex-row gap-2">
                            <span className="text-xs md:text-sm pb-1 pt-2 px-2 bg-dark bg-opacity-10 rounded-sm">{ masterClass.minParticipants }-{ masterClass.maxParticipants } osalejat</span>
                            <span className="text-xs md:text-sm pb-1 pt-2 px-2 bg-dark bg-opacity-10 rounded-sm">{ masterClass.courseSize } ak h</span>
                        </div>
                        {/*<Link className="p-2 hover:underline underline-offset-2"
                            key={masterClass._id}
                            href={`/${masterClass.slug?.current}`}
                        >Loe rohkem </Link>*/}
                    </div>
                </div>
            )}
        </div>

    )
}

export default MasterClassCardLarge