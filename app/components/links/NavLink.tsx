import { ReactNode } from "react";

interface NavLinkProps {
    to: string;
    children: ReactNode | string;
    className?: string;
}

export default function NavLink({ to, children, className }: Readonly<NavLinkProps>) {
    return (
        <a href={to} className={`mx-4 hover:underline dark:text-white ${className ?? ''}`}>
            { children }
        </a>
    );
}