import { rest } from 'msw'
import { eventsFixture } from './fixtures/events'
import { comicsFixture } from './fixtures/comics'
import { storiesFixture } from './fixtures/stories'
import { seriesFixture } from './fixtures/series'
import { characterDetailFixture, characterListFixture } from './fixtures/characters'

const handlers = [
  // Character List
  rest.get('*/v1/public/characters', (req, res, ctx) => {
    return res(
      ctx.status(200, 'Mocked status'),
      ctx.json({
        ...characterListFixture,
      }),
    )
  }),

  // Character Events
  rest.get('*/v1/public/characters/:characterId/events', (req, res, ctx) => {
    return res(
      ctx.status(200, 'Mocked status'),
      ctx.json({
        ...eventsFixture,
      }),
    )
  }),

  // Character Comics
  rest.get('*/v1/public/characters/:characterId/comics', (req, res, ctx) => {
    return res(
      ctx.status(200, 'Mocked status'),
      ctx.json({
        ...comicsFixture,
      }),
    )
  }),

  // Character Stories
  rest.get('*/v1/public/characters/:characterId/stories', (req, res, ctx) => {
    return res(
      ctx.status(200, 'Mocked status'),
      ctx.json({
        ...storiesFixture,
      }),
    )
  }),

  // Character Series
  rest.get('*/v1/public/characters/:characterId/series', (req, res, ctx) => {
    return res(
      ctx.status(200, 'Mocked status'),
      ctx.json({
        ...seriesFixture,
      }),
    )
  }),

  // Character Details
  rest.get('*/v1/public/characters/:characterId', (req, res, ctx) => {
    return res(
      ctx.status(200, 'Mocked status'),
      ctx.json({
        ...characterDetailFixture,
      }),
    )
  }),

]

export { handlers }
