import { NoDetailOptionError } from '~/components/NoDetailOptionError'
import { render, screen } from '@testing-library/react'

describe('NoDetailOptionError', () => {
  it('renders correctly', () => {
    render(<NoDetailOptionError message="Nothing to show here." characterId="123456789" />)

    const title = screen.getByText('Sorry')
    const subTitle = screen.getByText('Nothing to show here.')
    const characterText = screen.getByText('CharacterId: 123456789')

    expect(title).toBeInTheDocument()
    expect(subTitle).toBeInTheDocument()
    expect(characterText).toBeInTheDocument()
  })
})