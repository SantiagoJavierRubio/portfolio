import { useState, useEffect } from 'react'

function getWindowDimensions(window) {
  const { innerWidth: width, innerHeight: height } = window
  return {
    width,
    height
  }
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState({
    width: 0,
    height: 0
  })

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions(window))
    }

    if (windowDimensions.width === 0 || windowDimensions.height === 0)
      handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowDimensions
}
