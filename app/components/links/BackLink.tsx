import { ArrowLeftIcon } from "@heroicons/react/16/solid";
import Link from "next/link";

interface BackLinkProps {
    linkToHomePage?: boolean;
}

export default function BackLink({ linkToHomePage }: Readonly<BackLinkProps>) {

    const onBackClick = () => {
        window.history.back();
    }

    let isSamePage = false;

    if (typeof window !== "undefined") {
        isSamePage = window.document.referrer.includes(location.origin);
    }

    if (linkToHomePage || !isSamePage) {
        return (
            <Link href="/" className="flex items-center gap-1 px-3 pb-1 pt-2  rounded-lg hover:bg-gray-200 hover:text-dark">
                <ArrowLeftIcon className="w-4 h-4 -mt-1" /> Avalehele
            </Link>
        );
    }

    return (
        <button onClick={onBackClick} className="flex items-center gap-1 px-3 pb-1 pt-2  rounded-lg hover:bg-gray-200 hover:text-dark">
            <ArrowLeftIcon className="w-4 h-4 -mt-1" /> Tagasi
        </button>
    );
}
