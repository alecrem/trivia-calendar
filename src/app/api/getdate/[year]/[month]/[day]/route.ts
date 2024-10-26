import { NextResponse, NextRequest } from 'next/server'
import { getDate } from '@/app/api/db'

type Params = { year: string; month: string; day: string }
const twoDigitFormatter = new Intl.NumberFormat('en-US', {
  minimumIntegerDigits: 2,
})

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams
  const yearParam = searchParams.get('year')
  const monthParam = searchParams.get('month') || '01'
  const dayParam = searchParams.get('day') || '01'

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
