import { render, screen } from '@testing-library/react'
import { CharactersListItem } from '~/components/CharactersListItem'
import { BrowserRouter } from 'react-router-dom'

describe('CharactersListItem', () => {
  it('renders correctly', () => {
    render(
      <BrowserRouter>
        <CharactersListItem name="Iron Man" id="123456789" image="https://image.com" />
      </BrowserRouter>
    )

    const text = screen.getByText('Iron Man')
    const img = screen.getByRole('img')

    expect(text).toBeInTheDocument()
    expect(img).toHaveAttribute('src', 'https://image.com')
    expect(img).toHaveAttribute('alt', 'Iron Man')
  })
})