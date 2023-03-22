import clsx from 'clsx'
// import Image from 'next/image'
import { Link } from 'react-scroll'
// import { Grid } from './grid'

export const Banner: React.FC<{
    title?: string
    subtitle?: string
    paragraph?: string
    button?: boolean
    yes_scroll?: boolean
    scroll_to?: any
}> = ({ title, subtitle, paragraph, button, yes_scroll, scroll_to }) => {
    return (
        <div className="relative bg-gray-400 overflow-hidden">
            <div className='relative'>
                <div className="text-left md:px-52 py-28">
                    {/* <Grid two> */}
                    <h1 className="text-3xl sm:text-5xl font-bold md:text-6xl my-auto pb-10">
                        {title}
                    </h1>
                    
                    {/* </Grid> */}
                    {subtitle &&
                        <div className='md:text-2xl text-xl pb-6'>
                            {subtitle}
                        </div>
                    }
                    {paragraph &&
                        <div className='md: text-lg text-base pb-6'>
                            {paragraph}
                        </div>
                    }
                    {button &&
                        <div className="text-center">
                            {clsx(
                                yes_scroll ?
                                    <Link to={scroll_to} spy={true} smooth={true}>
                                        <button
                                            type="button"
                                            className="inline-flex justify-center px-8 py-3 border border-transparent text-base rounded-lg text-white bg-violet-900 hover:bg-violet-600 md:py-4 md:text-lg md:px-10 mt-16 lg:mb-0"
                                        >
                                            Learn More
                                        </button>
                                    </Link>
                                    :
                                    <button
                                        type="button"
                                        className="inline-flex justify-center px-8 py-3 border border-transparent text-base rounded-lg text-white bg-violet-900 hover:bg-violet-600 md:py-4 md:text-lg md:px-10 mt-16 lg:mb-0"
                                    >
                                        Learn More
                                    </button>
                            )}
                        </div>
                    }

                </div>

            </div>
        </div>
    )
}