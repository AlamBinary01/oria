import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import backgroundImage from '../assets/Background.jpg';
import Services from '../components/Services';

function Home() {
  const [email, setEmail] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const scrollToSection = (sectionId) => {
    const section = document.querySelector(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <Navbar />
      <div className='md:px-10 bg-gradient-to-t from-yellow-600 to-green-800 text-white w-full h-screen flex flex-col justify-center items-center' style={{ backgroundImage: `url(${backgroundImage})` }}>
        <h1 className='text-4xl md:text-6xl text-center mt-8 font-bold'>
          Your AI Assistant to
          <br className='hidden md:block' />
          <span className="font-bold">Launch Your StartUp</span>
        </h1>
        <div className='mt-4 flex items-center'>
          <input
            type='email'
            placeholder='Enter your email'
            value={email}
            onChange={handleEmailChange}
            className='border p-2 rounded text-black w-96 focus:outline-none placeholder-gray-400 mr-2 font-bold'
          />


          <button onClick={() => alert('Early access granted!')} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
            Get Early Access
          </button>
        </div>
        <div className='mt-6 flex flex-col'>
          <p className='text-white-900 font-bold'>Click Below to Get Started</p>
          <Link to="/Login" onClick={() => scrollToSection('#services')}>
            <button className='flex items-center mt-3 w-full sm:w-80 h-18 md:h-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
              GO <span className='mt-1 ml-1 group-hover:animate-pulse group-hover:ml-5 duration-300'><FaArrowRight /></span>
            </button>
          </Link>
        </div>
      </div>

      <div id='services'>
        <Services />
      </div>
      <Footer />
    </>
  );
}

export default Home;
