import { groq } from "next-sanity";
import imageUrlBuilder from '@sanity/image-url'
import Image from "next/image";
import Head from 'next/head'
import { client } from '../lib/sanity.client'
import {
    PagePadding,
    Title,
    BlockComponent,
    Grid,
    NavBar,
    TableComponent,
    ContactUs
} from './index'

export const query = groq`
*[_type=='page' && slug.current match 'homepage'] {
    _id,
    pageTitle,
    keyword,
    description,
    "homeBanner": pageBuilder[@.slug.current == 'home-banner'] {
      _key,
      blockHeading,
      "contents": blockContent
    },
    "whyUs": pageBuilder[@.slug.current == 'why-us'] {
        _key,
        blockHeading,
        "contents": blockContent
    },
    "ourServices": pageBuilder[@.slug.current == 'our-services'] {
        _key,
        blockHeading,
        "contents": blockContent
    },
    "ourApproach": pageBuilder[@.slug.current == 'our-approach'] {
        _key,
        blockHeading,
        "contents": blockContent
    },
    "approachGallery": pageBuilder[@.slug.current == 'approach-img'] {
        _key,
        "imageUrl": images[] {
            _key,
            alt,
            "url":asset->url
        }
    },
    "aboutUs": pageBuilder[@.slug.current == 'about'] {
        _key,
        blockHeading,
        "contents": blockContent
    },
    "ethics": pageBuilder[@.slug.current == 'ethics'] {
        _key,
        blockHeading,
        "contents": blockContent
    },
    "funFacts": pageBuilder[@.slug.current == 'fun-facts'] {
        _key,
        heading,
        "head":[blockTable.rows[0]] {
            _key,
            cells
          },
          "body":[blockTable.rows[1]] {
            _key,
            cells
          }
    },
    "headGetin": pageBuilder[@.slug.current == 'getin-touch'] {
        _key,
        heading
      },
    "patraAddress": pageBuilder[@.slug.current == 'add-patra'] {
        _key,
        "contents": blockContent
    },
    "brusselAddress": pageBuilder[@.slug.current == 'add-brussels'] {
        _key,
        "contents": blockContent
    },
  }
`

const builder = imageUrlBuilder(client)

function urlFor(source: any) {
    return builder.image(source)
}

