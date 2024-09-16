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
            <DialogBackdrop className="fixed inset-0 bg-dark opacity-45" />
            <div className="fixed inset-0 flex w-screen items-center justify-center overflow-y-auto p-4">
                <DialogPanel transition className="max-w-screen-lg space-y-4 rounded-md bg-white p-8 duration-300 ease-out data-[closed]:scale-95 data-[closed]:opacity-0">
                    <div className="flex justify-between items-center mb-4">
                        <DialogTitle className="font-bold text-xl">{ title }</DialogTitle>
                        <button type="button" onClick={onHide} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                            <span className="sr-only">Sulge aken</span>
                        </button>
                    </div>
                    { children }
                </DialogPanel>
            </div>
        </Dialog>
    );
}