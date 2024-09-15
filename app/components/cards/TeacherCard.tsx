import { Teacher } from "@/sanity/types";
import Card from "./Card";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "next-sanity";

interface TeacherCardProps {
    teacher: Teacher;
}

export default function TeacherCard({ teacher }: Readonly<TeacherCardProps>) {

    return (
        <Card title={teacher.name!}>
            <div className="flex items-start gap-2 lg:gap-4">
                {!!teacher.image && <img className="rounded-bl-md lg:rounded-bl-lg rounded-tr-md lg:rounded-tr-lg" src={urlFor(teacher.image).width(200).url()} />}
                <div>
                    <h3 className="font-display">{ teacher.name }</h3>
                    { !!teacher.description && <div><PortableText value={teacher.description} /></div> }
                </div>
            </div>

        </Card>
    )
}