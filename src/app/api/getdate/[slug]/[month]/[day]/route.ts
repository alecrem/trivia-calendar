import { NextResponse } from 'next/server'
import { getDate } from '@/app/api/db'

const twoDigitFormatter = new Intl.NumberFormat('en-US', {
  minimumIntegerDigits: 2,
})

type Params = Promise<{ slug: string; month: string; day: string }>

export async function GET(_request: Request, segmentData: { params: Params }) {
  const {
    slug: yearParam,
    month: monthParam,
    day: dayParam,
  } = await segmentData.params

  const month = twoDigitFormatter.format(+monthParam)
  const day = twoDigitFormatter.format(+dayParam)
  const dateString = `${yearParam}-${month}-${day}T00:00:00.000Z`
  const requestedDate = new Date(dateString)
  const data = await getDate(requestedDate)
  if (data.length < 1)
    return NextResponse.json(
      { message: `Data not found for ${requestedDate}` },
      { status: 404 }
    )

  return NextResponse.json(data[0], { status: 200 })
}
