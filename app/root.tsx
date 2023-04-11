import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, } from '@remix-run/react'
import resetStyles from './styles/reset.css'
import rootStyles from './styles/root.css'
import type { LinksFunction } from '@remix-run/node'
import { Header, links as HeaderStyles } from '~/components/Header'
import type { V2_MetaFunction } from '@remix-run/node'

export const links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: resetStyles },
    { rel: 'stylesheet', href: rootStyles },
    ...HeaderStyles(),
  ]
}

export const meta: V2_MetaFunction = () => {
  return [{ title: "Marvel Search" }]
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <div className="main-container">
          <Header />
          <Outlet />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </div>
      </body>
    </html>
  );
}
