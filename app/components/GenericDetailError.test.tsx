import { render, screen } from '@testing-library/react'
import { GenericDetailError } from '~/components/GenericDetailError'

describe('GenericDetailError', () => {
  it('renders correctly', () => {
    render(<GenericDetailError />)

    const title = screen.getByText('Uh oh ...')
    const subTitle = screen.getByText('Something went wrong.')
    const unknown = screen.getByText('Unknown error')

    expect(title).toBeInTheDocument()
    expect(subTitle).toBeInTheDocument()
    expect(unknown).toBeInTheDocument()
  })
})