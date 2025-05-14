import { SanityImage } from '@/types/sanity';
import { createClient } from '@sanity/client'
import type { SanityClient } from '@sanity/client'
import imageUrlBuilder from "@sanity/image-url"

export const sanityClient: SanityClient = createClient({
  projectId: "bsr6ngqu",
  dataset: "production",
  apiVersion: '2025-05-05', 
  useCdn: true, 
})

const builder = imageUrlBuilder(sanityClient)


export function urlForImage(source: SanityImage) {
  return builder.image(source)
}


export const getPdfUrl = (ref: string) => {
  return `https://cdn.sanity.io/files/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${ref.replace('file-', '').replace('-pdf', '.pdf')}`;
};




