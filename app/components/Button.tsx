import clsx from "clsx";
import { ReactNode } from "react"

interface ButtonProps {
    color?: 'blue' | 'white' | 'yellow';
    children?: ReactNode | string;
    onClick?: () => void; 
}

export default function Button({ children, onClick, color = 'blue' }: Readonly<ButtonProps>) {
     
    return (
        <button className={clsx('rounded-md lg:rounded-lg px-2 pb-1 pt-2 flex items-center gap-1 leading-none',  
            {
                'bg-blue hover:brightness-90 hover:saturate-150': color === 'blue',
                'bg-yellow hover:brightness-90 hover:saturate-150': color === 'yellow',
                'bg-white hover:bg-gray-100': color === 'white' || !color,
            }
         )} onClick={onClick}>
            { children }
        </button>
    )
}
