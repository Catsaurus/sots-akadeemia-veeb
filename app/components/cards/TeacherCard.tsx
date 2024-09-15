import { Teacher } from "@/sanity/types";
import Card from "./Card";
import { urlFor } from "@/sanity/lib/image";

interface TeacherCardProps {
    teacher: Teacher;
}

export default function TeacherCard({ teacher }: Readonly<TeacherCardProps>) {

    return (
        <Card title={teacher.name!}>
            <div className="flex gap-3">
                {!!teacher.image && <img className="rounded-bl-lg rounded-tr-lg" src={urlFor(teacher.image).width(200).url()} />}
                <div>
                    <h3 className="font-display">{ teacher.name }</h3>
                    <p>{ teacher.description }</p>
                </div>
            </div>

        </Card>
    )
}