import React, { Fragment } from 'react'

import type { Props } from './types'
import { Image } from './image'

export const Media: React.FC<Props> = (props) => {
  const { className, htmlElement = 'div', resource } = props

  // Todo : will work on this later with hsl support
  // const isVideo = typeof resource === 'object' && resource?.mimeType?.includes('video')
  const Tag = htmlElement || Fragment

  return (
    <Tag
      {...(htmlElement !== null
        ? {
            className,
          }
        : {})}
    >
      <Image {...props} />
    </Tag>
  )
}
