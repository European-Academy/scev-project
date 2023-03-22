import { groq } from 'next-sanity'
import type { GetServerSideProps } from 'next'
import imageUrlBuilder from '@sanity/image-url'
// import { useRouter } from "next/router";
import { lazy } from 'react'
import { PreviewSuspense } from 'next-sanity/preview'
import { HomeFn, query } from '../components/homepage'
import { client } from '../lib/sanity.client'
import {
    Banner,
    NavBar,
    PagePadding,
    Title
} from '../components'

const builder = imageUrlBuilder(client)

function urlFor(source: any) {
    return builder.image(source)
}

const PreviewHomepage = lazy(() => import('../components/previewhomepage'))

type HomeFnProps = {
    pagedata: any[]
    preview: any
}

const Homepage: React.FC<HomeFnProps> = ({ pagedata, preview }) => {

    const Contents = ({ realdata, previewdata }: any) => {
        if (previewdata) {
            return (
                <PreviewSuspense fallback={<HomeFn data={realdata} />}>
                    <PreviewHomepage />
                </PreviewSuspense>
            )
        }
        return <HomeFn data={realdata} />
    }

    return (
        <>
            
            <Contents realdata={pagedata} previewdata={preview} />
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res, preview = false }) => {
    res.setHeader(
        "Cache-Control",
        "public, s-maxage=120, stale-while-revalidate=130"
    );

    const page = await client.fetch(query)

    return {
        props: {
            pagedata: page,
            preview
        }
    }
}

export default Homepage