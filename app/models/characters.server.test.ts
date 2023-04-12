import {
  getCharacterById,
  getCharacterComics, getCharacterEvents,
  getCharacters,
  getCharacterSeries,
  getCharacterStories
} from '~/models/characters.server'
import { characterDetailFixture, characterListFixture } from '../../mocks/fixtures/characters'
import { comicsFixture } from '../../mocks/fixtures/comics'
import { seriesFixture } from '../../mocks/fixtures/series'
import { storiesFixture } from '../../mocks/fixtures/stories'
import { eventsFixture } from '../../mocks/fixtures/events'

describe('characters.server', () => {
  it('checks getCharacters method', async () => {
    const characters = await getCharacters('iron')
    expect(characters).toEqual(characterListFixture.data.results)
  })

  it('checks getCharacterById method', async () => {
    const characters = await getCharacterById('1009368')
    expect(characters).toEqual(characterDetailFixture)
  })

  it('checks getCharacterComics method', async () => {
    const characters = await getCharacterComics('1009368')
    expect(characters).toEqual(comicsFixture)
  })

  it('checks getCharacterSeries method', async () => {
    const characters = await getCharacterSeries('1009368')
    expect(characters).toEqual(seriesFixture)
  })

  it('checks getCharacterStories method', async () => {
    const characters = await getCharacterStories('1009368')
    expect(characters).toEqual(storiesFixture)
  })

  it('checks getCharacterEvents method', async () => {
    const characters = await getCharacterEvents('1009368')
    expect(characters).toEqual(eventsFixture)
  })
})