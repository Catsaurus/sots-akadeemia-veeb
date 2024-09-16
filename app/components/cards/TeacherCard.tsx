import { Teacher } from "@/sanity/types";
import Card from "./Card";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "next-sanity";
import Button from "../Button";
import { useState } from "react";
import Modal from "../Modal";

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
                {!!teacher.image && <img className="rounded-bl-md lg:rounded-bl-lg rounded-tr-md lg:rounded-tr-lg" src={urlFor(teacher.image).width(200).url()} />}
                <div>
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
                    {!!teacher.image && <img className="rounded-bl-md lg:rounded-bl-lg rounded-tr-md lg:rounded-tr-lg hidden md:block min-w-52" src={urlFor(teacher.image).width(200).url()} />}
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