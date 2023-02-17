import { Skeleton } from '@mui/material'
import { twMerge } from 'tailwind-merge'
import Link from 'next/link'
import Image from 'next/image'

const PortfolioCard = ({ entry, ...props }) => {
  const twStyle = twMerge('w-full overflow-hidden rounded-xl', props.className)
  return (
    <div className={twStyle}>
      {!entry && (
        <Skeleton
          variant="rect"
          className="w-full max-w-lg grow"
          animation="wave"
          width="100%"
          height="500px"
        />
      )}
      {entry && (
        <div className="group relative aspect-video w-full cursor-pointer select-none rounded-lg shadow-black/75 hover:shadow-md">
          <Link href={`/portfolio/${entry._id}`}>
            <h3 className="relative m-4 p-0 text-lg font-bold text-stone-200 after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-bottom-right after:scale-x-0 after:rounded-sm after:bg-stone-200 after:transition-transform after:content-[''] group-hover:after:origin-bottom-left group-hover:after:scale-x-100">
              {entry.name}
            </h3>
            <div className="relative aspect-video w-full">
              <Image
                src={entry.thumbnail}
                fill
                alt={`Screenshot for ${entry.name}`}
              />
            </div>
            <div className="absolute inset-x-0 bottom-0 h-1/3 origin-bottom scale-y-0 bg-black/80 p-6 opacity-0 transition-all group-hover:scale-100 group-hover:opacity-100">
              <p className="text-stone-200">{entry.summary}</p>
            </div>
          </Link>
        </div>
      )}
    </div>
  )
}

export default PortfolioCard
