import { NextResponse } from 'next/server'
import { getDate } from '@/app/api/db'

const twoDigitFormatter = new Intl.NumberFormat('en-US', {
  minimumIntegerDigits: 2,
})

type Params = Promise<{ slug: string }>

export async function GET(_request: Request, segmentData: { params: Params }) {
  const { slug } = await segmentData.params
  console.log('📦slug', slug)
  const args = slug.split('/')
  console.log('args', args)
  const yearParam = args[0]
  const monthParam = args[1]
  const dayParam = args[2]
  console.log('📦searchParams', yearParam, monthParam, dayParam)

  const month = twoDigitFormatter.format(+monthParam)
  const day = twoDigitFormatter.format(+dayParam)
  const dateString = `${yearParam}-${month}-${day}T00:00:00.000Z`
  const requestedDate = new Date(dateString)
  console.log('📅GET', requestedDate)
  const data = await getDate(requestedDate)
  if (data.length < 1)
    return NextResponse.json(
      { message: `Data not found for ${requestedDate}` },
      { status: 404 }
    )

  return NextResponse.json(data[0], { status: 200 })
}
