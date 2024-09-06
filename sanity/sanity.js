import {createClient} from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

const client = createClient({
  projectId: 'ats6bh5v', // Your project ID
  dataset: 'production', // Dataset name
  useCdn: true,
  apiVersion: '2024-08-28', // API version
  timeout: 3000000,
})

const builder = imageUrlBuilder(client)

export function urlFor(source) {
  return builder.image(source)
}

export default client
