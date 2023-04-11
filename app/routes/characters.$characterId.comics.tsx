import type { LoaderFunction , LinksFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { getCharacterComics } from '~/models/characters.server'
import invariant from 'tiny-invariant'
import { isRouteErrorResponse, useLoaderData, useParams, useRouteError } from '@remix-run/react'
import stylesUrl from '~/styles/comics.css'
import { getThumbnailImage } from '~/models/helper'
import { GenericDetailError } from '~/components/GenericDetailError'
import { NoDetailOptionError, links as NoDetailOptionErrorStyles } from '~/components/NoDetailOptionError'

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: stylesUrl },
  ...NoDetailOptionErrorStyles(),
]

export const loader: LoaderFunction = async ({
 params,
}) => {
  const id = params.characterId
  invariant(typeof id === 'string', 'id is required')

  const response = await getCharacterComics(id)

  if (response.code === 200 && response.data.total === 0) {
    throw new Response("We couldn't find any comics for that character.", {
      status: 404,
    })
  }

  return json({ comics: response.data.results });
}

export default function ComicsRoute() {
  const { comics } = useLoaderData()

  return (
    <div className="comics-container">
      <h1 className="detail-header">Character's Comics</h1>
      <div className="comics-results">
        {/*// @ts-ignore*/}
        {comics.map(comic => {
          const { id, title, thumbnail, format, pageCount } = comic
          const image = getThumbnailImage(thumbnail)

          return (
            <div key={id} className="comics-list-item">
              <img src={image} alt={title} className="comics-image" />
              <div className="comics-info">
                <h3>{title}</h3>
                <h4>Format: {format}</h4>
                <h5>Pages: {pageCount}</h5>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function ErrorBoundary() {
  const error = useRouteError()
  const { characterId } = useParams()

  if (isRouteErrorResponse(error)) {
    return (
      <NoDetailOptionError characterId={characterId} message={error.data} />
    )
  }

  return (
    <GenericDetailError />
  )
}