import assert from 'node:assert/strict'
import { test } from 'node:test'
import { getDate, openDb } from './db.ts'

test('getDate matches the event for the same month and day regardless of year', () => {
  const db = openDb()
  const [expected] = db
    .prepare('SELECT `date`, `event` FROM mytable WHERE date = ?')
    .all('2024-08-24') as { date: string; event: string | null }[]

  const [actual] = getDate(new Date('2099-08-24T00:00:00.000Z')) as {
    date: string
    event: string | null
  }[]

  assert.equal(actual.event, expected.event)
})
