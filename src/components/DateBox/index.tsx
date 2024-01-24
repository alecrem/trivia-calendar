type Props = {
  date: string
  month: string
  event: string
}

const DateBox = (props: Props) => {
  return (
    <>
      <div>
        {props.date}/{props.month}
      </div>
      <div>{props.event}</div>
    </>
  )
}

export { DateBox }
