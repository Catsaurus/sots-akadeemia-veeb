import { Menu, MenuButton, MenuItem,MenuItems } from "@headlessui/react";
import { ArrowDownIcon } from '@heroicons/react/20/solid';

interface DropdownProps {
    name: string;
    options: {
        name: string;
        slug: string;
    }[];
}

export default function Dropdown({ name, options }: Readonly<DropdownProps>) {

    return (
        <Menu as="div" className="relative inline-block text-left">
            <MenuButton className="cursor-pointer flex gap-2 items-center hover:ring-1 hover:ring-dark hover:ring-opacity-25 dark:hover:ring-gray-200 rounded-sm px-2 lg:px-4 pt-3 pb-2 dark:text-white" as="button">
                {({ active }) => (
                    <>
                    { name }
                    <ArrowDownIcon aria-hidden="true" className={`-mt-1 h-4 w-4 transition ${active ? 'rotate-180' : ''}`} />
                    </>
                )}
            </MenuButton>
            <MenuItems
                modal={false}
                anchor="bottom"
                transition
                className="md:p-2 min-w-[300px] absolute right-0 z-10 mt-8 w-56 origin-top-right rounded-sm bg-gray-100 shadow-2xl transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-15 data-[enter]:ease-out data-[leave]:ease-in"
            >
            {
                options.map(option => (
                    <MenuItem key={option.name}>
                        <a className="rounded-sm block p-4 data-[focus]:bg-yellow hover:bg-yellow data-[focus]:text-gray-900 transition" href={`/${option.slug}`}>
                            { option.name }
                        </a>
                    </MenuItem>
                ))
            }
            </MenuItems>
        </Menu>
    );

}