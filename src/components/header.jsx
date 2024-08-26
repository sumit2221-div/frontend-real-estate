import React, { useState } from 'react';
import logo from '../assets/elite-properties-high-resolution-logo.svg';
import { useNavigate, useLocation } from 'react-router-dom';
import { IoIosSearch } from "react-icons/io";
import { CiHeart } from "react-icons/ci";
import { CiLogin } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { IoAddCircleOutline } from "react-icons/io5";
import { HiOutlineDotsVertical } from "react-icons/hi";
import Logout from './logout.jsx';
import { useSelector } from 'react-redux';

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isLoggedIn = useSelector(state => state.auth.isLoggedIn) || localStorage.getItem('accessToken');

  const navItems = [
    {
      icon: <IoIosSearch />,
      text: "Home",
      slug: "/",
      active: true,
    },
    {
      icon: <CiHeart />,
      text: "Favorite",
      slug: "/favorite",
      active: isLoggedIn,
    },
    {
      icon: <CiLogin />,
      text: "Login",
      slug: "/login",
      active: !isLoggedIn,
    },
    {
      icon: <CgProfile />,
      text: "Profile",
      slug: "/profile",
      active: isLoggedIn,
    },
    {
      icon: <IoAddCircleOutline />,
      text: "Add new",
      slug: "/property",
      active: isLoggedIn,
    },
  ];

  return (
    <div className="h-[60px] w-full shadow-xl bg-white flex items-center justify-between">
      <img className="h-[60px] w-auto mx-3" src={logo} alt="Logo" />
      <nav className="hidden ml-auto mr-3 md:flex">
        {navItems.map((item, index) => (
          item.active && (
            <button
              key={index}
              onClick={() => navigate(item.slug)}
              className={`relative flex flex-col items-center mx-2 text-gray-700 hover:text-black group w-[70px] ${location.pathname === item.slug ? 'text-black font-bold underline' : ''}`}
            >
              <span className="text-3xl">{item.icon}</span>
              <span className="bottom-0 text-sm duration-300 left-1/2">{item.text}</span>
            </button>
          )
        ))}
        {isLoggedIn && <Logout />}
      </nav>

      {/* Mobile Menu */}
      <div className="flex items-center mr-3 md:hidden">
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-3xl text-gray-700 hover:text-black">
          <HiOutlineDotsVertical />
        </button>
        {isMenuOpen && (
          <div className="absolute top-[60px] right-3 bg-white shadow-md rounded-lg p-2 z-10">
            {navItems.map((item, index) => (
              item.active && (
                <button
                  key={index}
                  onClick={() => {
                    navigate(item.slug);
                    setIsMenuOpen(false);
                  }}
                  className={`flex items-center p-2 text-gray-700 hover:text-black hover:bg-gray-100 w-full text-left ${location.pathname === item.slug ? 'text-black font-bold' : ''}`}
                >
                  <span className="mr-2 text-xl">{item.icon}</span>
                  <span className="text-base">{item.text}</span>
                </button>
              )
            ))}
            {isLoggedIn && (
              <div className="mt-2">
                <Logout />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
