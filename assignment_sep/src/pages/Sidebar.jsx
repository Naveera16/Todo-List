import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import  Logo from "../images/logo.png"
const Sidebar = () => {
  return (
  <>
  <div className="row">
    <div className="col-md-2 " style={{height: '200vh', backgroundColor: "wheat"}}>
       <div className="container mt-5">
        {/* LOGO */}
        <img src={Logo} className='w-100'  />
<ul className='sidebar_ul'>
    <li className='sidebar_li'>
        <Link to='/' className='sidebar_Link'>
    <i className="fa-solid fa-house sidebar_icon"></i>
        Home
        </Link>
    </li>
    <li  className='sidebar_li'>
        <Link to='/genre' className='sidebar_Link'>
    <i className="fa-solid fa-list sidebar_icon"></i>
        Genre
        </Link>
    </li>
    <li  className='sidebar_li'>
        <Link to='/todo' className='sidebar_Link'>
    <i className="fa-solid fa-square-check sidebar_icon"></i>
        Todo
        </Link>
    </li>
</ul>
       </div>
    </div>
    <div className="col-md-10">
        <Outlet/>
    </div>
  </div>
  </>
  )
}

export default Sidebar
