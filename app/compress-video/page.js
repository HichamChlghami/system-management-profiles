
"use client"

import React, { useState, useEffect  } from 'react';
import axios from 'axios';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { FaFolder  } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';

import { BsArrowRight } from 'react-icons/bs';
import { BiDownload } from 'react-icons/bi';
import { BsBoxArrowUpRight } from 'react-icons/bs';
import { BsFillLockFill } from 'react-icons/bs';
import { FaFileUpload } from 'react-icons/fa';
import Footer from '../footer/footer';
import Navbar from '../navbar/Navbar';
import { Download , Downloadall , HandleFileDelete } from '../components';
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
  const [conversionProgress, setConversionProgress] = useState({});
  const [convert, setConvert] = useState([]);
  const [type, setType] = useState([]);
  const [individualSelectedFormats, setIndividualSelectedFormats] = useState({});

  const [totalConversionProgress, setTotalConversionProgress] = useState({});


const [convertedFiles ,  setCovertedFiles] = useState(false);


const [downloadAll, setDownloadAll] = useState();
const [downloadValidation , setDownloadValidation]=useState(true)
 
const [downloadOne , setDownloadOne] = useState(false)
const [checkHandleFile , setCheckHandleFile] = useState(false)
 
 

  const handleDragOver = (e) => {
    e.preventDefault();
  };






