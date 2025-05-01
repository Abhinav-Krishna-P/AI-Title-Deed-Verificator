import React from 'react'
import logo from '../../public/assets/back_main.jpg'
import tick from '../../public/assets/verified.png'
import { Link } from 'react-router-dom';
import  { useEffect, useState } from 'react';

const Langingpage = () => {

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Trigger fade-in after component mounts
    setTimeout(() => setVisible(true), 150); // delay to ensure transition happens
  }, []);

  const fadeInStyle = {
    opacity: visible ? 1 : 0,
    transition: 'opacity 1s ease-in'
  };

  return (
   <>
   <div className=' w-screen h-[92.6vh] flex' >
        <div className=' w-[50vw] mt-4' style={fadeInStyle}>
      <div className=' h-[90vh] flex flex-col  pt-5  '>
        <p className='text-[47px] font-bold text-left font-sans p-4  h-[170px] tracking-wide '>
              <span className='text-[55px] text-[red]/80'>AI</span> Assisted , Blazing fast legal due dilligence for B2B expansion.
        </p>
        <div className='flex flex-col items-start gap-5.5 p-4  '>
            <span className='tracking-wider font-light text-[20px]'>"Empowering Real Estate with Verified Insights"</span>  
              <button className='w-[200px] h-[50px]  rounded flex items-center justify-center gap-3 font-bold tracking-wide border'><img src={tick} className='w-7 h-7' ></img>Lawyer Verified  </button>
            </div>
            <div className=' h-[250px] flex items-center gap-[40px] mt-5 p-4 '>
              <a href='https://titlewize.com/'> <button className='border h-[60px] rounded-1 w-[200px] bg-[#e6a249] text-[white] text-lg hover:text-black hover:bg-white hover:border   '>Getting Started</button></a>
              <Link to='/verification'> <button className='border h-[60px] rounded-1 w-[200px] bg-[#e6a249] text-[white] text-lg hover:text-black hover:bg-white hover:border'>Title Deed Verification</button></Link>
            </div>
          </div>
    </div >
    <div className='w-[50vw]  h-full  flex items-center justify-center'>
    <img className=' h-[70vh] w-[90vw] mb-5 '  src={logo}></img>
    </div>
   </div>
   </>
  )
}

export default Langingpage