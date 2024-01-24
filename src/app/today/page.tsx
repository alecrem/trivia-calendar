import { getDate } from '@/app/api/db'
import { DateBox } from '@/components/DateBox'

export default async function Today() {
  const today = new Date()
  const twoDigitFormatter = new Intl.NumberFormat('en-US', {
    minimumIntegerDigits: 2,
  })
  const thisDate = twoDigitFormatter.format(today.getDate())
  const thisMonth = twoDigitFormatter.format(today.getMonth() + 1)
  const todayData = await getDate(today)
  const todayEvent = todayData[0].event
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <DateBox date={thisDate} month={thisMonth} event={todayEvent} />
    </main>
  )
}
