import { ReactNode } from "react";

interface NavLinkProps {
    to: string;
    children: ReactNode | string;
    className?: string;
}

export default function NavLink({ to, children, className }: Readonly<NavLinkProps>) {
    return (
        <a href={to} className={`hover:ring-1 hover:ring-gray-400 dark:text-white rounded-sm px-2 lg:px-4 pt-3 pb-2 ${className ?? ''}`}>
            { children }
        </a>
    );
}