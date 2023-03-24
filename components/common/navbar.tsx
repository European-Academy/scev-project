import { Fragment } from "react";
import Links from 'next/link'
import Image from "next/image";
import { Disclosure, Popover, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { Link } from 'react-scroll'

export const NavBar: React.FC<{
    logoSrc?: any
    menu?: string
    url?: boolean
    yes_scroll?: boolean
    scroll_to?: any
    button?: boolean
    btn_url?: any
}> = ({ menu, url, yes_scroll, scroll_to }) => {

    const Btns = ({ data, dataLink }: any) => {
        return (
            <>
                <div>
                    <Link to={dataLink} spy={true} smooth={true}>
                        <button className="text-black hover:text-gray font-bold text-lg uppercase">{data}</button>
                    </Link>
                </div>
            </>
        )
    }

    return (
        <>
            <Popover className="bg-white sticky top-0">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="flex items-center justify-between py-5 md:space-x-10">
                        <div className="flex lg:flex-1">
                            <div className="h-18 w-auto">
                                <Links href={"https://scientificevents.eu/"}>
                                    {/* <a> */}
                                    <Image
                                        src="/images/scevLogo.png"
                                        alt="Scientific Events"
                                        width={134}
                                        height={60}
                                    />
                                    {/* </a> */}
                                </Links>
                            </div>
                        </div>
                        <div className="lg:flex lg:gap-x-12">
                            <Btns data="Home" dataLink="to_banner" />
                            <Btns data="Why Us" dataLink="to_whyus" />
                            <Btns data="Our Services" dataLink="to_services" />
                            <Btns data="About Us" dataLink="to_about" />
                            <Btns data="Contact" dataLink="to_contact" />
                        </div>
                        <div className="-mr-2 -my-2 md:hidden">
                            <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-black hover:text-gray-500">
                                <span className="sr-only">Open menu</span>
                                <MenuIcon className="h-6 w-6" aria-hidden="true" />
                            </Popover.Button>
                        </div>
                    </div>
                </div>
                {/* for mobile view */}
                <Transition
                    as={Fragment}
                    enter="duration-200 ease-out"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="duration-100 ease-in"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                    <Popover.Panel
                        focus
                        className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
                    >
                        <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
                            <div className="pt-5 pb-6 px-5">
                                <div className="flex items-center justify-end">
                                    {/* <div className="h-16 w-auto">
                                        <Link href={"https://scientificevents.eu/"}>

                                            <Image
                                                src="/images/scevLogo.png"
                                                alt="Scientific Events"
                                                width={134}
                                                height={60}
                                            />

                                        </Link>
                                    </div> */}
                                    <div className="-mr-2">
                                        <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                            <span className="sr-only">Close menu</span>
                                            <XIcon className="h-6 w-6" aria-hidden="true" />
                                        </Popover.Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Popover.Panel>
                </Transition>
            </Popover>
        </>
    )
}