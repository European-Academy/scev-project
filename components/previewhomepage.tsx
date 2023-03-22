import {definePreview} from 'next-sanity/preview'
import {projectId, dataset} from '../lib/sanity.client'
import { HomeFn, query } from './homepage'

const usePreview = definePreview({projectId, dataset})
export default function PreviewHomepage() {
  const data = usePreview(null, query)
  return <HomeFn data={data} />
}