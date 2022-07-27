import Image from 'next/image'
import React, { FC, ReactNode } from 'react'
import { IArtis } from '../../utils'


interface IProps{
    artist:IArtis,
    children?:ReactNode
}

const ArtistCard:FC<IProps> = ({ artist, children }) => {
  return (
    <>
      <div className="shadow-lg rounded-lg p-8 w-[100%] sm:w-[50%] md:w-[30%] lg:w-[15%] text-center">
      <Image
        src={artist.imageUrl}
        width={120}
        height={120}
        className="object-cover"
        alt="Razu islam"
      />
      <span className="text">{artist.name}</span>
      {children}
    </div>
    </>
  )
}

export default ArtistCard