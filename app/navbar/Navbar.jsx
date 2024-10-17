


"use client"
import Link from 'next/link';
import React, { useState  , useEffect , useContext} from 'react';
import { FaAngleDown, FaAngleUp  } from 'react-icons/fa';
import Phone from './phone';
import './Navbar.css'
import { Context } from '../context/context';
function Navbar() {
const {  name ,  dispatch} = useContext(Context);


const logout = ()=>{
  dispatch({ type: "LOGOUT_SUCCESS_USER" });
  window.location.href = '/logIn';


}
  const [showConvert , setShowConvert] = useState(false)
  const handleConvertClick  = ()  =>{
    setShowConvert(!showConvert)
  }


 



  const [showCompress , setShowCompress] = useState(false)
  const handleCompresstClick  = ()  =>{
    setShowCompress(!showCompress)
  }




  const [showUser , setShowUser] = useState(false)
  const handleUsertClick  = ()  =>{
    setShowUser(!showUser)
  }






const handleClickOutside  = (event) =>{
  if(!event.target.closest('.convert_container')){
    setShowConvert(false)

  }


  if(!event.target.closest('.compress_container')){
    setShowCompress(false)


  }
  if(!event.target.closest('.user_css')){
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
    <>
    <div className='navbar'>
      <div className='navbar_container'>
        <Link href='/' className="image_container">
          <img src='/sitfile.svg' alt='sitfile_logo' className='navbar_image'/>
        </Link>
      

        <div className="link_container">
         

          <div className="convert_container">

            <div className='convert_p' onClick={handleConvertClick}>
            <p className='convert_p_p'>Convert</p> 
            {
              showConvert ? (
           <FaAngleUp    className='convert_ico_show'/>


              ):(
           <FaAngleDown   className='convert_ico'/>

              )
            }
            </div>
            {
              showConvert && (
                <ul className='convert_container-links'>
             

              <Link href='https://sitfile.com/image' className='navbar_url '>Image Converter</Link>
        <Link href='https://sitfile.com/document' className='navbar_url '>Document Converter</Link>
        <Link href='https://sitfile.com/document' className='navbar_url '>PDF Converter</Link>
        <Link href='https://sitfile.com/video' className='navbar_url '>Video Converter</Link>
        <Link href='https://sitfile.com/audio' className='navbar_url '>Audio Converter</Link>







            </ul>
              )
            }
            
          </div>








          <div className="compress_container">
            <div className='convert_p' onClick={handleCompresstClick}>
            <p className='convert_p_p'>Compress</p> 
            {
              showCompress ? (
           <FaAngleUp className='convert_ico_show'/>

              ):(
           <FaAngleDown className='convert_ico'/>

              )
            }
            </div>
            {
              showCompress && (
                <ul className='compress_container-links'>
          
              <Link href='https://sitfile.com/compress-image' className='navbar_url'>Image Compressor</Link>
        <Link href='https://sitfile.com/compress-pdf' className='navbar_url'>PDF Compressor</Link>
        <Link href='https://sitfile.com/compress-video' className='navbar_url'>Video Compressor</Link>
        <Link href='https://sitfile.com/compress-audio' className='navbar_url'>Audio Compressor</Link>




            </ul>
              )
            }
            
          </div>

          <Link href='/pricing' className='remove_btn'>Pricing</Link>




        </div>
{
  name ? (
    <div className=" user_css">
    <div className='user_p' onClick={handleUsertClick}>
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
        <ul className='user_container-links'>
  
      <div className='navbar_url user_logout' onClick={()=>{logout()}}>Log out</div>
<Link href='/dashboard' className='navbar_url'>Dashboard</Link>





    </ul>
      )
    }
    
  </div>
  ):(
    <div className="register_container">
    <Link   href='/logIn' className='login'>LogIn</Link>
    <Link     href='/sginUp' className='signup'>Sign Up</Link>

  </div>
  )
}

      




      </div>


    </div>

    <Phone/>
    </>
    
  )
}

export default Navbar



