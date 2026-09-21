import assert from 'node:assert/strict'
import { test } from 'node:test'
import { openDb } from '@/app/api/db'
import { GET } from './route.ts'

test('GET reads month and day from their own route segments', async () => {
  const db = openDb()
  const [expected] = db
    .prepare('SELECT `event` FROM mytable WHERE date = ?')
    .all('2024-08-24') as { event: string | null }[]

  const response = await GET(
    new Request('http://localhost/api/getdate/2026/8/24'),
    {
      params: Promise.resolve({ slug: '2026', month: '8', day: '24' }),
    }
  )
  const body = await response.json()

  assert.equal(response.status, 200)
  assert.equal(body.event, expected.event)
})
