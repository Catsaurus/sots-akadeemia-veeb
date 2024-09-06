import { ReactNode } from "react";

interface NavLinkProps {
    to: string;
    children: ReactNode | string;
}

export default function NavLink({ to, children }: Readonly<NavLinkProps>) {
    return (
        <a href={to} className="mx-4 hover:underline dark:text-white">
            { children }
        </a>
    );
}