import { ArrowLeftIcon } from "@heroicons/react/16/solid";
import Link from "next/link";

interface BackLinkProps {
    linkToHomePage?: boolean;
}

export default function BackLink({ linkToHomePage }: Readonly<BackLinkProps>) {

    const onBackClick = () => {
        window.history.back();
    }

    if (linkToHomePage || !document.referrer.includes(location.origin)) {
        return (
            <Link href="/" className="flex items-center gap-1 hover:underline">
                <ArrowLeftIcon className="w-4 h-4 -mt-1" /> Avalehele
            </Link>
        );
    }

    return (
        <button onClick={onBackClick} className="flex items-center gap-1 hover:underline">
            <ArrowLeftIcon className="w-4 h-4 -mt-1" /> Tagasi
        </button>
    );
}
