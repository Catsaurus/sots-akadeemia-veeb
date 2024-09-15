import { ReactNode } from "react"

interface ButtonProps {
    color?: 'blue' | 'white';
    children?: ReactNode | string;
    onClick?: () => void; 
}

export default function Button({ children, onClick, color = 'blue' }: Readonly<ButtonProps>) {
    const colorClass = color === 'blue' ? 'bg-blue hover:brightness-90 hover:saturate-150' : 'bg-white hover:bg-gray-100';
    return (
        <button className={`rounded-md lg:rounded-lg bg-blue px-2 pb-1 pt-2 flex items-center gap-1 leading-none ${colorClass}`} onClick={onClick}>
            { children }
        </button>
    )
}