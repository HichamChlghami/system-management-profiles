"use client"


import React, { useState, useEffect  } from 'react';
import axios from 'axios';
// import { AiOutlineCloseCircle } from 'react-icons/ai';
import { FaFolder  } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';

import { BsFillLockFill } from 'react-icons/bs';
import { FaPlus } from 'react-icons/fa';
import { BiDownload } from 'react-icons/bi';

import Footer from '../footer/footer';
import Navbar from '../navbar/Navbar';
import {  Downloadall } from '../components';
import './remove.css'
function App() {

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  
    // this for show alert 

const [isOnline, setIsOnline] = useState(navigator.onLine);
const [showAlert, setShowAlert] = useState(false);

useEffect(() => {
  const updateOnlineStatus = () => {
    setIsOnline(navigator.onLine);
    setShowAlert(true);
    if (navigator.onLine) {
      setTimeout(() => setShowAlert(false), 5000);
    }
  };

  window.addEventListener('online', updateOnlineStatus);
  window.addEventListener('offline', updateOnlineStatus);

  return () => {
    window.removeEventListener('online', updateOnlineStatus);
    window.removeEventListener('offline', updateOnlineStatus);
  };
}, []);
const handleDismiss = () => {
  setShowAlert(false);
};
// end for show alert

  const [files, setSelectedFiles] = useState([]);
  const [newfiles, setNewFiles] = useState([]);

  const [convert, setConvert] = useState([]);
  const [type, setType] = useState([]);

  const [totalConversionProgress, setTotalConversionProgress] = useState({});




const [downloadAll, setDownloadAll] = useState();
const [downloadValidation , setDownloadValidation]=useState(true)
 
const [downloadOne , setDownloadOne] = useState(false)
const [checkHandleFile , setCheckHandleFile] = useState(false)

 

  const handleDragOver = (e) => {
    e.preventDefault();
  };






  const handleFileChange1 = (event, newFiles) => {
    const updatedFiles = [...files];
    
  setNewFiles(newFiles)
  
  newFiles.forEach((newFile) => {
    updatedFiles.push(newFile); // Add the new file
   
  });
  
  
    event.target.value = '';
    setSelectedFiles(updatedFiles);
  };
  
  const handleFileChange = (event) => {
    const newFiles = Array.from(event.target.files);
    handleFileChange1(event, newFiles);
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    const newFiles = Array.from(e.dataTransfer.files);
    handleFileChange1(e, newFiles);
  };
  
  
// this for reload time 
useEffect(() => {
  const deleteFilesOnUnload = () => {
    if (convert.length > 0) {
      convert.filter((c) => type.includes(c.fileOutput)).forEach((c) => {
        axios
          .delete(`${apiUrl}/delete/${c._id}`)
          .then(() => {
          })
          .catch((error) => {
            console.log('An error occurred while deleting the file:', error);
          });
      });
    }
  };

  window.addEventListener('beforeunload', deleteFilesOnUnload);

  return () => {
    window.removeEventListener('beforeunload', deleteFilesOnUnload);
  };
}, [convert, type]);





  // this upload files useEffect related to files 

// useEffect(()=>{
// if(files.length > 0){
//   try {
//     setCheckHandleFile(true);

//     const sanitizeFileName = (fileName) => {
//       return fileName.replace(/[ %&?#<>/\\+:;=]/g, '_');
//     };

//     const typeArray = files.map((file) => {
//       const sanitizedFileName = sanitizeFileName(file.name);
//       const fileType = sanitizedFileName + Date.now() + "output." + file.name.split('.').pop();
//       return fileType;
//     });

//     setType((perv)=>[...perv ,  ...typeArray]);






//     let newIndex = files.length - newfiles.length -1

//     Promise.all(newfiles.map(async (file , index) => {
//       newIndex += 1

//       const format = file.name.split('.').pop();
//       const chunkSize = 2 * 64 * 1024; // 1MB
//       const totalChunks = Math.ceil(file.size / chunkSize);
//       const fileName_read = Date.now() + file.name;

//       for (let i = 0; i < totalChunks; i++) {
//         const start = i * chunkSize;
//         const end = Math.min(file.size, start + chunkSize);
//         const chunk = file.slice(start, end);

//         const formData = new FormData();
//         formData.append('chunk', chunk);
//         formData.append('chunkNumber', i);
//         formData.append('totalChunks', totalChunks);
//         formData.append('fileName', fileName_read);
//         formData.append('convertType', format);
//         formData.append('fileOutput', typeArray[newIndex]);
//         formData.append('filename', `${file.name}_${newIndex}`);

//         const uploadUrl = `${apiUrl}/Remove`;


//         await axios.post(uploadUrl, formData, {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         }).catch(error => {
//           console.error('Error during file upload:', error.response ? error.response.data : error.message);
//         });
        
//       }

//       const res = await axios.get(`${apiUrl}/get`);
//       setConvert(res.data);

//       setTimeout(() => {
//         window.location.reload();
//         return;
//       }, 2 * 60 * 60 * 1000);


      
//     }))


//   } catch (error) {
//     console.log('An error occurred during the conversion:', error);
//   }
// }
// },[files])













useEffect(() => {
  if (files.length > 0) {
    try {
      setCheckHandleFile(true);

      const sanitizeFileName = (fileName) => {
        return fileName.replace(/[ %&?#<>/\\+:;=]/g, '_');
      };

      const typeArray = files.map((file) => {
        const sanitizedFileName = sanitizeFileName(file.name);
        const fileType = sanitizedFileName + Date.now() + "output." + file.name.split('.').pop();
        return fileType;
      });

      setType((prev) => [...prev, ...typeArray]);

      let newIndex = files.length - newfiles.length - 1;

      Promise.all(newfiles.map(async (file, index) => {
        newIndex += 1;

        const format = file.name.split('.').pop();
        const chunkSize = 2 * 64 * 1024; // 1MB
        const totalChunks = Math.ceil(file.size / chunkSize);
        const fileName_read = Date.now() + file.name;

        for (let i = 0; i < totalChunks; i++) {
          const start = i * chunkSize;
          const end = Math.min(file.size, start + chunkSize);
          const chunk = file.slice(start, end);

          const formData = new FormData();
          formData.append('chunk', chunk);
          formData.append('chunkNumber', i);
          formData.append('totalChunks', totalChunks);
          formData.append('fileName', fileName_read);
          formData.append('convertType', format);
          formData.append('fileOutput', typeArray[newIndex]);
          formData.append('filename', `${file.name}_${newIndex}`);

          const uploadUrl = `${apiUrl}/Remove`;

          // Retry upload logic with network checks
          while (true) {
            if (!navigator.onLine) {
              console.log('Network is offline. Waiting for connection...');
              await new Promise(resolve => {
                const onlineHandler = () => {
                  window.removeEventListener('online', onlineHandler);
                  resolve();
                };
                window.addEventListener('online', onlineHandler);
              });
            }

            try {
              await axios.post(uploadUrl, formData, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              });
              break; // Break the loop if upload is successful
            } catch (error) {
              console.error('Error during file upload:', error.response ? error.response.data : error.message);
              if (error.message.includes('ERR_ADDRESS_UNREACHABLE')) {
                console.error('Network unreachable, waiting for connection...');
                await new Promise(resolve => {
                  const onlineHandler = () => {
                    window.removeEventListener('online', onlineHandler);
                    resolve();
                  };
                  window.addEventListener('online', onlineHandler);
                });
              }
            }
          }
        }

        const res = await axios.get(`${apiUrl}/get`);
        setConvert(res.data);

        setTimeout(() => {
          window.location.reload();
          return;
        }, 2 * 60 * 60 * 1000);
      }));

    } catch (error) {
      console.log('An error occurred during the conversion:', error);
    }
  }
}, [files]);



















let checkConversionProgress ;
useEffect(() => {
  if (checkHandleFile) {
    if (downloadAll) {
      clearInterval(checkConversionProgress);
    } else {

      checkConversionProgress = setInterval( async () => {
        const responseCompressAudio = await axios.get(`${apiUrl}/progressRemove`);
        const progress0 = responseCompressAudio.data.progress;



        setTotalConversionProgress({ ...progress0});      }, 1000)
    }
  }

  // Cleanup interval on component unmount or if downloadAll changes
  return () => {
    clearInterval(checkConversionProgress);
  };
}, [checkHandleFile, downloadAll]);





const handleDownload = async (c) =>{
  try {

    setDownloadOne(true);

    const response = await axios.get(`${apiUrl}/api/download?fileName=${c.fileOutput}`, {
      responseType: 'blob'
    });

    const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = downloadUrl;
  
    link.setAttribute('download', `${c.filename.split('.')[0]}.${c.convertType}`); // Adjust filename if needed
    document.body.appendChild(link);
    link.click();
    link.remove();

    // Delay the execution of these calls to wait for the download to complete
    setTimeout(() => {
      setDownloadOne(false);
    }, 1000); // Assuming the download takes less than 5 seconds, adjust if needed

    // Delete the file after 2 hours
    setTimeout(() => {
      axios
        .delete(`${apiUrl}/delete/${c._id}`)
        .then(() => {
          console.log('File deleted successfully');
        })
        .catch((error) => {
          console.log('An error occurred while deleting the file:', error);
        });
    }, 2 * 60 * 60 * 1000);
  } catch (error) {
    console.error('Error downloading file:', error);


  }
}










  
  // function for download all files in folder zip
    const DownloadAll = () => {
      Downloadall (type ,  setDownloadValidation , apiUrl , convert) 
    };





useEffect(() => {
  if (convert.length > 0) {
    const completedFiles = convert.filter(item =>
      type.includes(item.fileOutput) && totalConversionProgress[item.fileOutput] === 100    );
    const allCompleted = completedFiles.length === files.length;
    setDownloadAll(allCompleted);
  }
}, [convert, totalConversionProgress , type]);




// this for give default value for data for download
const [convertedData  ,  setConvertedData] = useState()
useEffect(() => {
  if (convert.length > 0 && files.length > 0) {
    const filterType = convert.filter(
      (item) => type.includes(item.fileOutput) && item.filename === `${files[0].name}_${0}`
    );
    
    // Only update if there's a change
    if (filterType.length > 0) {
      setConvertedData(filterType[0]); // Assuming you want the first item
    } else {
      setConvertedData(null); // Reset if no matches found
    }
  }
}, [convert]);

const handleDataClick = (converted) =>{
  setConvertedData(converted)
}


// this use it for change index
const [convertedIndex  ,  setConvertedIndex] = useState(0)

const handleIndexClick  =  (index) =>{
  setConvertedIndex(index)
}

  return (
    <>
     <div className="convert" onDrop={handleDrop}onDragOver={handleDragOver}>
      <Navbar/>
{/* this for alert start */}
<>
      {showAlert && (
        <div className='alert_section'
          style={{
            backgroundColor: isOnline ? '#28a745' : '#e57373',
           
          }}
        >
          {isOnline ? 'Network connected You are now online' : 'Offline: Tasks will resume once connected'}
         
          <AiOutlineClose  className='alert_close'  onClick={handleDismiss} />
        </div>
      )}
    </>
{/* this for alert end */}

      {
        files.length === 0 && (
            <>
             <h1 className='title'>Background Remover</h1>
             <p className='description'> Remove image background in high quality with <span className='sitfile_span'>sitfile</span> ,free,fast and secure</p>
            </>
        )
      }
     



     <div className={`convert_files ${files.length > 0 ? 'convert_files_remove' : ''}`}>

{
  files.length ===0 ? (
<div className='chose_files_container'
 onDrop={handleDrop}
 onDragOver={handleDragOver}
>

  <div className='chose_device_container '>
  <label htmlFor="fileInput" className="custom-button_device">
<FaFolder className='chose_files_device_icon'/>

  Choose Images
  <input 
  type="file"
  id="fileInput"
  
  accept="image/*"
  onChange={handleFileChange} 
  className='chose_device_input'
/>



</label>
  


</div>
<p className='update'>"      <BsFillLockFill style={{color:"#2ecc71"}} /> Drop your images here"</p>


</div>

  ):(

<>

<div className='container_remove'>
  <div className='section1_remove'>
   
    <div className='items_image_remove'>
    <label htmlFor="fileInput_remove" className="label_remove">
        <FaPlus className='icon_plus_remove'/>
        <input 
          type="file"
          id="fileInput_remove"
          
          accept="image/*"
          onChange={handleFileChange} 
          className='choose_files_remove'
        />
      </label>


      {
 files.map((file, index) => {
  const fileName = file.name;

  const filteredConvertedFiles = convert.filter(
    (item) => type.includes(item.fileOutput) && item.filename === `${fileName}_${index}`
  );


  return (
    <div key={index} className='uploading_remove_bg'>
      {filteredConvertedFiles.length > 0 ? (
      filteredConvertedFiles.map((converted, i) => (
        <div className="loading-page_removed"  onClick={() => handleDataClick(converted)}>
        <img src={`${apiUrl}/files/${converted.fileOutput}`} alt='image' className="item_image_removed" />
      </div>
      ))      ) : (
        <div className="loading-page"  onClick={() => handleIndexClick(index)}>
          <img src={URL.createObjectURL(file)} alt={`Preview of ${fileName}`} className="item_image" />
          <div className="loading-circle"onClick={() => handleIndexClick(index)} ></div>
        </div>

      )}
    </div>
  )
})
}



    </div>
  </div>




  <div className='section2_remove'>
{
  convertedData ? (
    <div className='section2_remove_container_image'>
<img src={`${apiUrl}/files/${convertedData.fileOutput}`} alt='image' className="section2_remove_image" />
</div>
  ) : (
    <div className='section2_remove_container_image_overlay'>
    <img src={URL.createObjectURL(files[convertedIndex])} alt='image' className="section2_remove_image" />
    <div className='overlay'>
    <div className='loader'>
      {[...Array(3)].map((_, index) => (
        <span key={index} className='dot' style={{ animationDelay: `${index * 0.1}s` }}></span>
      ))}
    </div>
    </div>
  </div>
 

    
  )
}


<div className='section2_remove_container_buttons'>
<>
{
  files.length > 1 &&(
    (
    downloadAll  &&  downloadValidation ? (
      <div className='converted_convert_downloadAll_remove  ' onClick={DownloadAll}>
      Download All    <BiDownload className='  converted_convert_downloadAll_remove_icon '/> 
      
    </div>):(
      <div className=' converted_convert_downloadAll_remove  downloadAll_opacity_remove '>
      Download All    <BiDownload className=' converted_convert_downloadAll_remove_icon'/> 
      
    </div>
    )
    )
    )
  }

</>
<>

{
  convertedData ? (

    downloadOne ? (
<button className='uploading_download  uploading_download_second'>Download HD</button>

    ):(
    <button onClick={() => handleDownload(convertedData)} className='uploading_download download_success'>Download HD</button>

    )


  ):(
<button className='uploading_download  uploading_download_second'>Download HD</button>


  )
}
</>
</div>


  </div>





  
</div>

 




</>
)
}


{/* here we have description design */}
<div className='full_section_describe'>
<div className='describe_how_convert'>
  <div className='full_how_convert'>
    <img  className='Arrows' src='/Arrows.png' alt='arrows'/>
    <h2 className='how_convert'>How to Remove bg from an Image?</h2>
    </div>
  <p className='description_p'>1.Start by selecting your images using the 'Choose Images' button</p>
  <p className='description_p'>2.Once you upload the files, the background will be removed automatically</p>
</div>

<div className='how_work_cards'>
<div className='how_work_card'>
  <div className='how_work_title'>
    <img className='image_how_work_title'src='/Simplicity.svg' alt='Simplicity'/>
    <h3 className='title_how_work_title'>Simplicity at its Core</h3>
  </div>
  <p className='how_work_description'>
  Just upload your images, and the background will be removed automatically. Our tool guarantees the highest quality results.  </p>
</div>

<div className='how_work_card'>
  <div className='how_work_title'>
    <img className='image_how_work_title'src='/programming.svg' alt='programming'/>
    <h3 className='title_how_work_title'>Unbeatable Features</h3>
  </div>
  <p className='how_work_description'>
  Effortlessly remove backgrounds from batches of images with our tool

</p>
</div>


<div className='how_work_card'>
  <div className='how_work_title'>
    <img className='image_how_work_title'src='/secure.svg' alt='secure'/>
    <h3 className='title_how_work_title'> Free and Secure</h3>
  </div>
  <p className='how_work_description'>
  Enjoy a free, secure, and universally compatible tool accessible from any web browser. Your images are automatically deleted after a few hours for added privacy  </p>
</div>


</div>




</div>













</div>





<Footer/>






</div>

    
<title>Remove background from image</title>
<meta name="description" content="Explore our professional background removal service to enhance your images. Learn advanced techniques to remove backgrounds seamlessly while preserving image quality. Discover methods for creating transparent backgrounds, isolating subjects, and improving visual appeal. Optimize your images with expert background removal for a polished, professional look." />
<meta name="keywords" content="background removal, image quality, image isolation, transparent background, visual appeal, background removal service, image enhancement, subject isolation, polished images, professional image editing" />

  <link rel="canonical" href="https://sitfile.com/remove-background" />

    </>
   

   
  );

}
export default App