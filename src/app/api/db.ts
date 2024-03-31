import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

export async function openDb() {
  console.log('__dirname', __dirname)
  return open({
    filename: './data/gamerah-calendario.db',
    driver: sqlite3.Database,
    mode: sqlite3.OPEN_READONLY,
  })
}

export async function getAllData() {
  const db = await openDb()
  return await db.all('SELECT * FROM mytable')
}

export async function getDate(date: Date) {
  const db = await openDb()
  const yyyyMmDdDate = date.toISOString().substring(0, 10)
  return await db.all(
    `SELECT \`date\`, \`event\` FROM mytable WHERE date ="${yyyyMmDdDate}"`
  )
}
