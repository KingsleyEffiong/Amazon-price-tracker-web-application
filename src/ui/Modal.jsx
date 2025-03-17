import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useProvider } from "../components/PostProvider";
import ChartProduct from "../components/ChartProduct";
import { Link } from "react-router-dom";

export default function Modal() {
    const { chartModal, dispatch, url } = useProvider()

    return (
        <Transition appear show={chartModal} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => dispatch({ type: 'CHARTMODAL', modal: false })}>
                <div className="fixed inset-0 bg-black opacity-80 flex justify-center items-center" />
                <div className="fixed inset-0 flex items-center justify-center">
                    <Dialog.Panel className="bg-transparent p-6 rounded-lg shadow-lg w-96">
                        <Dialog.Title className="text-lg font-bold">Product tracking prices</Dialog.Title>
                        <Dialog.Description className="mt-2 text-gray-600">
                            <ChartProduct />
                        </Dialog.Description>
                        <Dialog.Panel className='flex flex-row gap-5'>
                            <button
                                className="mt-4 bg-red-500 text-white px-4 py-2 rounded cursor-pointer"
                                onClick={() => dispatch({ type: 'CHARTMODAL', modal: false })}
                            >
                                Close
                            </button>
                            <button
                                className="mt-4 bg-[#16A085] text-white px-4 py-2 rounded cursor-pointer"
                                onClick={() => dispatch({ type: 'CHARTMODAL', modal: false })}
                            >
                                <a href={url} target="_blank" rel="noopener noreferrer">
                                    Show product
                                </a>

                            </button>
                        </Dialog.Panel>
                    </Dialog.Panel>
                </div>
            </Dialog>
        </Transition>
    );
}
