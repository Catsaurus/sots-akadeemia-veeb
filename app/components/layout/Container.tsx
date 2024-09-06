import { ReactNode } from "react"

interface ContainerProps {
    background?: string;
    className?: string;
    children?: ReactNode | string;
}

export default function Container({ background, className, children }: Readonly<ContainerProps>) {

    return (
        <section
            className={`container max-w-screen-xl mx-auto flex flex-col gap-10 px-5 lg:px-10 ${className ?? ''}`}
            style={background ? { backgroundColor: background } : undefined}
        >
            { children }
        </section>
    )
}