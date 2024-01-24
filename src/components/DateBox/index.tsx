type Props = {
  date: string
  month: string
  event: string
}

const DateBox = (props: Props) => {
  return (
    <div className={'bg-neutral-300 p-8 aspect-square min-w-96 max-w-96'}>
      <div className={'bg-white p-8 aspect-square min-h-full'}>
        <div className={'text-black align-middle min-h-max h-max'}>
          <div className={'text-black text-5xl font-bold text-right'}>
            {props.date}/{props.month}
          </div>
          <div className={'pt-16 text-lg font-light'}>{props.event}</div>
        </div>
      </div>
    </div>
  )
}

export { DateBox }
