import Image from 'next/image'
import React, { FC, ReactNode } from 'react'
import { IArtis } from '../../utils'
import { motion } from 'framer-motion'
import { MdDelete } from 'react-icons/md'


interface IProps{
    artist:IArtis,
    children?:ReactNode
}

const ArtistCard:FC<IProps> = ({ artist, children }) => {
  return (
    <>
      <div className="shadow-lg rounded-lg p-8 w-[100%] sm:w-[50%] md:w-[30%] lg:w-[15%] text-center relative">
      <Image
        src={artist.imageUrl}
        width={120}
        height={120}
        className="object-cover"
        alt="Razu islam"
      />
      <span className="text block">{artist.name}</span>
      {children}
      <motion.div
        whileTap={{ scale: 0.75 }}
        className="absolute cursor-pointer left-4 bottom-4 w-8 h-8 rounded-md flex items-center justify-center bg-gray-200"
      >
        <MdDelete className="text-xl text-red-400 hover:text-red-500" />
      </motion.div>
    </div>
    </>
  )
}

export default ArtistCard