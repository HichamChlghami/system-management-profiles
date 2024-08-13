import React from 'react'
import { FaFacebook ,FaTwitter,FaInstagram ,FaYoutube} from 'react-icons/fa';
import Link from 'next/link';
import './footer.css'
function Footer() {

  return (
    <footer  className='footer'>
        <div className='footer_container'>

        <div className='footer_image_container'>
            <Link href='/'>
    <img src='/sitfile_logo1.png' className='footer_img' alt='blog_logo'/>
    </Link>
</div>

<ul className='footer_sections_container'>
        <h2 className='footer_sections-title'>Compressor</h2>
        
        <Link className='footer_section'href='https://sitfile.com/compress-image'><li className='footer_section1'>image compressor</li></Link>
        <Link className='footer_section' href='https://sitfile.com/compress-pdf'><li className='footer_section1' > pdf compressor </li></Link>
        <Link className='footer_section' href='https://sitfile.com/compress-video'><li className='footer_section1'> video compressor </li></Link>
        <Link className='footer_section' href='https://sitfile.com/compress-audio'><li className='footer_section1'> audio compressor </li></Link>
      
</ul>


 <ul className='footer_sections_container'>
        <h2 className='footer_sections-title'>Video Converter</h2>

        <Link className='footer_section'href='https://sitfile.com/video/mov-mp4'><li className='footer_section1'>mov to mp4</li></Link>
        <Link className='footer_section' href='https://sitfile.com/video/mp4-mp3'><li className='footer_section1' >mp4 to mp3</li></Link>
        <Link className='footer_section' href='https://sitfile.com/video/video-audio'><li className='footer_section1'>video to audio</li></Link>
        <Link className='footer_section' href='https://sitfile.com/video/video-gif'><li className='footer_section1'>video to gif</li></Link>
        <Link className='footer_section' href='https://sitfile.com/video/webm-mp4'><li className='footer_section1'>webm to mp4</li></Link>
        <Link className='footer_section' href='https://sitfile.com/video'><li className='footer_section1'>Video Converter</li></Link>


</ul>
    



<ul className='footer_sections_container'>
        <h2 className='footer_sections-title'>Audio Converter</h2>

        <Link className='footer_section'href='https://sitfile.com/audio/acc-mp3'><li className='footer_section1'>acc to mp3</li></Link>
        <Link className='footer_section' href='https://sitfile.com/audio/aiff-mp3'><li className='footer_section1' >aiff to mp3</li></Link>
        <Link className='footer_section' href='https://sitfile.com/audio/alac-mp3'><li className='footer_section1'>alac to mp3</li></Link>
        <Link className='footer_section' href='https://sitfile.com/audio/ogg-mp3'><li className='footer_section1'>ogg to mp3</li></Link>
        <Link className='footer_section' href='https://sitfile.com/audio/wav-mp3'><li className='footer_section1'>wav to mp3</li></Link>
        <Link className='footer_section' href='https://sitfile.com/audio'><li className='footer_section1'>Audio Converter</li></Link>


</ul>



<ul className='footer_sections_container'>
        <h2 className='footer_sections-title'>Image Converter</h2>

        <Link className='footer_section'href='https://sitfile.com/image/jpg-excel'><li className='footer_section1'>jpg to excel</li></Link>
        <Link className='footer_section' href='https://sitfile.com/image/jpg-pdf'><li className='footer_section1' >jpg to pdf</li></Link>
        <Link className='footer_section' href='https://sitfile.com/image/png-svg'><li className='footer_section1'>png to svg</li></Link>
        <Link className='footer_section' href='https://sitfile.com/image/svg-ico'><li className='footer_section1'>ogg to mp3</li></Link>
        <Link className='footer_section' href='https://sitfile.com/image/webp-jpg'><li className='footer_section1'>webp to jpg</li></Link>
        <Link className='footer_section' href='https://sitfile.com/image/webp-svg'><li className='footer_section1'>webp to svg</li></Link>

        <Link className='footer_section' href='https://sitfile.com/image'><li className='footer_section1'>Image Converter</li></Link>


</ul>
    






<ul className='footer_sections_container'>
        <h2 className='footer_sections-title'>Document Converter</h2>

        <Link className='footer_section'href='https://sitfile.com/document/epub-pdf'><li className='footer_section1'>epub to pdf</li></Link>
        <Link className='footer_section' href='https://sitfile.com/document/excel-pdf'><li className='footer_section1' >excel to pdf</li></Link>
        <Link className='footer_section' href='https://sitfile.com/document/pdf-excel'><li className='footer_section1'>pdf to excel</li></Link>
        <Link className='footer_section' href='https://sitfile.com/document/pdf-word'><li className='footer_section1'>pdf to word</li></Link>
        <Link className='footer_section' href='https://sitfile.com/document/word-pdf'><li className='footer_section1'>word to pdf</li></Link>

        <Link className='footer_section' href='https://sitfile.com/document'><li className='footer_section1'>Document Converter</li></Link>


</ul>
    









        </div>



            
    <div className="footer-icons">
        <p className='all_Rights'>
        "Copyright © 2024 sitfile.com. All rights reserved."
        </p>
            </div>


  </footer>
  )
}

export default Footer