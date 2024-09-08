import { ReactNode } from "react"

interface ContainerProps {
    background?: string;
    className?: string;
    children?: ReactNode | string;
}

export default function Container({ background, className, children }: Readonly<ContainerProps>) {

    return (
        <div className={background ? 'rounded-bl-md' : undefined} style={background ? { backgroundColor: background } : undefined}>
            <section
                className={`container max-w-screen-xl mx-auto px-5 lg:px-10 ${className ?? ''}`}
            >
                { children }
            </section>
        </div>

    )
}