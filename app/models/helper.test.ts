import { getAuthenticationParam, getThumbnailImage } from '~/models/helper'
import { vitest } from 'vitest'

describe('helper', () => {
  it('should get thumbnail image', () => {
    const thumbnail = {
      path: 'https://www.thumbnail.com/image',
      extension: 'jpeg',
    }

    expect(getThumbnailImage(thumbnail)).toEqual('https://www.thumbnail.com/image.jpeg')
  })

  it('should get authentication params', () => {
    vitest.useFakeTimers().setSystemTime(new Date('2023-04-12 16:30'))

    const param = getAuthenticationParam()

    expect(param).toEqual('ts=1681309800000&apikey=1234&hash=2f20e6798c3bbca76abd8efd593884f5')
  })
})

