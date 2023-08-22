import { describe, expect, test } from '@jest/globals'

import { comparePassword } from '../../src/utils/functions'

describe('test comparePassword', () => {
  test('compare Password', () => {
    expect(comparePassword('example', 'example')).toBe(true)
  })
})
