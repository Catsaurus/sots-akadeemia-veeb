import { ReactNode } from "react"

import LogoOnPage from "./LogoOnPage";

interface ContainerProps {
    background?: string;
    className?: string;
    children?: ReactNode | string;
    hasLogoOnPage?: boolean;
}

export default function Container({ background, className, children, hasLogoOnPage }: Readonly<ContainerProps>) {

    return (
        <div className={` ${background ? 'rounded-bl-md' : ''}`} style={background ? { backgroundColor: background } : undefined}>

            <section
                className={`relative container max-w-screen-xl mx-auto px-5 lg:px-10 ${hasLogoOnPage ? 'lg:pt-28' : ''} ${className ?? ''}`}
            >
                {hasLogoOnPage && <div className='absolute left-0 top-0'>
                    <LogoOnPage></LogoOnPage>
                </div>
                }
                {children}
            </section>
        </div>

    )
}