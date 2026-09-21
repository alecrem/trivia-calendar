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

test('GET matches Feb 29 correctly even when the request year is not a leap year', async () => {
  const db = openDb()
  const [expected] = db
    .prepare('SELECT `event` FROM mytable WHERE date = ?')
    .all('2024-02-29') as { event: string | null }[]

  const response = await GET(
    new Request('http://localhost/api/getdate/2025/2/29'),
    {
      params: Promise.resolve({ slug: '2025', month: '2', day: '29' }),
    }
  )
  const body = await response.json()

  assert.equal(response.status, 200)
  assert.equal(body.event, expected.event)
})

test('GET returns 400 for a non-numeric day instead of crashing', async () => {
  const response = await GET(
    new Request('http://localhost/api/getdate/2026/2/yy'),
    {
      params: Promise.resolve({ slug: '2026', month: '2', day: 'yy' }),
    }
  )

  assert.equal(response.status, 400)
})
