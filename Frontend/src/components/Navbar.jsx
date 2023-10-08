import React, { useState } from 'react';
// import logo from "../assets/logo.png";
import oria1 from "../assets/oria1.png"
import { Link } from 'react-router-dom';


const Navbar = () => {




  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };


  const userRole = localStorage.getItem('role');
  const token = localStorage.getItem('token');

 

  return (
    <nav className=" bg-blue-800  shadow-sm">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center">
          <img src={oria1} className="h-20 mr-3" alt="ORIA" />
        </Link>
        <button
          onClick={handleMobileMenuToggle}
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-gray-200"
        >
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5 text-white " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </button>
        <div className={`w-full md:w-auto md:flex md:items-center ${isMobileMenuOpen ? 'block' : 'hidden'}`} id="navbar-default">
          <ul className=" text-white font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-5 md:mt-0 md:border-0 ">
            {
              token ? (
                <>

                  {
                    userRole === 'admin' ?
                      (
                        <>
                         
                          <li>
                            <Link to="/" className="bg-blue-600  block py-2 pl-3 pr-4 hover:bg-indigo-900 rounded md:px-3 md:py-2 md:p-0  " >Join Free</Link>

                          </li>
                        

                        </>
                      ) : (
                        <>
                          <li>
                            <Link to="/services" className=" block py-2 pl-3 pr-4 hover:bg-indigo-900 rounded md:px-3 md:py-2 md:p-0 " >Services</Link>

                          </li>
                          <li>
                            <Link to="/" className=" bg-blue-600 block py-2 pl-3 pr-4 hover:bg-indigo-900 rounded md:px-3 md:py-2 md:p-0 " >Join FREE</Link>

                          </li>
                         


                        </>
                      )}
                
                </>

              ) : (
                <>
                  <li>
                    <Link to="/" className="bg-blue-600 block py-2 pl-3 pr-4 hover:bg-indigo-900 rounded md:px-3 md:py-2 md:p-0 " >Join Free</Link>

                  </li>
                 
            
              
                
                
                </>
              )
            }


          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
