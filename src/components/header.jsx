import React from 'react';
import logo from '../assets/elite-properties-high-resolution-logo.svg';
import { useNavigate } from 'react-router-dom';
import { IoIosSearch } from "react-icons/io";
import { CiHeart } from "react-icons/ci";
import { CiLogin } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { IoAddCircleOutline } from "react-icons/io5";

function Header({ isLoggedIn }) {
  const navigate = useNavigate();

  const navItems = [
    {
      icon: <IoIosSearch />,
      text: "Home",
      slug: "/",
      active: !isLoggedIn,
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
      text: "Add Property",
      slug: "/property",
      active: isLoggedIn,
    },
  ];

  return (
    <div className="h-[50px] w-full shadow-xl bg-white flex items-center">
      <img className="h-[50px] w-auto mx-3" src={logo} alt="Logo" />
      <nav className="flex ml-auto mr-3">
        {navItems.map((item, index) => (
          item.active && (
            <button
              key={index}
              onClick={() => navigate(item.slug)}
              className="flex items-center mx-2 text-gray-700 hover:text-black "
            >
              {item.icon}
              <span className="ml-1">{item.text}</span>
            </button>
          )
        ))}
      </nav>
    </div>
  );
}

export default Header;
