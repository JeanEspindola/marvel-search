import type { LinksFunction } from '@remix-run/node'
import styles from '~/styles/Header.css'
import { NavLink } from '@remix-run/react'

export const links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: styles },
  ]
}

export function Header() {
  return (
    <div className="header">
      <div className="left-header">
        <h1>
          <NavLink to="/characters" title="Characters Search">
            /Characters
          </NavLink>
        </h1>
      </div>
      <div className="right-header">
        <h1 className="header-title">Marvel Search App</h1>
        <h3 className="header-author">by Jean Espindola</h3>
      </div>
    </div>
  )
}