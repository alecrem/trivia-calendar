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
  const mmDd = date.toISOString().substring(5, 10)
  return db
    .prepare('SELECT `date`, `event` FROM mytable WHERE substr(date, 6) = ?')
    .all(mmDd)
}
