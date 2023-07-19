import myStyle from './Spinner.module.css'

interface SpinnerProps {
  className?: string
}

const Spinner = ({ className }: SpinnerProps) => {
  return (
    <div className={className}>
      <div className={myStyle['dots-container']}>
        <div className={myStyle.dot}></div>
        <div className={myStyle.dot}></div>
        <div className={myStyle.dot}></div>
        <div className={myStyle.dot}></div>
        <div className={myStyle.dot}></div>
      </div>
    </div>
  )
}

export default Spinner
