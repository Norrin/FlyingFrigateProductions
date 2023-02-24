import React, { useState } from 'react'
import { Link } from "react-router-dom";
import fflogo from '../assets/fflogo.svg'


const Navbar = () => {
  const [isVisable, setVisable] = useState(false);
  const handleMenuClick = () => setVisable((prev) => !prev);

  return (
    <nav className="w-screen h-[60px] z-10 bg-black opacity-100 fixed drop-shadow-lg">
      <div className="flex justify-between items-center w-full h-full px-2 pr-8">
        <div data-name="brand" className="text-3xl font-bold mr-4 sm:text-4xl">
          <Link to="/">
            <div className="flex items-center">
              <img src={fflogo} className="h-8" />
              <span className="text-white font-semibold">Printworks</span>
            </div>
          </Link>
        </div>
        <div>
          <ul className="hidden sm:flex text-white">
            <li><Link to="/Gallery">Gallery</Link></li>
            <li><Link to="/Blog">Blog</Link></li>
            <li><Link to="/About">About</Link></li>
          </ul>
        </div>
        <div className="flex sm:hidden pointer" onClick={handleMenuClick}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-white">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
          </svg>
        </div>
      </div>
      <div>
        {isVisable && (
          <ul className="absolute bg-black opacity-60 w-full px-8 pb-2">
            <li className="w-full text-white"><Link to="/">Home</Link></li>
            <li className="w-full text-white"><Link to="/Gallery">Gallery</Link></li>
            <li className="w-full text-white"><Link to="/Blog">Blog</Link></li>
            <li className="w-full text-white"><Link to="/About">About</Link></li>
          </ul>
        )}

      </div>
    </nav>
  )
}









export default Navbar
