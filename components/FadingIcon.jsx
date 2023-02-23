const FadingIcon = ({ icons }) => {
  const fadingTime = Math.floor(Math.random() * 10) + 4

  return (
    <div className="relative h-6">
      <i
        className={`${icons[0]} absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl text-violet-400`}
        style={{
          animation: `fade-in ${fadingTime}s alternate infinite ease-in-out`
        }}
      />
      <i
        className={`${icons[1]} absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse text-2xl text-violet-400`}
        style={{
          animationDelay: `${fadingTime}s`,
          animation: `fade-in ${fadingTime}s alternate-reverse infinite ease-in-out`
        }}
      />
    </div>
  )
}

export default FadingIcon
