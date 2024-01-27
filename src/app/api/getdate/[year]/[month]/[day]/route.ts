import { NextResponse, NextRequest } from 'next/server'
import { getDate } from '@/app/api/db'

type Params = { year: string; month: string; day: string }
const twoDigitFormatter = new Intl.NumberFormat('en-US', {
  minimumIntegerDigits: 2,
})

export const GET = async (
  request: NextRequest,
  { params }: { params: Params }
) => {
  const month = twoDigitFormatter.format(+params.month)
  const day = twoDigitFormatter.format(+params.day)
  const dateString = `${params.year}-${month}-${day}T00:00:00.000Z`
  const requestedDate = new Date(dateString)
  const data = await getDate(requestedDate)
  if (data.length < 1)
    return NextResponse.json(
      { message: `Data not found for ${requestedDate}` },
      { status: 404 }
    )

  return NextResponse.json(data[0], { status: 200 })
}
