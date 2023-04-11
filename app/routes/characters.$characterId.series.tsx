import { getCharacterSeries } from '~/models/characters.server'
import { isRouteErrorResponse, useLoaderData, useParams, useRouteError } from '@remix-run/react'
import invariant from 'tiny-invariant'
import type { LoaderFunction , LinksFunction } from '@remix-run/node';
import { json } from '@remix-run/node'
import stylesUrl from '~/styles/series.css'
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

  const response = await getCharacterSeries(id)

  if (response.code === 200 && response.data.total === 0) {
    throw new Response("We couldn't find any series for that character.", {
      status: 404,
    })
  }

  return json({ series: response.data.results });
}

export default function SeriesRoute() {
  const { series } = useLoaderData()

  return (
    <div className="series-container">
      <h1 className="detail-header">Character's Series</h1>
      <div className="series-results">
        {/*// @ts-ignore*/}
        {series.map(series => {
          const { id, description, title, thumbnail, startYear, endYear } = series
          const image = getThumbnailImage(thumbnail)

          return (
            <div key={id} className="series-list-item">
              <img src={image} alt={title} className="series-image" />
              <div className="series-info">
                <h3>{title}</h3>
                <h4>{description}</h4>
                <h4>{startYear} - {endYear}</h4>
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