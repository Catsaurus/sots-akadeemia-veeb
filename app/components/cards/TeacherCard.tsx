import { Teacher } from "@/sanity/types";
import Card from "./Card";
import { urlFor } from "@/sanity/lib/image";

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
                    <p>{ teacher.description }</p>
                </div>
            </div>

        </Card>
    )
}