import Image from "next/image";
import imageUrlBuilder from '@sanity/image-url'
import { PortableText } from '@portabletext/react'
import { client } from '../../lib/sanity.client'
import clsx from "clsx";

const builder = imageUrlBuilder(client)

function urlFor(source: any) {
    return builder.image(source)
}

export const PortableComponent = {
    marks: {
        strong: ({ children }: any) => <span className='font-bold py-2'>{children}</span>,
        em: ({ children }: any) => <em className='italic py-2'>{children}</em>,
        link: ({ value, children }: any) => {
            const target = (value?.href || '').startsWith('http') ? '_blank' : undefined
            return (
                <a href={value?.href} target={target}>
                    {children}
                </a>
            )
        },
        color: ({ value, children }: any) => {
            return (
                <div style={{["color" as any]: value?.hex}}>{children}</div>
            )
        },
    },
    types: {
        image: ({ value }: any) => <div className="md:mt-6 relative w-full md:h-56 h-32"><Image alt="images" src={urlFor(value).url()} fill
            style={{ objectFit: "scale-down" }} /></div>,
        callToAction: ({ value, isInline }: any) =>
            isInline ? (
                <a href={value.url}>{value.text}</a>
            ) : (
                <div className="callToAction">{value.text}</div>
            ),
        
    },
    block: {
        h1: ({ children }: any) => <h1 className="md:text-8xl text-3xl py-2">{children}</h1>,
        h2: ({ children }: any) => <h2 className="md:text-6xl text-2xl py-2">{children}</h2>,
        h3: ({ children }: any) => <h3 className="md:text-4xl text-xl py-2">{children}</h3>,
        h4: ({ children }: any) => <h4 className="md:text-3xl text-lg py-2">{children}</h4>,
    },
    list: {
        bullet: ({ children }: any) => <ul className="py-2">{children}</ul>,
        number: ({ children }: any) => <ol className="py-2 md:flex">{children}</ol>,
    },
}

export const BlockComponent = (value: any) => {
    return (
        <PortableText
            value={value}
            components={PortableComponent}
        />
    )
}