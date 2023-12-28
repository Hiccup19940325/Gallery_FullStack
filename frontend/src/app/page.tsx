"use client"

import Image from 'next/image'
import backgroundImg from '@/assets/background.png'
import CreateModal from '@/components/album/createAlbum'
import AlbumCard from '@/components/album/AlbumCard'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { Suspense, useEffect } from 'react'
import useAlbum from '@/hook/useAlbum'
import Loading from './loading'
import InfiniteScroll from 'react-infinite-scroll-component'

export default function Home() {
  const { albums, more } = useSelector((state: RootState) => state.albums)
  const { initLoad, loadMore } = useAlbum()

  useEffect(() => {
    initLoad();
    console.log(backgroundImg)
  }, [initLoad])

  return (
    <>
      <div className='relative bg-cover h-[300px] sm:h-[500px] ' style={{ 'backgroundImage': `url(${backgroundImg.src})` }}  >
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
          <p className='text-white text-3xl md:text-6xl text-center'>Enjoy Amazing Images!</p>
        </div>
      </div>
      <div className='flex flex-col justify-between items-start gap-5 px-10 pt-10 py-[200px]'>
        <CreateModal />
        <Suspense fallback={<Loading />}>
          <div className='w-full'>
            <InfiniteScroll
              dataLength={albums.length}
              next={() => loadMore()}
              hasMore={more}
              loader={
                <span className="absolute left-1/2 -translate-x-1/2 loading loading-ring loading-xl w-[50px] mt-3 text-white"></span>
              }
              endMessage={<p className='text-center absolute left-1/2 -translate-x-1/2 text-white mt-3 text-3xl '>You read all posts</p>}
            >
              <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 justify-items-stretch place-items-stretch'>
                {
                  albums.map((item, i) => <AlbumCard key={i} info={item} />)
                }
              </div>
            </InfiniteScroll>
          </div>
        </Suspense>
      </div>
    </>
  )
}
