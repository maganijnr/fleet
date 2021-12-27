import sanityClient from '@sanity/client'
import imageBuilder from '@sanity/image-url'

export const client = sanityClient({
   projectId:process.env.REACT_APP_SANITY_ID,
   dataset:'production',
   apiVersion:'2021-12-26',
   useCdn: true,
   token:process.env.REACT_APP_SANITY_TOKEN
})

const builder = imageBuilder(client)

export const urlFor = (source) => builder.image(source)