import { StaticImageData } from 'next/image'
import { Media } from '../media-image'
import coverImage from '../../../public/cover.png'

export const HerosHolder = () => {
  const url: StaticImageData = coverImage

  return (
    <div
      className="relative -mt-[10.4rem] flex items-center justify-center text-white"
      data-theme="dark"
    >
      <h2>2355-colendrum</h2>

      <div className="min-h-[60vh] select-none">
        <Media fill imgClassName="-z-10 object-cover" priority src={url} />
      </div>
    </div>
  )
}
