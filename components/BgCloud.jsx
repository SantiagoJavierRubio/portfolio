/* eslint-disable tailwindcss/no-custom-classname */
import { useEffect, useRef } from 'react'
import useWindowScroll from '../hooks/useWindowScroll'

export default function BgCloud() {
  const cloudRef = useRef(null)
  const scroll = useWindowScroll()

  const pointerMoveHandler = e => {
    if (!cloudRef.current) return
    cloudRef.current.animate(
      {
        left: `${Math.min(
          Math.max(e.clientX, window.innerWidth * 0.15),
          window.innerWidth * 0.85
        )}px`,
        top: `${Math.min(
          Math.max(e.clientY + scroll, window.innerHeight * 0.15),
          (window.innerHeight + scroll) * 0.75
        )}px`
      },
      { duration: 4000, fill: 'forwards' }
    )
  }
  useEffect(() => {
    document.addEventListener('pointermove', pointerMoveHandler)

    return () => document.removeEventListener('pointermove', pointerMoveHandler)
  })
  return (
    <>
      <div id="bgCloud" ref={cloudRef} />
      <div id="bgCloudBlur" className="absolute inset-0 -top-32" />
    </>
  )
}
