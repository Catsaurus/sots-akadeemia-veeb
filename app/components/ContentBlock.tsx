import { ReactNode } from "react";

interface ContentBlockProps {
    title?: string;
    className?: string;
    children?: ReactNode;
}

export default function ContentBlock({ title, className, children }: Readonly<ContentBlockProps>) {

    return (
        <div className={`bg-white w-full p-6 md:p-8 lg:p-10 rounded-tr-lg rounded-bl-lg mb-10 flex flex-col gap-4 ${className ?? ''}`}>
        { !!title && <h2 className="font-display font-normal text-xl  md:text-2xl">{ title }</h2>}
        { children }
      </div>
    )
}