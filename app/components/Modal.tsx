import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { ReactNode } from "react";

interface ModalProps {
    open: boolean;
    onHide: () => void;
    title?: string;
    children?: ReactNode | string;
}

export default function Modal({ open, onHide, title, children }: Readonly<ModalProps>) {
    return (
        <Dialog open={open} onClose={onHide} className="relative z-50 transition duration-300 ease-out data-[closed]:opacity-0" transition>
            <div className="fixed inset-0 flex w-screen items-end justify-center">
                <DialogPanel transition className="flex flex-col max-w-screen-lg max-h-[95dvh] space-y-4 rounded-t-md bg-white p-8 lg:p-16 duration-300 ease-out shadow-3xl data-[closed]:translate-y-[100%]">
                    <div className="flex justify-between items-center mb-4">
                        <DialogTitle className="font-bold text-xl">{ title }</DialogTitle>
                        <button type="button" onClick={onHide} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                            <span className="sr-only">Sulge aken</span>
                        </button>
                    </div>
                    <div className="overflow-y-auto">
                        { children }
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    );
}