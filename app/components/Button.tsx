import clsx from "clsx";
import { ReactNode } from "react"

interface ButtonProps {
    color?: 'blue' | 'white' | 'yellow';
    size?: 'lg' | 'md'; 
    className?: string;
    children?: ReactNode | string;
    onClick?: () => void;
    href?: string;
    as?: 'link';
}

export default function Button({ children, onClick, color = 'white', size = 'md', className, as, href }: Readonly<ButtonProps>) {

    const classNames = clsx('flex justify-center items-center leading-none',
        className,
        {
            'bg-blue hover:brightness-90 hover:saturate-150': color === 'blue',
            'bg-yellow hover:brightness-90 hover:saturate-150': color === 'yellow',
            'bg-white hover:bg-gray-100': color === 'white' || !color,
            'py-2 px-4 gap-1 rounded-md': size === 'md',
            'py-3 lg:py-4 lg:px-6 text-md gap-2 rounded-lg': size === 'lg'
        }
    );

    if (as === 'link') {
        return (
            <a className={classNames} href={href} target="_blank">
                { children }
            </a>
        )
    }
     
    return (
        <button className={classNames} onClick={onClick}>
            { children }
        </button>
    )
}
