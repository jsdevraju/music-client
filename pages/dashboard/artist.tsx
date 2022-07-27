import React from 'react'
import DashboardNavbar from '../../app/Components/DashboardNavbar/DashboardNavbar'
import { motion } from 'framer-motion'
import ArtistCard from '../../app/Components/ArtistCard'


const data = {
  _id:"1",
  name: 'Artist',
  imageUrl: "https://randomuser.me/api/portraits/men/88.jpg"
}

const Artist = () => {
  return (
    <>
     <section className="sec_p">
        <div className="container mx-auto">
          <DashboardNavbar />
          {/* Render Music List */}
          <div className="mt-10 w-full flex flex-col items-start justify-start p-4 border border-gray-300 rounded-md gap-3">
            <p className="text-xl font-bold">
              <span className="text-sm font-semibold text-left mr-2">
                Count :
              </span>
              2
            </p>
            <motion.div
            className="flex justify-between items-center mt-[3em] flex-wrap w-full"
            initial={{ opacity: 0, translateX: -50 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <ArtistCard artist={data} />
            <ArtistCard artist={data} />
            <ArtistCard artist={data} />
            <ArtistCard artist={data} />
            <ArtistCard artist={data} />
          </motion.div>

          </div>
        </div>
      </section>
    </>
  )
}

export default Artist