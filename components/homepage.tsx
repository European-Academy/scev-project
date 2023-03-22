import { groq } from "next-sanity";
import imageUrlBuilder from '@sanity/image-url'
import Image from "next/image";
import Head from 'next/head'
import {
    PagePadding,
    Title,
    BlockComponent,
    Grid,
    NavBar,
    TableComponent
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
        images,
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
            key,
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
                        <div className="flex items-center justify-center md:h-screen bg-fixed bg-center bg-cover banner-parallax">
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
                        <div className="bg-gray text-white py-20">
                            {page.whyUs.map((items: any) => (
                                <div key={items._key}>
                                    <PagePadding>
                                        <Title title={items.blockHeading} big />
                                        <div className="text-xl">
                                            {BlockComponent(items.contents)}
                                        </div>
                                    </PagePadding>
                                </div>
                            ))}
                        </div>
                        <div className="items-center justify-center md:h-screen bg-fixed bg-center bg-cover service-parallax">
                            <div className="items-center justify-center h-full w-full bg-custom">
                                <PagePadding>
                                    {page.ourServices.map((items: any) => (
                                        <div key={items._key} className="py-20">
                                            <Title title={items.blockHeading} big />
                                            {BlockComponent(items.contents)}
                                        </div>
                                    ))}
                                </PagePadding>
                            </div>
                        </div>
                        {page.ourApproach.map((items: any) => (
                            <div key={items._key}>
                                <Title title={items.blockHeading} big />
                                {BlockComponent(items.contents)}
                            </div>
                        ))}
                        
                        {page.aboutUs.map((items: any) => (
                            <div key={items._key}>
                                <Title title={items.blockHeading} big />
                                {BlockComponent(items.contents)}
                            </div>
                        ))}
                        <div className="bg-gray-1 text-black py-20">
                            <PagePadding>
                                {page.ethics.map((items: any) => (
                                    <div key={items._key}>
                                        <Title title={items.blockHeading} big />
                                        {BlockComponent(items.contents)}
                                    </div>
                                ))}
                            </PagePadding>
                        </div>
                        <div className="items-center justify-center md:h-screen bg-fixed bg-center bg-cover fun-parallax">
                            <div className="items-center justify-center h-full w-full bg-custom">
                                <PagePadding>
                                    {page.funFacts.map((items: any) => (
                                        <div key={items._key}>
                                            <Title title={items.heading} big />
                                            <TableComponent>
                                                <thead>
                                                    {items.head.map((tbdata: any) => (
                                                        <tr key={tbdata._key}>
                                                            {tbdata.cells.map((cells: any) => (
                                                                <th key={cells} className="text-3xl">{cells}</th>
                                                            ))}
                                                        </tr>
                                                    ))}
                                                </thead>
                                                <tbody>
                                                    {items.body.map((tbdata: any) => (
                                                        <tr key={tbdata._key}>
                                                            {tbdata.cells.map((cells: any) => (
                                                                <td key={cells} className="text-xl">{cells}</td>
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
                        <div>
                            {page.headGetin.map((items: any) => (
                                <div key={items._key}>
                                    <Title title={items.heading} big />
                                </div>
                            ))}
                        </div>
                        <Grid two>
                            <div>
                                this
                            </div>
                            <div>
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
                        </Grid>

                    </div>
                </div>
            ))}

        </>
    )
}