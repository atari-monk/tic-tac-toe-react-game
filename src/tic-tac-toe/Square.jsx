import {useRef, useEffect, useState} from 'react'
import './Square.css' // Assuming you move styles here

export default function Square({value, onSquareClick}) {
  const ref = useRef(null)
  const [fontSize, setFontSize] = useState('1rem')

  useEffect(() => {
    const resizeObserver = new ResizeObserver(([entry]) => {
      const {width, height} = entry.contentRect
      const size = Math.min(width, height)
      setFontSize(`${size * 0.6}px`) // 60% of cell size
    })

    if (ref.current) {
      resizeObserver.observe(ref.current)
    }

    return () => resizeObserver.disconnect()
  }, [])

  const valueClass = value === 'X' ? 'x' : value === 'O' ? 'o' : ''

  return (
    <div
      ref={ref}
      className={`square ${valueClass}`}
      onClick={onSquareClick}
      style={{fontSize}}
    >
      {value}
    </div>
  )
}
