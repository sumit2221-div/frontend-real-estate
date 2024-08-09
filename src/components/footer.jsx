import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="py-8 text-white bg-gray-800">
      <div className="container px-6 mx-auto">
        <div className="flex flex-wrap justify-between">
          {/* Logo Section */}
          <div className="w-full mb-6 md:w-1/4 md:mb-0">
            <h2 className="mb-4 text-xl ">Elite properties</h2>
            <p className="text-gray-400">© {new Date().getFullYear()} elite prperties. All rights reserved.</p>
          </div>

          {/* Navigation Links */}
          <div className="w-full mb-6 md:w-1/4 md:mb-0">
            <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
            <ul>
              <li><a href="#home" className="hover:text-gray-400">Home</a></li>
              <li><a href="#about" className="hover:text-gray-400">About Us</a></li>
              <li><a href="#services" className="hover:text-gray-400">Services</a></li>
              <li><a href="#contact" className="hover:text-gray-400">Contact</a></li>
            </ul>
          </div>

          {/* Social Media Icons */}
          <div className="w-full mb-6 md:w-1/4 md:mb-0">
            <h3 className="mb-4 text-lg font-semibold">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="text-gray-400 hover:text-white"><FaFacebook size={24} /></a>
              <a href="https://twitter.com" className="text-gray-400 hover:text-white"><FaTwitter size={24} /></a>
              <a href="https://instagram.com" className="text-gray-400 hover:text-white"><FaInstagram size={24} /></a>
              <a href="https://linkedin.com" className="text-gray-400 hover:text-white"><FaLinkedin size={24} /></a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="w-full md:w-1/4">
            <h3 className="mb-4 text-lg font-semibold">Contact Us</h3>
            <p className="text-gray-400">123 Main Street, City, Country</p>
            <p className="text-gray-400">Phone: (123) 456-7890</p>
            <p className="text-gray-400">Email: info@company.com</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
