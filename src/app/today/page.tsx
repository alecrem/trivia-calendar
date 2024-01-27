'use client'

import { useState, useEffect } from 'react'
import { DateBox } from '@/components/DateBox'

const twoDigitFormatter = new Intl.NumberFormat('en-US', {
  minimumIntegerDigits: 2,
})
const periodMilliseconds = 50 * 1000

export default function Today() {
  const [lastUpdated, setLastUpdated] = useState(new Date())
  const [thisDate, setThisDate] = useState('')
  const [thisMonth, setThisMonth] = useState('')
  const [event, setEvent] = useState('')

  const update = async (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    setThisMonth(twoDigitFormatter.format(month))
    setThisDate(twoDigitFormatter.format(day))
    const todayRes = await fetch(`/api/getdate/${year}/${month}/${day}`)
    const todayData = await todayRes.json()
    setEvent(todayData.event)
  }

  useEffect(() => {
    const date = new Date()
    update(date)
    setLastUpdated(date)
  }, [])
  useEffect(() => {
    const s = setInterval(() => {
      const date = new Date()
      if (date.getDate() != lastUpdated.getDate()) {
        update(date)
        setLastUpdated(date)
      }
    }, periodMilliseconds)
    return () => clearInterval(s)
  }, [lastUpdated])

  return <DateBox date={thisDate} month={thisMonth} event={event} />
}
