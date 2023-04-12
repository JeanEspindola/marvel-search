import { render, screen } from '@testing-library/react'
import { CharacterNavLink } from '~/components/CharactersNavLink'
import { BrowserRouter } from 'react-router-dom'

describe('CharactersNavLink', () => {
  it('renders correctly', () => {
    render(
      <BrowserRouter>
        <CharacterNavLink path='/characters/' option="comics" />
      </BrowserRouter>
    )

    const link = screen.getByRole('link', {
      name: 'comics'
    })

    expect(link).toBeInTheDocument()
  })
})