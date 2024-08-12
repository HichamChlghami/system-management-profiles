"use client"
import Link from 'next/link';
import React, { useState  , useEffect} from 'react';
import { FaAngleDown, FaAngleUp  } from 'react-icons/fa';
import { RiCloseLine, RiMenu3Line } from 'react-icons/ri';
import './phone.css'
function Phone() {

    const [showConvert1 , setShowConvert1] = useState(false)
    const handleConvertClick1  = ()  =>{
      setShowConvert1(!showConvert1)
    }


    const [showCompress1 , setShowCompress1] = useState(false)
    const handleCompresstClick1  = ()  =>{
      setShowCompress1(!showCompress1)
    }
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
      setIsOpen(!isOpen);
    };  

  return (
    <div className='ok_phone'>
     <div className='phone'>

        

<div className='navbar_container_phone'>
<Link href='/' className="image_container_phone">
    <img src='/sitfile_logo1.png' alt='logo' className='navbar_image_phone'/>
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
<div className="register_container_phone">
    <button className='login_phone'>LogIn</button>
    <button className='signup_phone'>Sign Up</button>
</div>

<div className="link_container_phone">
<div className="convert_container_phone">
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
        <Link href='https://sitfile.com/image.html' className='phone_url '>Image Converter</Link>
        <Link href='https://sitfile.com/document.html' className='phone_url '>Document Converter</Link>
        <Link href='https://sitfile.com/document.html' className='phone_url '>PDF Converter</Link>
        <Link href='https://sitfile.com/video.html' className='phone_url '>Video Converter</Link>
        <Link href='https://sitfile.com/audio.html' className='phone_url '>Audio Converter</Link>

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
        <Link href='https://sitfile.com/compress-image.html' className='phone_url'>Image Compressor</Link>
        <Link href='https://sitfile.com/compress-pdf.html' className='phone_url'>PDF Compressor</Link>
        <Link href='https://sitfile.com/compress-video.html' className='phone_url'>Video Compressor</Link>
        <Link href='https://sitfile.com/compress-audio.html' className='phone_url'>Audio Compressor</Link>

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