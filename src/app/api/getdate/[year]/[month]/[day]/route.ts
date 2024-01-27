import { NextResponse, NextRequest } from 'next/server'
import { getDate } from '@/app/api/db'

type Params = { year: string; month: string; day: string }

export const GET = async (
  request: NextRequest,
  { params }: { params: Params }
) => {
  const requestedDate = new Date(`${params.year}-${params.month}-${params.day}`)
  const data = await getDate(requestedDate)
  if (data.length < 1)
    return NextResponse.json(
      { message: `Data not found for ${requestedDate}` },
      { status: 404 }
    )

  return NextResponse.json(data[0], { status: 200 })
}
