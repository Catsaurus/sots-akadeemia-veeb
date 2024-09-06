import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
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
            <div>
            <MenuButton className="mx-4 cursor-pointer flex gap-2 items-center hover:underline" as="button">
                {({ active }) => (
                    <>
                    { name }
                    <ArrowDownIcon aria-hidden="true" className={`-mt-1 h-4 w-4 text-gray-400 transition ${active ? 'rotate-180' : ''}`} />
                    </>
                )}
            </MenuButton>
            </div>
            <MenuItems
                modal={false}
                anchor="bottom"
                transition
                className="absolute right-0 z-10 mt-8 w-56 origin-top-right rounded-sm bg-white shadow-3xl transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-15 data-[enter]:ease-out data-[leave]:ease-in"
            >
            {
                options.map(option => (
                    <MenuItem key={option.name}>
                        <a className="block p-4 text-gray-700 data-[focus]:bg-gray-light hover:bg-gray-light data-[focus]:text-gray-900 transition" href={`/${option.slug}`}>
                            { option.name }
                        </a>
                    </MenuItem>
                ))
            }
            </MenuItems>
        </Menu>
    );

}