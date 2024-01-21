import { getDate } from '@/app/api/db'

export default async function Today() {
  const today = new Date()
  const twoDigitFormatter = new Intl.NumberFormat('en-US', {
    minimumIntegerDigits: 2,
  })
  const thisMonth = twoDigitFormatter.format(today.getMonth() + 1)
  const todayData = await getDate(today)
  const todayEvent = todayData[0].event
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        {today.getDate()}/{thisMonth}
      </div>
      <div>{todayEvent}</div>
    </main>
  )
}
