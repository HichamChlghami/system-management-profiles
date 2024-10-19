"use client"
import Link from 'next/link';
import React, { useState  , useEffect,useContext} from 'react';
import { FaAngleDown, FaAngleUp  } from 'react-icons/fa';
import { RiCloseLine, RiMenu3Line } from 'react-icons/ri';
import './phone.css'
import'./Navbar.css'
import { Context } from '../context/context';
function Phone() {
  const {  name , dispatch} = useContext(Context);




  const logoutPhone = ()=>{
    dispatch({ type: "LOGOUT_SUCCESS_USER" });
    window.location.href = '/logIn';
  
  
  }



    const [showConvert1 , setShowConvert1] = useState(false)
    const handleConvertClick1  = ()  =>{
      setShowConvert1(!showConvert1)
    }
    const [showUser , setShowUser] = useState(false)
    const handleUsertClick1  = ()  =>{
      setShowUser(!showUser)
    }
  

    const [showCompress1 , setShowCompress1] = useState(false)
    const handleCompresstClick1  = ()  =>{
      setShowCompress1(!showCompress1)
    }
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
      setIsOpen(!isOpen);
    };  






    const handleClickOutside  = (event) =>{
    
      if(!event.target.closest('.user_css_phone')){
        setShowUser(false)
      }
    
      
    }
    
      useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
          document.removeEventListener('click', handleClickOutside);
        };
      }, []);
    








  return (
    <div className='ok_phone'>
     <div className='phone'>

        

<div className='navbar_container_phone'>
<Link href='/' className="image_container_phone">
    <img src='/sitfile.svg' alt='logo' className='navbar_image_phone'/>
  </Link>




<div className={`menu-bar ${isOpen ? 'open' : ''}`}>
<button className="menu-btn" onClick={toggleMenu}>
  {isOpen ? <RiCloseLine /> : <RiMenu3Line />}
</button>
    
</div>

</div>


</div>
{
    isOpen && (
        <div className='navbar_phone_content'>
{
  name ? (
    <div className="user_css_phone">
    <div className='user_p' onClick={handleUsertClick1}>
    <p className='user_p_p'>{name}</p> 
    {
      showUser ? (
   <FaAngleUp className='convert_ico_show'/>

      ):(
   <FaAngleDown className='convert_ico'/>

      )
    }
    </div>
    {
      showUser && (
        <ul className='user_container-links_phone'>
  
      <div className='navbar_url user_logout' onClick={()=>{logoutPhone()}}>Log out</div>
<Link href='/dashboard' className='navbar_url'>Dashboard</Link>





    </ul>
      )
    }
    
  </div>
  ):(
    <div className="register_container_phone">
    <Link   href='https://sitfile.com/logIn' className='login'>LogIn</Link>
    <Link     href='https://sitfile.com/sginUp' className='signup'>Sign Up</Link>

  </div>
  )
}


<div className="link_container_phone">
<div className="convert_container_phone">
<Link href='https://sitfile.com/pricing' className='remove_btn_phone'>Pricing</Link>

      <div className='convert_p_phone' onClick={handleConvertClick1}>
      <p className='convert_p_p_phone'>Convert</p> 
      {
        showConvert1 ? (
     <FaAngleUp className='convert_ico_show_phone'/>

        ):(
     <FaAngleDown className='convert_ico_phone'/>

        )
      }
      </div>
      {
        showConvert1 && (
          <ul className='convert_container-links_phone'>
        <Link href='https://sitfile.com/image' className='phone_url '>Image Converter</Link>
        <Link href='https://sitfile.com/document' className='phone_url '>Document Converter</Link>
        <Link href='https://sitfile.com/document' className='phone_url '>PDF Converter</Link>
        <Link href='https://sitfile.com/video' className='phone_url '>Video Converter</Link>
        <Link href='https://sitfile.com/audio' className='phone_url '>Audio Converter</Link>

      </ul>
        )
      }
      
    </div>



    <div className="convert_container_phone">
      <div className='convert_p_phone' onClick={handleCompresstClick1}>
      <p className='convert_p_p_phone'>Compress</p> 
      {
        showCompress1 ? (
     <FaAngleUp className='convert_ico_show_phone'/>

        ):(
     <FaAngleDown className='convert_ico_phone'/>

        )
      }
      </div>
      {
        showCompress1 && (
          <ul className='convert_container-links_phone'>
        <Link href='https://sitfile.com/compress-image' className='phone_url'>Image Compressor</Link>
        <Link href='https://sitfile.com/compress-pdf' className='phone_url'>PDF Compressor</Link>
        <Link href='https://sitfile.com/compress-video' className='phone_url'>Video Compressor</Link>
        <Link href='https://sitfile.com/compress-audio' className='phone_url'>Audio Compressor</Link>

      </ul>
        )
      }
      
    </div>

    
</div>





</div>
    )
}


    </div>
   
  )
}

export default Phone