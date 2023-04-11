import type { LinksFunction } from '@remix-run/node'
import stylesUrl from '~/styles/CharactersNavLink.css'
import { NavLink, useLocation } from '@remix-run/react'

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
}

type CharacterNavLinkProps = {
  path: string
  option: string
}

export function CharacterNavLink({ option, path }: CharacterNavLinkProps) {
  const location = useLocation()

  return (
    <NavLink to={{ pathname: `${path}/${option}`, search: location.search}} title={option} className="navigation-item">
      {option}
    </NavLink>
  )
}