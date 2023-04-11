import { Outlet, useLoaderData } from '@remix-run/react'
import type { LinksFunction, LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node'
import { getCharacters } from '~/models/characters.server'
import { CharactersListItem, links as CharactersListItemStyles } from '~/components/CharactersListItem'
import stylesUrl from '~/styles/characters.css'
import { getThumbnailImage } from '~/models/helper'
import { links as SearchInputStyles, SearchInput } from '~/components/SearchInput'

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: stylesUrl },
  ...CharactersListItemStyles(),
  ...SearchInputStyles(),
]

export async function loader({ request }: LoaderArgs) {
  const url = new URL(request.url)
  const query = url.searchParams.get('query')

  if (query) {
    return json({
      characters: await getCharacters(query),
      query,
    })
  }

  return json({ characters: null, query: null })
}

export default function Characters() {
  const { characters, query } = useLoaderData()

  return (
    <div className="characters-container">
      <div className="search-panel">
        <SearchInput />
        <div className="search-results">
          {/*// @ts-ignore*/}
          {characters && characters.map(character => {
            const { id, name, thumbnail } = character
            return (
              <CharactersListItem key={id} id={id} name={name} image={getThumbnailImage(thumbnail)} />
            )
          })}

          {query && characters.length === 0 && (
            <h2 className="not-found">
              No characters found with name {query} in Marvel's database.
            </h2>
          )}
        </div>
      </div>
      <div className="search-outlet">
        <Outlet />
      </div>
    </div>
  )
}