import { getAuthenticationParam } from '~/models/helper'

export async function getCharacters(name: string) {
  const baseUrl = `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${name}`
  const authParam = getAuthenticationParam()

  const url = `${baseUrl}&${authParam}`

  const response = await fetch(url, {
    method: 'GET',
  })

  return await response.json().then(response => response.data.results)
}

export async function getCharacterById(characterId: string) {
  const baseUrl = `https://gateway.marvel.com:443/v1/public/characters/${characterId}`
  const authParam = getAuthenticationParam()

  const url = `${baseUrl}?${authParam}`

  const response = await fetch(url, {
    method: 'GET',
  })

  return await response.json()
}

export async function getCharacterComics(characterId: string) {
  const baseUrl = `https://gateway.marvel.com:443/v1/public/characters/${characterId}/comics`
  const authParam = getAuthenticationParam()

  const url = `${baseUrl}?${authParam}`

  const response = await fetch(url, {
    method: 'GET',
  })

  return await response.json()
}

export async function getCharacterSeries(characterId: string) {
  const baseUrl = `https://gateway.marvel.com:443/v1/public/characters/${characterId}/series`
  const authParam = getAuthenticationParam()

  const url = `${baseUrl}?${authParam}`

  const response = await fetch(url, {
    method: 'GET',
  })

  return await response.json()
}

export async function getCharacterStories(characterId: string) {
  const baseUrl = `https://gateway.marvel.com:443/v1/public/characters/${characterId}/stories`
  const authParam = getAuthenticationParam()

  const url = `${baseUrl}?${authParam}`

  const response = await fetch(url, {
    method: 'GET',
  })

  return await response.json()
}

export async function getCharacterEvents(characterId: string) {
  const baseUrl = `https://gateway.marvel.com:443/v1/public/characters/${characterId}/events`
  const authParam = getAuthenticationParam()

  const url = `${baseUrl}?${authParam}`

  const response = await fetch(url, {
    method: 'GET',
  })

  return await response.json()
}
