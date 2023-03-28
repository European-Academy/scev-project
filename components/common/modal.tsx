import { Dialog, Transition, Disclosure } from '@headlessui/react'
import { Fragment } from 'react'

export const Modal: React.FC<{
    open?: any
    setOpen?: any
    heading?: string
    // subtitle?: string
    btn?: string
    onClick?: any
}> = ({ open, setOpen, heading, btn, onClick }) => {
    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog
                as="div"
                className="fixed z-10 inset-0 overflow-y-auto"
                onClose={onClick}
            >
                <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>
                    {/* <span
                        className="hidden sm:inline-block sm:align-middle sm:h-screen"
                        aria-hidden="true"
                    >
                        &#8203;
                    </span> */}
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-20 sm:align-middle sm:max-w-sm sm:w-full sm:p-10">
                            <div className="text-center space-y-5">
                                <div>
                                    <div className="text-xl font-poppinsSemi">
                                        {heading}
                                    </div>
                                    {/* <div className="font-poppinsSemi text-lg">
                                        {subtitle}
                                    </div> */}
                                    <div className="pt-10 space-y-4">
                                        <button type='button' className='font-poppinsSemi bg-blue text-white rounded-full w-full py-2 hover:bg-white hover:text-blue hover:border-2 hover:border-blue' onClick={onClick}>
                                            {btn}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}