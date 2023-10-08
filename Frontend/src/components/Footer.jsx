import React from 'react';
import { FaTwitter, FaFacebook, FaInstagram } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import oria1 from "../assets/oria1.png";
const Footer = () => {
  return (
    <footer className="bg-blue-800 py-10">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <Link to='/' className="flex items-center">
              <img src={oria1} className="h-20 mr-3" alt="ORIA" />
            </Link>


          </div>
          <div className="flex text-white mt-4 space-x-5 sm:justify-center sm:mt-0">
            <a href="facebook.com" target='_blank' rel='noreferrer' className="hover:text-blue-500 duration-300">
              <FaFacebook className="w-8 h-8" />
              <span className="sr-only">Facebook page</span>
            </a>

            <a href="https://www.twitter.com" target='_blank' rel='noreferrer' className="hover:text-blue-300 duration-300">
              <FaTwitter className="w-8 h-8" />
              <span className="sr-only">Twitter page</span>
            </a>


            <a href="https://www.instagram.com" target='_blank' rel='noreferrer' className="hover:text-pink-500 duration-300">
              <FaInstagram className="w-8 h-8" />
              <span className="sr-only">Instagram account</span>
            </a>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto d lg:my-8" />
        <div className="text-gray-300 flex flex-col items-center justify-center sm:flex-row sm:justify-between">


          <div className="text-gray-300 flex items-center justify-center mt-4 sm:mt-0">
            <Link to={'/terms-and-condition'} className="hover:underline">Terms</Link>
            <Link to={'/privacy-policy'} className="mx-4 hover:underline">Privacy</Link>
            <Link to={'/terms-and-condition'} className="hover:underline">FAQS</Link>
            <Link to={'/privacy-policy'} className="mx-4 hover:underline">Contact</Link>
            <span className="text-sm"> Oria &copy; 2023 <Link to="/" className="hover:underline"></Link>. All Rights Reserved.</span>
          </div>
        </div>
      </div>
    </footer>

  );
};

export default Footer;
