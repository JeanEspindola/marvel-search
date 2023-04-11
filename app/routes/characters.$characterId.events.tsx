import type { LinksFunction, LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node'
import invariant from 'tiny-invariant'
import { getCharacterEvents } from '~/models/characters.server'
import { isRouteErrorResponse, useLoaderData, useParams, useRouteError } from '@remix-run/react'
import stylesUrl from '~/styles/events.css'
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

  const response = await getCharacterEvents(id)

  if (response.code === 200 && response.data.total === 0) {
    throw new Response("We couldn't find any events for that character.", {
      status: 404,
    })
  }

  return json({ events: response.data.results });
}

export default function EventsRoute() {
  const { events } = useLoaderData()

  return (
    <div className="events-container">
      <h1 className="detail-header">Character's Events</h1>

      <div className="events-results">
        {/*// @ts-ignore*/}
        {events.map(event => {
          const { id, description, title, thumbnail } = event
          const image = getThumbnailImage(thumbnail)

          return (
            <div key={id} className="events-list-item">
              <img src={image} alt={title} className="events-image" />
              <div className="events-info">
                <h3>{title}</h3>
                <h4>{description}</h4>
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