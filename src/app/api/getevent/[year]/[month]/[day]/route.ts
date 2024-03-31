import { NextResponse, NextRequest } from 'next/server'
import { getDate } from '@/app/api/db'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

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
  const dateString = `${params.year}-${month}-${day}`
  console.log(dateString)

  const event = await prisma.events.findFirstOrThrow({
    where: { date: dateString },
  })
  return NextResponse.json({ event }, { status: 200 })
}
