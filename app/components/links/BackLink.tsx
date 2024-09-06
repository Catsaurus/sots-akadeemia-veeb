import { ArrowLeftIcon } from "@heroicons/react/16/solid";
import Link from "next/link";

export default function BackLink() {

    return (
        <Link href="/" className="flex items-center gap-1 hover:underline">
            <ArrowLeftIcon className="w-4 h-4 -mt-1" /> Tagasi
        </Link>
    )
}