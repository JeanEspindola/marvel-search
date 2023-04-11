import { Form, useSearchParams } from '@remix-run/react'
import type { LinksFunction } from '@remix-run/node'
import stylesUrl from '~/styles/SearchInput.css'

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
}

export function SearchInput() {
  const [params] = useSearchParams()

  return (
    <Form className="search-form">
      <input
        name="query"
        type="search"
        placeholder="Search characters..."
        autoFocus
        required
        defaultValue={params.get("query") || ''}
        className="search-input"/>
      <button type="submit" className="search-button">Go</button>
    </Form>
  )
}