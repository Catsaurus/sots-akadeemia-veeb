import Image from "next/image";
import { useState } from "react";

import { urlFor } from "@/sanity/lib/image";
import { Teacher } from "@/sanity/types";

import Button from "../Button";
import FormattedPortableText from "../FormattedPortableText";
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
                <div className="flex flex-col items-start">
                    <h3 className="font-display font-normal text-xl">{teacher.name}</h3>
                    { !!showContacts && teacher.email && <div>
                        <p className="pt-2">{ teacher.email }</p>
                        <p>{ teacher.phone }</p>
                    </div>}
                    {!!teacher.description &&
                    <div className="pt-2">
                        <div className="custom-truncate">
                            <FormattedPortableText value={teacher.description} />
                        </div>
                        <Button className="mt-2" color="yellow" onClick={() =>setMoreInfoOpen(true)}>Loe rohkem</Button>
                    </div>
                    }
                </div>
            </div>

        </Card>
        <Modal onHide={() => setMoreInfoOpen(false)} open={moreInfoOpen} title={teacher.name}>
            <div className="flex flex-col md:flex-row items-start gap-6 lg:gap-10">
                <div className="flex flex-col gap-3">
                    { !!teacher.description && <FormattedPortableText value={teacher.description} /> }
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