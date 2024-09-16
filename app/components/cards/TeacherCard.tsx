import { Teacher } from "@/sanity/types";
import Card from "./Card";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "next-sanity";
import Button from "../Button";

interface TeacherCardProps {
    teacher: Teacher;
}

export default function TeacherCard({ teacher }: Readonly<TeacherCardProps>) {

    return (
        <Card title={teacher.name!}>
            <div className="flex items-start gap-6 lg:gap-10">
                {!!teacher.image && <img className="rounded-bl-md lg:rounded-bl-lg rounded-tr-md lg:rounded-tr-lg" src={urlFor(teacher.image).width(200).url()} />}
                <div>
                    <h3 className="font-display font-normal text-xl mb-2">{teacher.name}</h3>
                    <div className="mt-2 mb-2">
                        <p>email@sotsiaalakadeemia.ee</p>
                        <p>+ 372 5090680</p>
                    </div>
                    {!!teacher.description &&
                        <div className="custom-truncate">
                            <PortableText value={teacher.description} />
                        </div>}
                    <Button color="yellow">Loe rohkem</Button>
                </div>
            </div>

        </Card>
    )
}