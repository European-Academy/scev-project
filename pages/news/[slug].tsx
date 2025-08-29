import Head from 'next/head'
import type { GetServerSideProps } from 'next'
import Image from 'next/image'
import { useState } from 'react'
import { groq } from 'next-sanity'
import { NavBar, PagePadding, Title, BlockComponent, Footer, Grid } from '../../components'
import { client } from '../../lib/sanity.client'

type PostPageProps = {
  post: any | null
}

export default function PostPage({ post }: PostPageProps) {
  if (!post) return null

  const [lightboxUrl, setLightboxUrl] = useState<string | null>(null)

  return (
    <>
      <Head>
        <title>{post.postTitle || ' | Scientific Events'}</title>
        {post.description && <meta name="description" content={post.description} />}
      </Head>
      <NavBar />
      <main className="font-poppins min-h-screen">
        <PagePadding>
          <div className="py-10">
            <Title title={post.postTitle} />
            {post.pageBuilder?.map((section: any, idx: number) => {
              switch (section._type) {
                case 'banner':
                  return (
                    <div key={idx} className="my-6">
                      {section.image?.asset?.url && section.image?.asset?.metadata?.dimensions && (
                        <div className="w-full">
                          <Image
                            src={section.image.asset.url}
                            alt={section.image.alt || 'Banner'}
                            width={section.image.asset.metadata.dimensions.width}
                            height={section.image.asset.metadata.dimensions.height}
                            sizes="100vw"
                            style={{ width: '100%', height: 'auto' }}
                          />
                        </div>
                      )}
                    </div>
                  )
                case 'blockText':
                  return (
                    <div key={idx} className="my-6">
                      <div className="prose max-w-none">
                        {BlockComponent(section.blockContent)}
                      </div>
                    </div>
                  )
                case 'gallery':
                  return (
                    <div key={idx} className="my-6">
                      <Grid five>
                        {section.images?.map((img: any) => (
                          <button
                            key={img._key}
                            type="button"
                            className="relative w-full aspect-square focus:outline-none"
                            onClick={() => img.asset?.url && setLightboxUrl(img.asset.url)}
                          >
                            {img.asset?.url && (
                              <Image
                                src={img.asset.url}
                                alt={img.alt || 'Gallery image'}
                                fill
                                sizes="25vw"
                                style={{ objectFit: 'cover' }}
                              />
                            )}
                          </button>
                        ))}
                      </Grid>
                    </div>
                  )
                default:
                  return null
              }
            })}
          </div>
        </PagePadding>
      </main>
      <div>
        <Footer />
      </div>

      {lightboxUrl && (
        <div className="fixed inset-0 z-[100]">
          <div className="absolute inset-0 bg-black/70" />
          <div
            className="absolute inset-0 flex items-center justify-center p-4"
            onClick={() => setLightboxUrl(null)}
          >
            <div
              className="relative w-full max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="absolute top-2 right-2 z-[110] bg-black/80 text-white rounded-full w-9 h-9 flex items-center justify-center shadow hover:opacity-90"
                onClick={() => setLightboxUrl(null)}
                aria-label="Close image"
              >
                X
              </button>
              <div className="relative w-full" style={{ aspectRatio: '1 / 1' }}>
                <Image
                  src={lightboxUrl}
                  alt="Full image preview"
                  fill
                  sizes="100vw"
                  style={{ objectFit: 'contain' }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export const postBySlugQuery = groq`
*[_type == "post" && slug.current == $slug][0]{
  _id,
  postTitle,
  description,
  pageBuilder[]{
    _type,
    // banner
    _type == "banner" => {
      _type,
      heading,
      image{
        asset->{ url, metadata{ dimensions{ width, height } } },
        alt
      }
    },
    // blockText
    _type == "blockText" => {
      _type,
      blockHeading,
      blockContent
    },
    // gallery (imageGallery)
    _type == "gallery" => {
      _type,
      heading,
      images[]{
        _key,
        alt,
        asset->{ url, metadata{ dimensions{ width, height } } }
      }
    }
  }
}
`

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const slug = params?.slug as string
  const post = await client.fetch(postBySlugQuery, { slug })
  return {
    props: {
      post: post || null,
    },
  }
}


