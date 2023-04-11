import md5 from 'md5'
import { config } from '~/models/config'

export const getAuthenticationParam = () => {
  const timestamp = Date.now()

  const hash = md5(`${timestamp}${config.privateKey}${config.apiKey}`)

  return `ts=${timestamp}&apikey=${config.apiKey}&hash=${hash}`
}

type Thumbnail = {
  path: string
  extension: string
}

export const getThumbnailImage = ({ path, extension }: Thumbnail) => {
  return `${path}.${extension}`
}