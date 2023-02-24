import React from 'react'
import BrookCagleBG1 from '../assets/BrookCagleBG1.jpg'

const Home = () => {
  return (
    <div className="w-full h-[1200px] bg-blue-gradient  text-white">
      <div>
        <img src={BrookCagleBG1} className="hero-image-mask bg-no-repeat bg-auto w-auto" />
      </div>
    </div>
  )
}

export default Home