import type { LoaderFunction , LinksFunction } from '@remix-run/node';
import { json } from '@remix-run/node'
import invariant from 'tiny-invariant'
import { getCharacterStories } from '~/models/characters.server'
import { isRouteErrorResponse, useLoaderData, useParams, useRouteError } from '@remix-run/react'
import stylesUrl from '~/styles/stories.css'
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

  const response = await getCharacterStories(id)

  if (response.code === 200 && response.data.total === 0) {
    throw new Response("We couldn't find any stories for that character", {
      status: 404,
    })
  }

  return json({ stories: response.data.results });
}

export default function StoriesRoute() {
  const { stories } = useLoaderData()

  return (
    <div className="stories-container">
      <h1 className="detail-header">Character's Stories</h1>
      <div className="stories-results">
        {/*// @ts-ignore*/}
        {stories.map(story => {
          return (
            <h3 key={story.id}>{story.title}</h3>
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