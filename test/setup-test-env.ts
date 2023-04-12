import { installGlobals } from '@remix-run/node'
import '@testing-library/jest-dom'
import { server } from '../mocks/server'

installGlobals()

process.env.API_KEY = "1234"
process.env.PRIVATE_KEY = "abcd"


beforeAll(() => {
  server.listen()
})

afterEach(() => {
  server.resetHandlers()
})

afterAll(() => {
  server.close()
})