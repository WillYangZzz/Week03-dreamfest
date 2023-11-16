import { describe, test } from 'vitest'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { capitalise, validateDay } from '../routes/helpers.ts'

describe('capitalise', () => {
  test.todo('returns a capitalised string')

  test.todo('returns an empty string if the name argument is not a string')

  test.todo('returns an empty string if the name argument is an empty string')
})

describe('validateDay', () => {
  test.todo("returns the day if it exists in the supplied 'days' array")

  test.todo(
    "returns the first day from the supplied 'days' array if 'day' is not in that array"
  )

  test.todo(
    "returns the day from 'eventDays' if 'day' exists in 'eventDays' and no 'days' argument is provided"
  )

  test.todo(
    "returns 'friday' if 'day' does not exist in 'eventDays' and no 'days' argument is provided"
  )

  test.todo("returns the matching lowercase day if 'day' is uppercase")

  test.todo('throws an error if the days argument is not an array of strings')
})
