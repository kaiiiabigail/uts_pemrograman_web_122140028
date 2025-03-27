import React from 'react';
import Womanimg from '../img/woman_hero.png';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section 
      className='h-[800px] bg-no-repeat bg-cover bg-center py-24' 
      style={{ 
        background: 'linear-gradient(to bottom, #f5AAEA 0%, #fDF2FF 100%)'
        
      }}
    >
      <div className='container mx-auto flex justify-around h-full'>
        {/* text */}
        <div className='flex flex-col justify-center'>
          <div className='font-semibold flex items-center uppercase'>
            <div className='w-10 h-[2px] bg-red-500 mr-3'></div>Flash Sale
          </div>
          <h1 className='text-[70px] leading-[1.1] font-light mb-4'>
            LINAH STYLISH<br />
            <span className='font-semibold'>STORE</span>
          </h1>
          <Link 
            to={'/'} 
            className='self-start uppercase font-semibold border-b-2 border-primary'
          >
            Discover More
          </Link>
        </div>
        {/* image */}
        <div className='hidden lg:block'>
          <img src={Womanimg} alt="Woman fashion" />
        </div>
      </div>
    </section>
  );
};

export default Hero;