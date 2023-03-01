/* eslint-disable tailwindcss/no-custom-classname */
import { useEffect, useRef } from 'react'
import useWindowScroll from '../hooks/useWindowScroll'
import useWindowDimensions from '../hooks/useWindowDimensions'

export default function BgCloud() {
  const cloudRef = useRef(null)
  const scroll = useWindowScroll()
  const { width } = useWindowDimensions()

  const pointerMoveHandler = e => {
    if (!cloudRef.current || width < 640) return
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
      { duration: 5000, fill: 'forwards' }
    )
  }
  useEffect(() => {
    if (width > 640) {
      document.addEventListener('pointermove', pointerMoveHandler)
    }
    return () => {
      width > 640 &&
        document.removeEventListener('pointermove', pointerMoveHandler)
    }
  }, [width, scroll])
  return (
    <>
      <div id="bgCloud" className="hidden motion-safe:block" ref={cloudRef} />
      <div id="bgCloudBlur" className="absolute inset-0 -top-32" />
    </>
  )
}
