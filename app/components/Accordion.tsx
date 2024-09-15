import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { ReactNode } from 'react';
import { ArrowDownIcon } from '@heroicons/react/20/solid';

interface AccordionProps {
    title: string;
    children?: ReactNode;
    className?: string;
}

export default function Accordion({ title, children, className }: Readonly<AccordionProps>) {
    return (
        <Disclosure>
            <DisclosureButton className={`px-2 lg:px-4 pt-3 pb-2 flex items-center gap-2 text-start rounded-sm hover:ring-1 hover:ring-gray-400 ${className ?? ''}`}>
                {({ open }) => (
                    <>
                    { title }
                    <ArrowDownIcon aria-hidden="true" className={`-mt-1 h-4 w-4 transition ${open ? 'rotate-180' : ''}`} />
                    </>
                )}
            </DisclosureButton>
            <DisclosurePanel
                transition
                className="origin-top transition duration-200 ease-out"
            >
                { children }
            </DisclosurePanel>
        </Disclosure>
      )
}