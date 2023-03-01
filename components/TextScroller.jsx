import { useState, useEffect, useCallback } from 'react'

export default function TextScroller({ textArray, lineDelay = 6000 }) {
  const [itemIndex, setItemIndex] = useState(0)

  const iterate = useCallback(() => {
    setTimeout(
      setItemIndex(prev => (prev >= textArray.length - 1 ? 0 : prev + 1)),
      lineDelay
    )
  }, [textArray])

  return (
    <div className="relative flex min-h-[10rem] w-2/3 flex-col justify-start overflow-hidden rounded-3xl bg-transparent p-4 text-base text-stone-200 shadow-xl shadow-black/10 backdrop-blur-lg">
      <div
        id="codeOverlayTop"
        className="absolute inset-0 rounded-3xl bg-gradient-to-b from-stone-900/50 to-stone-900"
      />
      <div
        id="codeOverlayTop"
        className="absolute inset-0 gap-2 rounded-3xl bg-gradient-to-t from-stone-900/50 to-stone-900"
      />
      <div className="flex h-6 w-full grow items-end">
        <Text text={textArray[itemIndex - 3] || ''} onFinish={iterate} />
      </div>
      <div className="flex h-6 w-full grow items-end">
        <Text text={textArray[itemIndex - 2] || ''} onFinish={iterate} />
      </div>
      <div className="flex h-6 w-full grow items-end">
        <Text text={textArray[itemIndex - 1] || ''} onFinish={iterate} />
      </div>
      <div className="h-6 w-full grow items-end pt-2 backdrop-blur-sm">
        <Text text={textArray[itemIndex]} onFinish={iterate} active />
      </div>
    </div>
  )
}

const Text = ({ text, onFinish, active = false }) => {
  const [cursor, setCursor] = useState(() => (active ? -1 : text.length - 1))
  useEffect(() => {
    if (!active) return
    setTimeout(() => {
      if (text === undefined || cursor === text.length - 1) {
        onFinish()
        setCursor(-1)
      } else
        setCursor(prev => {
          if (text.charAt(prev + 1) !== ' ') return prev + 1
          return prev + 3
        })
    }, Math.random() * 75 + 200)
  }, [cursor, active])

  const style = `text-left after:ml-px tracking-widest whitespace-pre after:animate-pulse after:border-l-2 after:border-white after:content-[''] ${
    active ? 'after:inline' : 'after:hidden'
  }`

  return (
    <p className={style}>
      {active ? text.substring(0, cursor) + text.charAt(cursor) : text}
    </p>
  )
}
