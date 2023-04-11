import type { LinksFunction } from '@remix-run/node'
import stylesUrl from '~/styles/NoDetailOption.css'

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: stylesUrl },
]

type NoDetailOptionErrorProps = {
  message: string
  characterId?: string
}

export function NoDetailOptionError({ message, characterId }: NoDetailOptionErrorProps) {
  return (
    <div className="no-detail-option-container">
      <h1 className="error-header">Sorry</h1>
      <h2 className="error-detail">{message}</h2>
      <h4>CharacterId: {characterId}</h4>
    </div>
  )
}