import { Skeleton } from '@mui/material'
import { twMerge } from 'tailwind-merge'
import Link from 'next/link'
import Image from 'next/image'

const PortfolioCard = ({ entry, ...props }) => {
  const twStyle = twMerge(
    'w-full overflow-hidden rounded-xl shrink-0 bg-teal-700/70',
    props.className
  )
  return (
    <div className={twStyle}>
      {!entry && (
        <Skeleton
          variant="rect"
          className="relative aspect-video select-none rounded-lg pt-2"
          animation="wave"
          width="100%"
          height="100%"
        />
      )}
      {entry && (
        <div className="group relative aspect-video cursor-pointer select-none rounded-lg pt-2">
          <Link href={`/portfolio/${entry._id}`}>
            <h3 className="relative m-4 truncate p-0 text-lg font-bold text-stone-200 after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-bottom-right after:scale-x-0 after:rounded-sm after:bg-stone-200 after:transition-transform after:content-[''] group-hover:after:origin-bottom-left group-hover:after:scale-x-100 sm:text-lg md:text-base lg:text-lg">
              {entry.name}
            </h3>
            <div className="relative aspect-video w-full overflow-hidden">
              <Image
                src={entry.thumbnail}
                fill
                alt={`Screenshot for ${entry.name}`}
                className="object-cover"
              />
            </div>
            <div className="absolute inset-x-0 -bottom-1 flex h-1/3 origin-bottom items-center justify-center bg-black/80 pb-1 transition-all duration-300 ease-in-out group-hover:scale-100 group-hover:opacity-100 sm:scale-y-0 sm:opacity-0">
              <p className="truncate text-sm font-normal text-stone-200">
                {entry.summary}
              </p>
            </div>
          </Link>
        </div>
      )}
    </div>
  )
}

export default PortfolioCard
