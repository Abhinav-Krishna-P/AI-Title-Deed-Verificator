import React from 'react'
import Button from 'react-bootstrap/Button';
import logo from "../../../public/assets/logo.png"
const Header = () => {
  return (
    <div className='w-screen h-[70px] border-[0.1px] border-black/14 flex items-center justify-between p-4'>
        <img src={logo} className='h-[34px] '></img>
        <div className='flex items-center justify-center gap-5'>
        <a href='https://titlewize.com/feedback' target='_blank'><button className='bg-none text-black/60 h-[46px] w-[100px] rounded hover:bg-black/5'>Feedback</button></a>
          <Button variant="primary" className='h-[45px] hover:text-blue-50'>Login/Signup</Button>
          </div>
    </div>
  )
}

export default Header