const handleFileChange1 = (event, newFiles) => {
  const updatedFiles = [...files];
  const updatedFormats = { ...individualSelectedFormats };
  let newIndex = files.length; // Starting index for new files

  newFiles.forEach((newFile, i) => {
    updatedFiles.push(newFile); // Add the new file
    const fileExtension = newFile.name.split(".").pop();
    const index = newIndex + i; // Calculate the index
    updatedFormats[`${newFile.name}_${index}`] = fileExtension; // Set default format for new file
  });

  event.target.value = '';
  setSelectedFiles(updatedFiles);
  setIndividualSelectedFormats(updatedFormats);
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







//  this  function use  for delte files 
const handleFileDelete = (fileName) => {
  HandleFileDelete  (fileName  , files , individualSelectedFormats , setSelectedFiles ,  setIndividualSelectedFormats  )
 };
 
 
  

  useEffect(() => {
    const deleteFilesOnUnload = () => {
      if (convert.length > 0) {
        console.log('we are reloading ')
        convert.filter((c) => type.includes(c.fileOutput)).forEach((c) => {
          axios
            .delete(`${apiUrl}/delete/${c._id}`)
            .then(() => {
              console.log('File deleted successfully');
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



  const handleFileUpload = async (e) => {
    try {
      setCheckHandleFile(true);
      setCovertedFiles(true);
  
      const sanitizeFileName = (fileName) => {
        return fileName.replace(/[ %&?#<>/\\+:;=]/g, '_');
      };
  
      const typeArray = files.map((file) => {
        const sanitizedFileName = sanitizeFileName(file.name);
        const fileType = sanitizedFileName + Date.now() + "output." + file.name.split('.').pop();
        return fileType;
      });
  
      setType(typeArray);
  
      await Promise.all(files.map(async (file, index) => {
        const format = file.name.split('.').pop();
        const chunkSize = 2 * 64 * 1024; // 1MB
  
        const totalChunks = Math.ceil(file.size / chunkSize);
        const fileName_read = Date.now() + file.name;
        let totalUploaded = 0;
  
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
          formData.append('fileOutput', typeArray[index]);
          formData.append('filename', `${file.name}_${index}`);
  
          const uploadUrl = `${apiUrl}/compressVideo`;
  
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
                onUploadProgress: (progressEvent) => {
                  const chunkProgress = progressEvent.loaded / progressEvent.total;
                  const cumulativeProgress = Math.min(((totalUploaded + chunkProgress * (file.size / totalChunks)) / file.size) * 100, 100);
                  setConversionProgress((prevProgress) => ({
                    ...prevProgress,
                    [file.name]: Math.round(cumulativeProgress),
                  }));
                },
              });
  
              totalUploaded += chunk.size; // Update the total uploaded size
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
  };
  

  
let checkConversionProgress ;
useEffect(() => {
  if (checkHandleFile) {
    if (downloadAll) {
      clearInterval(checkConversionProgress);
    } else {

      checkConversionProgress = setInterval( async () => {
        const responseCompressAudio = await axios.get(`${apiUrl}/progressCompressVideo`);
        const progress0 = responseCompressAudio.data.progress;



        setTotalConversionProgress({ ...progress0});      }, 1000)
    }
  }

  // Cleanup interval on component unmount or if downloadAll changes
  return () => {
    clearInterval(checkConversionProgress);
  };
}, [checkHandleFile, downloadAll]);



  const [downloadOne1 , setDownloadOne1] = useState(false)

  const handleDownload = async (c) => {
    Download(c , setDownloadOne , setDownloadOne1 , files , apiUrl)
  };
  
  // function for download all files in folder zip
    const DownloadAll = () => {
      Downloadall (type ,  setDownloadValidation , apiUrl , convert) 
    };





useEffect(() => {
  if (convert.length > 0) {
    const completedFiles = convert.filter(item =>
      type.includes(item.fileOutput) && totalConversionProgress[item.fileOutput] === 100    );
    const allCompleted = completedFiles.length === type.length;
    setDownloadAll(allCompleted);
  }
}, [convert, totalConversionProgress]);






const handleOpenNewTab = () => {
  // Replace 'https://example.com' with the URL you want to open in the new tab
  window.open('https://sitfile.com/', '_blank');
};


const truncateFileName = (fileName) => {
  const words = fileName.split(' ');
  if (words.length > 5) {
    return `${words.slice(0, 2).join(' ')} ... ${words.slice(-1).join(' ')}`;
  }
  return fileName;
};



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

      <h1 className='title'> Video Compressor </h1>
      <p className='description'>Optimize videos with <span className='sitfile_span'>sitfile</span> the best compression tool.</p>



<div  className='convert_files'>

{
  files.length === 0 ? (
<div className='chose_files_container'
 onDrop={handleDrop}
 onDragOver={handleDragOver}
>

  <div className='chose_device_container '>
  <label htmlFor="fileInput" className="custom-button_device">
<FaFolder className='chose_files_device_icon'/>

  Choose Videos
  <input 
  type="file"
  id="fileInput"
  multiple 
  accept="video/*"
  onChange={handleFileChange} 
  className='chose_device_input'
/>




</label>
  


</div>
<p className='update'>"      <BsFillLockFill style={{color:"#2ecc71"}} /> Drop your videos here"</p>


</div>

  ):(

<>

{
!convertedFiles ? (

  <>
    {/* this for button add more */}
    <div className='chose_device_container  chose_device_container_section2'>
  <label htmlFor="fileInput" className="custom-button_device custom-button_device_section2">
<FaFileUpload className='  chose_files_device_icon  chose_files_device_icon_section2'/>

  Add More Videos

  <input 
  type="file"
  id="fileInput"
  multiple 
  accept="video/*"
  onChange={handleFileChange} 
  className='chose_device_input'
/>



</label>
  


</div>



{/* this section for click convert and select all */}

{files.length > 0 && (
  <div>
   <div className='convert_section_button'>
 

<button onClick={handleFileUpload} className='button_click_convert'>Compress <BsArrowRight className='icon_convert'/></button>

</div>


  </div>
) }


{/* this section who has  file information with select */}
    {files.map((file, index) => (
  <div key={index} >

{/* this is the chosen section */}
<div className='convert_chose_files_compress'>
<p className='convert_chose_files_name_compress '>{truncateFileName(file.name)}</p>
<div className='convert_chose_files_chose_compress'>
<AiOutlineCloseCircle  onClick={() => handleFileDelete(`${file.name}_${index}`)} className='convert_chose_files_delete' />
</div>
</div>
  </div>
))}  


    </>
):(
<div>
  
<div className='converted_convert'>
  <div className='converted_convert_more' onClick={handleOpenNewTab}>
   Convert More <BsBoxArrowUpRight className='converted_convert_more_icon'/>
  </div>
  {
  files.length > 1 &&(
  (
  downloadAll  &&  downloadValidation ? (
    <div className='converted_convert_downloadAll    downloadAll_opacity' onClick={DownloadAll}>
    Download All    <BiDownload className='  converted_convert_more_download  '/> 
    
  </div>):(
    <div className='converted_convert_downloadAll'>
    Download All    <BiDownload className='  converted_convert_more_download'/> 
    
  </div>
  )
  )
  )
  }


  </div>




{files.map((file, index) => {
  const fileName = file.name;
  const fileProgress = conversionProgress[fileName];
  
  const filteredConvertedFiles = convert.filter(
    (item) => type.includes(item.fileOutput) && item.filename === `${fileName}_${index}`
  );

  return (
    <div key={index} className='uploading'>
    <p className='section1_uploading'>{truncateFileName(file.name)}</p>
    {filteredConvertedFiles.length > 0   ? (
      filteredConvertedFiles.map((converted, i) => {
        const outputType = converted.fileOutput;
        const totalProgress = totalConversionProgress[outputType];

        return (
          <div key={i} className='section2_uploading'>
            {totalProgress > 0 ? (
              totalProgress >=99 ? (
                totalProgress === 100 ? (
                  <>
                  <p className='done_converting'>Done</p>
                  {
                  downloadOne ? (
                    downloadOne1 ? (
                  <button  className='uploading_download '>Download</button>

                    ):(
                  <button  className='uploading_download download_success '>Download</button>

                    )
                  
                  ):(
                  <button onClick={() => handleDownload(converted)} className='uploading_download download_success'>Download</button>
                  
                  )
                 }
                </>
                ):(
                  <>
                  <div className='uploading_convert_main'>
                    <div className='progress_rate'>finishing...</div>
                    <div className="progress-bar"><div className="signal"></div></div>
                  </div>
                  <button className='uploading_download'>Download</button>

                </>
                )
                
              ) : (
                <>
                  <div className='uploading_convert_main'>
                    <div className='progress_rate'>Compressing {totalProgress}%</div>
                    <progress max="100" value={totalProgress} className='uploading_progress'></progress>
                  </div>
                  <button className='uploading_download'>Download</button>

                </>
              )
            ) : (
              <>
            <div className='uploading_convert_main'>
            <div className='progress_rate'>Compressing ...</div>
            <div className="progress-bar"><div className="signal"></div></div>
            </div>
            <button className='uploading_download'>Download</button>

          </>
            )}
{/* <AiOutlineCloseCircle onClick={() => {
handleDeleteInProgress(outputType)
handleFileDelete(`${fileName}_${index}`);


}} className='convert_chose_files_delete' /> */}

          </div>
        );
      })
    ) : (
      <div className='section2_uploading'>
        {fileProgress === 100 ? (
          <>
            <div className='uploading_convert_main'>
              <div className='progress_rate'>Compressing ...</div>
              <div className="progress-bar"><div className="signal"></div></div>
              </div>
            <button className='uploading_download'>Download</button>
            {/* <button onClick={() => handleDownload(converted)} className='uploading_download download_success'>Download</button> */}

          </>
        ) : (
          <>
           {
 fileProgress <= 0  ? (
  <div className='uploading_convert_main'>
    <div className='progress_rate'>Uploading ...</div>
            <div className="progress-bar"><div className="signal"></div></div>

</div>
 ):(
  <div className='uploading_convert_main'>
  <div className='progress_rate'>Uploading {fileProgress}%</div>
  <progress max="100" value={fileProgress} className='uploading_progress'></progress>



</div>
 ) 
}
            <button className='uploading_download'>Download</button>
           


          </>

        )}
                    {
                      !fileProgress > 0 && (
                        <AiOutlineCloseCircle onClick={() => handleFileDelete(`${fileName}_${index}`)} className='convert_chose_files_delete' />

                      )
                    }

      </div>
    )}

  </div>
  );
})} 




</div>
)
}

</>
)
}


{/* here we have description design */}
<div className='full_section_describe'>
<div className='describe_how_convert'>
  <div className='full_how_convert'>
    <img  className='Arrows' src='/Arrows.png' alt='arrows'/>
    <h2 className='how_convert'>How to compress a video ?</h2>
    </div>
  <p className='description_p'>1.compress your videos easily by starting with selecting them using the 'Choose videos' button</p>
  <p className='description_p'>2.Initiate the compression  by clicking compress </p>
  <p className='description_p'>3.Once the compression is complete, click 'Download' to retrieve your compressed videos</p>
</div>

<div className='how_work_cards'>
<div className='how_work_card'>
  <div className='how_work_title'>
    <img className='image_how_work_title'src='/Simplicity.svg' alt='Simplicity'/>
    <h3 className='title_how_work_title'>Simplicity at its Core</h3>
  </div>
  <p className='how_work_description'>
  Just upload your videos and tap 'compress'. Our tool guarantees the highest quality compression. Unbeatable Features
  </p>
</div>

<div className='how_work_card'>
  <div className='how_work_title'>
    <img className='image_how_work_title'src='/programming.svg' alt='programming'/>
    <h3 className='title_how_work_title'>Unbeatable Features</h3>
  </div>
  <p className='how_work_description'>
  Effortlessly compress batches videos with our tool, which accommodates any file formats.
  </p>
</div>


<div className='how_work_card'>
  <div className='how_work_title'>
    <img className='image_how_work_title'src='/secure.svg' alt='secure'/>
    <h3 className='title_how_work_title'> Free and Secure</h3>
  </div>
  <p className='how_work_description'>
  Enjoy the benefits of a free, secure, and universally compatible tool accessible from any web browser. For added security and privacy, videos are automatically deleted after a few hours.
  </p>
</div>


</div>




</div>











</div>





<Footer/>






</div>

<title>compress video</title>
<meta name="description" content="Compress video files with our professional service to optimize quality and efficiency. Learn the latest video compression techniques and apply them effectively. Enhance search engine visibility and user experience with expert video compression strategies." />
        <meta name="keywords" content="video compression, compression Service, video quality, efficiency, optimization, advanced compression, codec, encoding, transcoding, streaming, bitrate, resolution, search engine optimization, SEO, user experience, professional compression, compression software, video encoding, multimedia compression, compression algorithms" />
  <link rel="canonical" href="https://www.sitfile.com/compress-video" />

</>
   
  );

  
}

export default App;

