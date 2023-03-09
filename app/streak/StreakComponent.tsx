import { useState, useEffect } from 'react'
import { GoFlame } from "react-icons/go"
import Popup from 'reactjs-popup'
interface Props {
  count: number
}
export default function StreakComponent({ count }: Props) {
  const [isVisible, setIsVisible] = useState(true)
  useEffect(() => {
    const timer1 = setTimeout(() => {
      setIsVisible(true)
    }, 1000)
    const timer2 = setTimeout(() => {
      setIsVisible(false)
    }, 4000)
    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [])
  return (
    <Popup open={isVisible}>
      <div className="bg-salmon rounded-2xl max-w-md mx-auto grid grid-cols-2 gap-2 p-3 relative shadow-md ">
        <div className="flex items-center justify-center w-10 h-10">
          <GoFlame size={24} color="white"/>
        </div>
        <span className="flex items-center justify-center text-white text-lg font-medium ml-1 absolute left-16 top-5">{count}</span>
      </div>
    </Popup>
  )
}