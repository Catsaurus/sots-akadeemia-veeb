import Image from "next/image";
import { PortableText } from "next-sanity";
import { useState } from "react";

import { urlFor } from "@/sanity/lib/image";
import { Teacher } from "@/sanity/types";

import Button from "../Button";
import Modal from "../Modal";
import Card from "./Card";

interface TeacherCardProps {
    teacher: Teacher;
    showContacts?: boolean;
}

export default function TeacherCard({ teacher, showContacts }: Readonly<TeacherCardProps>) {
    const [moreInfoOpen, setMoreInfoOpen] = useState(false);

    return (
        <>
        <Card title={teacher.name!}>
            <div className="flex flex-col md:flex-row items-start gap-6 lg:gap-10">
                {!!teacher.image && <Image width={200} height={200} alt={teacher.name!} className="rounded-bl-md lg:rounded-bl-lg rounded-tr-md lg:rounded-tr-lg" src={urlFor(teacher.image).width(200).url()} />}
                <div className="flex flex-col gap-2 items-start">
                    <h3 className="font-display font-normal text-xl mb-2">{teacher.name}</h3>
                    { !!showContacts && <div className="mt-2 mb-2">
                        <p>{ teacher.email }</p>
                        <p>{ teacher.phone }</p>
                    </div>}
                    {!!teacher.description &&
                    <>
                        <div className="custom-truncate">
                            <PortableText value={teacher.description} />
                        </div>
                        <Button color="yellow" onClick={() =>setMoreInfoOpen(true)}>Loe rohkem</Button>
                    </>
                    }
                </div>
            </div>

        </Card>
        <Modal onHide={() => setMoreInfoOpen(false)} open={moreInfoOpen} title={teacher.name}>
            <div className="flex flex-col md:flex-row items-start gap-6 lg:gap-10">
                <div className="flex flex-col gap-3">
                    { !!teacher.description && <PortableText value={teacher.description} /> }
                </div>
                <div className="flex flex-col gap-4">
                    {!!teacher.image && <Image width={200} height={200} alt={teacher.name!} className="rounded-bl-md lg:rounded-bl-lg rounded-tr-md lg:rounded-tr-lg hidden md:block min-w-52" src={urlFor(teacher.image).width(200).url()} />}
                    { !!showContacts && <div className="mb-2">
                        <p>{ teacher.email }</p>
                        <p>{ teacher.phone }</p>
                    </div>}
                </div>
            </div>
        </Modal>
        </>

    )
}