export function HomeFn({ data }: any) {
    return (
        <>

            {data.map((page: any) => (
                <div key={page._id}>
                    <Head>
                        <title>{page.pageTitle}</title>
                    </Head>
                    <div>
                        <NavBar />
                        <div id="to_banner" className="flex items-center justify-center h-screen bg-fixed bg-center bg-cover banner-parallax">
                            <div className="flex items-center justify-center h-full w-full bg-custom">
                                <PagePadding>
                                    {page.homeBanner.map((items: any) => (
                                        <div key={items._key}>
                                            {BlockComponent(items.contents)}
                                        </div>
                                    ))}
                                </PagePadding>
                            </div>
                        </div>
                        <div id="to_whyus" className="bg-gray text-white md:py-20 py-14">
                            <PagePadding>
                                {page.whyUs.map((items: any) => (
                                    <div key={items._key} className="md:py-16">

                                        <Title title={items.blockHeading} big />
                                        <div className="text-xl">
                                            {BlockComponent(items.contents)}
                                        </div>

                                    </div>
                                ))}
                            </PagePadding>
                        </div>
                        <div id="to_services" className="items-center justify-center bg-fixed bg-center bg-cover service-parallax">
                            <div className="items-center justify-center h-full w-full bg-custom text-white">
                                <PagePadding>
                                    <div className="md:py-16">
                                        {page.ourServices.map((items: any) => (
                                            <div key={items._key} className="py-16">
                                                <Title title={items.blockHeading} big />
                                                <div className="py-10">
                                                    {BlockComponent(items.contents)}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </PagePadding>
                            </div>
                        </div>
                        <div className="md:py-20 py-14">
                            <PagePadding>
                                {page.ourApproach.map((items: any) => (
                                    <div key={items._key} className="py-16">
                                        <Title title={items.blockHeading} big />
                                        <div className="py-10">
                                            {BlockComponent(items.contents)}
                                        </div>
                                    </div>
                                ))}
                            </PagePadding>
                        </div>

                        {page.approachGallery.map((items: any) => (
                            <div key={items._key}>
                                <Grid three>
                                    {items.imageUrl.map((img: any) => (
                                        <div key={img._key} className="w-full">
                                            <Image alt={img.alt} src={img.url} width={500} height={500} />
                                        </div>
                                    ))}
                                </Grid>
                            </div>
                        ))}
                        <div id="to_about" className="md:py-20 py-14">
                            <PagePadding>
                                {page.aboutUs.map((items: any) => (
                                    <div key={items._key} className="py-16">
                                        <Title title={items.blockHeading} big />
                                        <div className="py-10">
                                            {BlockComponent(items.contents)}
                                        </div>
                                    </div>
                                ))}
                            </PagePadding>
                        </div>
                        <div className="bg-gray-1 text-black md:py-20 py-14">
                            <PagePadding>
                                {page.ethics.map((items: any) => (
                                    <div key={items._key}>
                                        <Title title={items.blockHeading} big />
                                        <div className="py-10">
                                            {BlockComponent(items.contents)}
                                        </div>
                                    </div>
                                ))}
                            </PagePadding>
                        </div>
                        <div className="items-center justify-center bg-fixed bg-center bg-cover fun-parallax">
                            <div className="items-center justify-center h-full w-full bg-custom text-white">
                                <div className="md:py-48 py-32">
                                    <PagePadding>
                                        {page.funFacts.map((items: any) => (
                                            <div key={items._key}>
                                                <Title title={items.heading} big />
                                                <TableComponent>
                                                    <thead>
                                                        {items.head.map((tbdata: any) => (
                                                            <tr key={tbdata._key} className="tr-className">
                                                                {tbdata.cells.map((cells: any) => (
                                                                    <th key={cells._key} className="font-poppinsBold text-4xl md:w-1/4 md:py-10">{cells}</th>
                                                                ))}
                                                            </tr>
                                                        ))}
                                                    </thead>
                                                    <tbody>
                                                        {items.body.map((tbdata: any) => (
                                                            <tr key={tbdata._key} className="tr-className">
                                                                {tbdata.cells.map((cells: any) => (
                                                                    <td key={cells._key} className="text-xl md:px-2 align-top">{cells}</td>
                                                                ))}
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </TableComponent>
                                            </div>
                                        ))}
                                    </PagePadding>
                                </div>
                            </div>
                        </div>
                        <div id="to_contact">
                            <div className="py-32">
                                <PagePadding>
                                    <div>
                                        {page.headGetin.map((items: any) => (
                                            <div key={items._key}>
                                                <Title title={items.heading} big />
                                            </div>
                                        ))}
                                    </div>
                                    {/* </PagePadding> */}
                                    <Grid two>
                                        <div className="md:relative md:w-full">
                                            <div className="md:absolute md:inset-y-0 md:right-0 md:w-3/5">
                                                <ContactUs />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="mb-6">

                                                <Image alt="ScEv Logo" src="/images/contact-logo.png" width={287} height={200} className="mx-auto md:mx-0 my-10 md:my-0" />

                                            </div>
                                            <div className="font-bold">
                                                <Grid two>
                                                    {page.patraAddress.map((items: any) => (
                                                        <div key={items._key}>
                                                            {BlockComponent(items.contents)}
                                                        </div>
                                                    ))}
                                                    {page.brusselAddress.map((items: any) => (
                                                        <div key={items._key}>
                                                            {BlockComponent(items.contents)}
                                                        </div>
                                                    ))}
                                                </Grid>
                                            </div>
                                        </div>
                                    </Grid>
                                </PagePadding>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

        </>
    )
}