import { DatabaseSync } from 'node:sqlite'

export function openDb() {
  return new DatabaseSync('./data/gamerah-calendario.db', { readOnly: true })
}

export function getAllData() {
  const db = openDb()
  return db.prepare('SELECT * FROM mytable').all()
}

export function getDate(date: Date) {
  const db = openDb()
  console.log('📅getDate', date)
  const yyyyMmDdDate = date.toISOString().substring(0, 10)
  return db
    .prepare('SELECT `date`, `event` FROM mytable WHERE date = ?')
    .all(yyyyMmDdDate)
}
