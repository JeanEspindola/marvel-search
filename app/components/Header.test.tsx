import { render, screen } from '@testing-library/react'
import { Header } from '~/components/Header'
import { BrowserRouter } from 'react-router-dom'

describe('Header', () => {
  it('renders correctly', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    )

    const title = screen.getByRole('heading', {
      name: 'Marvel Search App'
    })
    const author = screen.getByRole('heading', {
      name: 'by Jean Espindola'
    })
    const link = screen.getByRole('link', {
      name: '/Characters'
    })

    expect(title).toBeInTheDocument()
    expect(author).toBeInTheDocument()
    expect(link).toBeInTheDocument()
  })
})