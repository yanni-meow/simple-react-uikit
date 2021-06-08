import React, { useState } from 'react' //  useEffect,
import style from './style.scss'

interface TimerProps {
  timerDuration: Array<number>
  timerJoin?: string
  customStyle?: object
}

const Timer = (props: TimerProps) => {
  const { timerDuration, timerJoin = ':', customStyle } = props
  const startTime =
    timerDuration[2] + timerDuration[1] * 60 + timerDuration[0] * 60 * 60
  const [currentTime, setCurrentTime] = useState(
    [
      timerDuration[0].toString().padStart(2, '0'),
      timerDuration[1].toString().padStart(2, '0'),
      timerDuration[2].toString().padStart(2, '0')
    ].join(timerJoin)
  )
  let [leftTime, setLeftTime] = useState(startTime)

  const timeToShow = (actualTime: number) => {
    const hours = Math.floor(actualTime / 60 / 60)
    const minutes = Math.floor(actualTime / 60) - hours * 60
    const seconds = Math.ceil(actualTime % 60)
    const formattedTime = [
      hours.toString().padStart(2, '0'),
      minutes.toString().padStart(2, '0'),
      seconds.toString().padStart(2, '0')
    ].join(timerJoin)
    return formattedTime
  }
  const updateTime = () => {
    setCurrentTime(timeToShow(leftTime))
    setLeftTime(--leftTime)
  }

  setTimeout(() => {
    updateTime()
    setTimeout(updateTime, 1000)
  }, 1000)
  //   useEffect(() => {
  //     const timer = setTimeout(() => {
  //       updateTime()
  //       setTimeout(updateTime, 5000)
  //     }, 5000)
  //     return () => {
  //       clearTimeout(timer)
  //     }
  //   }, [])

  return (
    <div className={style.timer} style={customStyle && customStyle}>
      {currentTime}
    </div>
  )
}

export default Timer
