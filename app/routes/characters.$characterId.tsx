import type { LinksFunction, LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node'
import { getCharacterById } from '~/models/characters.server'
import { isRouteErrorResponse, Outlet, useLoaderData, useParams, useRouteError } from '@remix-run/react'
import { getThumbnailImage } from '~/models/helper'
import stylesUrl from '~/styles/character.css'
import { CharacterNavLink, links as CharacterNavLinkStyles } from '~/components/CharactersNavLink'
import invariant from 'tiny-invariant'
import { NoDetailOptionError } from '~/components/NoDetailOptionError'
import { GenericDetailError } from '~/components/GenericDetailError'

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: stylesUrl },
  ...CharacterNavLinkStyles(),
]

export const loader: LoaderFunction = async ({
 params,
}) => {
  const id = params.characterId

  invariant(typeof id === 'string', 'character id is required')

  const response = await getCharacterById(id)

  if (response.code === 404) {
    throw new Response("We couldn't find that character", {
      status: 404,
    })
  }

  return json({ character: response.data.results[0] });
}

export default function CharacterRoute() {
  const { character } = useLoaderData()
  const { id, name, description, thumbnail, comics, series, stories, events } = character

  const path = `/characters/${id}`
  const imgSrc = getThumbnailImage(thumbnail)

  return (
    <div className="character-container">
      <div className="details">
        <h1 className="detail-header">Character's Detail</h1>
        <div className="detail-info">
          <img src={imgSrc} alt={name} className="character-image"/>
          <div className="info">
            <h2 className="detail-name">{name}</h2>
            <h4 className="detail-description">{description}</h4>
            <div className="navigation-options">
              {comics.available > 0 && (
                <CharacterNavLink path={path} option="comics" />
              )}
              {series.available > 0 && (
                <CharacterNavLink path={path} option="series" />
              )}
              {stories.available > 0 && (
                <CharacterNavLink path={path} option="stories" />
              )}
              {events.available > 0 && (
                <CharacterNavLink path={path} option="events" />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="details-outlet">
        <Outlet />
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

  return <GenericDetailError />
}