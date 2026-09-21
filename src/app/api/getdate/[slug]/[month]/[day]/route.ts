import { NextResponse } from 'next/server'
import { getDate } from '@/app/api/db'

const twoDigitFormatter = new Intl.NumberFormat('en-US', {
  minimumIntegerDigits: 2,
})

type Params = Promise<{ slug: string; month: string; day: string }>

function isValidDatePart(value: number, max: number) {
  return Number.isInteger(value) && value >= 1 && value <= max
}

export async function GET(_request: Request, segmentData: { params: Params }) {
  const { month: monthParam, day: dayParam } = await segmentData.params

  const monthNumber = Number(monthParam)
  const dayNumber = Number(dayParam)
  if (!isValidDatePart(monthNumber, 12) || !isValidDatePart(dayNumber, 31))
    return NextResponse.json(
      { message: `Invalid date ${monthParam}/${dayParam}` },
      { status: 400 }
    )

  const month = twoDigitFormatter.format(monthNumber)
  const day = twoDigitFormatter.format(dayNumber)
  const data = await getDate(month, day)
  if (data.length < 1)
    return NextResponse.json(
      { message: `Data not found for ${month}-${day}` },
      { status: 404 }
    )

  return NextResponse.json(data[0], { status: 200 })
}
