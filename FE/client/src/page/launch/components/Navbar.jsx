import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import Didnow from "img/didnow-icon.png";

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div className="flex justify-between items-center  mx-auto px-5 text-white">
      {/* <h1 className="w-full text-3xl font-bold text-[#0efcfe]">REACT.</h1> */}
      <img className="w-[43px] my-4" src={Didnow} alt="/" />
      <ul className="hidden md:flex">
        {/* <li className="p-4">Home</li>
        <li className="p-4">Company</li>
        <li className="p-4">Resources</li>
        <li className="p-4">About</li>
        <li className="p-4">Contact</li> */}
      </ul>
      <div onClick={handleNav} className="block p-4">
        {nav ? <AiOutlineClose size={30} /> : <AiOutlineMenu size={30} />}
      </div>
      <ul
        className={
          nav
            ? "fixed left-0 top-0 w-[30%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500"
            : "ease-in-out duration-500 fixed left-[-100%]"
        }
      >
        <h1 className="w-full text-3xl font-bold text-[#0efcfe] m-4">DIDNOW</h1>
        <li className="p-4 border-b border-gray-600">Home</li>
        <li className="p-4 border-b border-gray-600">Company</li>
        <li className="p-4 border-b border-gray-600">Resources</li>
        <li className="p-4 border-b border-gray-600">About</li>
        <li className="p-4">Contact</li>
      </ul>
    </div>
  );
};

export default Navbar;
