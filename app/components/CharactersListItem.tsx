import type { LinksFunction } from '@remix-run/node'
import stylesUrl from '~/styles/CharactersListItem.css'
import { NavLink, useLocation } from '@remix-run/react'

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
}

type CharactersListItemProps = {
  id: string
  name: string
  image: string
}

export function CharactersListItem({ id, image, name }: CharactersListItemProps) {
  const location = useLocation()

  return (
    <NavLink key={id} to={{ pathname: id.toString(), search: location.search }} className="list-item" >
      <img src={image} alt={name} className="image"/>
      <span className="name">
        {name}
      </span>
    </NavLink>
  )
}