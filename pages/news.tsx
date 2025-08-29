import Head from 'next/head'
import { groq } from 'next-sanity'
import type { GetServerSideProps } from 'next'
import Image from 'next/image'
import { NavBar, PagePadding, Title, BlockComponent, Footer, Card, CardItem } from '../components'
import { client } from '../lib/sanity.client'
import { getFirstWords } from '../lib/utils/text'

type NewsPageProps = {
  pagedata: any[]
  posts: Array<{
    _id: string
    postTitle: string
    imageUrl?: string
    bodyText?: string
    description?: string
    slug?: { current?: string }
  }>
}

export default function NewsPage({ pagedata, posts }: NewsPageProps) {
  return (
    <>
      {pagedata.map((page: any) => (
        <div key={page._id}>
          <Head>
            <title>{page.pageTitle || 'News | Scientific Events'}</title>
            {page.description && <meta name="description" content={page.description} />}
            {page.keyword && <meta name="keywords" content={page.keyword} />}
          </Head>
          <NavBar />
          <div>
            <PagePadding>
              {page.newsTitle.map((items: any) => (
                <div key={items._key}>
                  {BlockComponent(items.contents)}
                </div>
              ))}
              <div className="mt-10">
                <Card>
                  {posts?.map((post) => (
                    <CardItem key={post._id} href={`/news/${post.slug?.current || ''}`}>
                      <div className="flex flex-col">
                        {post.imageUrl && (
                          <div className="relative w-full h-48 mb-4">
                            <Image
                              src={post.imageUrl}
                              alt={post.postTitle || 'News image'}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                              style={{ objectFit: 'cover' }}
                              unoptimized
                            />
                          </div>
                        )}
                        <h3 className="text-xl font-poppinsSemi mb-2 transition-colors group-hover:text-[#414EE3]">{post.postTitle}</h3>
                        {post.description && (
                          <p className="text-gray-700">
                            {getFirstWords(post.description, 25)}
                          </p>
                        )}
                      </div>
                    </CardItem>
                  ))}
                </Card>
              </div>
            </PagePadding>
          </div>
          <div>
            <Footer />
          </div>
        </div>
      ))}
    </>
  )
}

export const newsQuery = groq`
*[_type=='page' && slug.current match 'newspage'] {
    _id,
    pageTitle,
    keyword,
    description,
    "newsroomBanner": pageBuilder[@.slug.current == 'newsroomBanner'] {
      _key,
      blockHeading,
      "contents": blockContent
    },
    "newsTitle": pageBuilder[@.slug.current == 'news-title'] {
      _key,
        blockHeading,
        "contents": blockContent
    }
}
`

export const postsForNewsQuery = groq`
*[
  _type == "post" &&
  defined(postCategory->_id) &&
  postCategory->slug.current match "newspage"
]{
  _id,
  postTitle,
  slug,
  description,
  "imageUrl": pageBuilder[@._type == "banner"][0].image.asset->url,
  "bodyText": pt::text(pageBuilder[@._type == "blockText"][0].blockContent)
}
`

export const getServerSideProps: GetServerSideProps = async () => {
  const page = await client.fetch(newsQuery)
  const posts = await client.fetch(postsForNewsQuery)
  return {
    props: {
      pagedata: page,
      posts,
    },
  }
}
