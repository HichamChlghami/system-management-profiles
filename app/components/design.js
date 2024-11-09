


"use client"

import React, { useState, useEffect  , useContext} from 'react';
import { Context } from '../context/context';
import { FaAngleDown, FaAngleUp  } from 'react-icons/fa';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { AiOutlineRight } from 'react-icons/ai';
import { FaFolder  } from 'react-icons/fa';

import { BsArrowRight } from 'react-icons/bs';
import { BiDownload } from 'react-icons/bi';
import { BsBoxArrowUpRight } from 'react-icons/bs';
import Navbar from '../navbar/Navbar';
import { BsFillLockFill } from 'react-icons/bs';
import { FaFileUpload } from 'react-icons/fa';
import Footer from '../footer/footer';
import axios from 'axios'
import { AiOutlineClose } from 'react-icons/ai';

import {CheckConversionProgress , Handlefiles , HandleFileDelete  , Availableformats , Download , Downloadall}  from './index'

import Head from 'next/head';
function Design  ({
  title_home,
  des_home,
  title1,
  des1,
  des2,
  des3,
  title2,
  how_des1,
  title3,
  how_des2,
  title4,
  how_des3,
  type_file,
  format_type

}) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const {   payer  , dispatch} = useContext(Context);

// // this for show alert 

const [isOnline, setIsOnline] = useState(false);
const [showAlert, setShowAlert] = useState(false);

useEffect(() => {
  const updateOnlineStatus = () => {
    if (typeof navigator !== 'undefined') {
      setIsOnline(navigator.onLine);
      setShowAlert(true);
      if (navigator.onLine) {
        setTimeout(() => setShowAlert(false), 5000);
      }
    }
  };

  // Only run the following code in the browser
  if (typeof window !== 'undefined') {
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    // Initial check
    updateOnlineStatus();

    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }
}, []);

const handleDismiss = () => {
  setShowAlert(false);
};
// // end for show alert


  
  
  const [files, setSelectedFiles] = useState([]);
  const [conversionProgress, setConversionProgress] = useState({});
  const [convert, setConvert] = useState([]);
  const [type, setType] = useState([]);
  const [globalSelectedFormat, setGlobalSelectedFormat] = useState('');
  const [individualSelectedFormats, setIndividualSelectedFormats] = useState({});

  const [totalConversionProgress, setTotalConversionProgress] = useState({});

  const[chose , setChose] = useState({})
  const [showConvertChoseMap, setShowConvertChoseMap] = useState({});
  const [isHovered, setIsHovered] = useState(false);

const [convertedFiles ,  setCovertedFiles] = useState(false);


const [downloadAll, setDownloadAll] = useState(false);
const [downloadValidation , setDownloadValidation]=useState(true)
 
 
const [checkHandleFile , setCheckHandleFile] = useState(false)

const [availableFormats ,  setAvailableFormats] = useState({})
  const handleDragOver = (e) => {
    e.preventDefault();
  };


  const handleFileChange1 =  async  (event, newFiles) => {
    const updatedFiles = [...files];
    const updatedFormats = { ...individualSelectedFormats };
    let newIndex = files.length; // Starting index for new files
    const maxFiles = 3; // Free version file limit
    const maxFileSize = 500 * 1024 * 1024; // 500MB in bytes
  if(!payer){
    if (updatedFiles.length + newFiles.length > maxFiles ) {
      
      const title = 'Too many files uploaded!'
      const message =  '  You can upload up to 3 files at a time with your current plan.<br /> To upload more files simultaneously, please consider upgrading your plan.'
      dispatch({ type: "MESSAGE", title:title  , message:message });

     
      window.location.href = '/pricing';
      await axios.post(`${apiUrl}/largefiles`, {title})


    
      event.target.value = '';
      return;
    }
  
    // Check if any new file exceeds the size limit
    for (let i = 0; i < newFiles.length; i++) {
      const newFile = newFiles[i];
      if (newFile.size > maxFileSize) {
        let size;
        let unit;
      
        if (newFile.size >= 1024 * 1024 * 1024) { // Check if size is greater than or equal to 1 GB
          size = (newFile.size / (1024 * 1024 * 1024)).toFixed(2); // Convert to GB
          unit = 'GB';
        } else {
          size = (newFile.size / (1024 * 1024)).toFixed(2); // Convert to MB
          unit = 'MB';
        }
      
        const title = `File is too large! (${size} ${unit})`
        const message =  'The maximum file size for your account type - 500 MB.<br />To be able to convert bigger files, please select a premium service below.'
        dispatch({ type: "MESSAGE", title:title  , message:message });

        window.location.href = '/pricing';
        await axios.post(`${apiUrl}/largefiles`, {title})

      
        event.target.value = '';
        return;
      }
      
    }
  }
    // Check if total files exceed the limit
   
  
    // No errors, proceed with file updates
    newFiles.forEach((newFile, i) => {
      updatedFiles.push(newFile); // Add the new file
      const fileExtension = newFile.name.split(".").pop();
      const index = newIndex + i; // Calculate the index
      updatedFormats[`${newFile.name}_${index}`] = fileExtension; // Set default format for new file
    });
  
    // Reset input and update state
    event.target.value = '';
    setSelectedFiles(updatedFiles);
    setIndividualSelectedFormats(updatedFormats);
    setErrorMessage(''); // Clear error if successful
  };
  
  // Handle file input changes
  const handleFileChange = (event) => {
    const newFiles = Array.from(event.target.files);
    handleFileChange1(event, newFiles);
  };
  
  // Handle drag-and-drop file uploads
  const handleDrop = (e) => {
    e.preventDefault();
    const newFiles = Array.from(e.dataTransfer.files);
    handleFileChange1(e, newFiles);
  };
  



// const handleFileChange1 = (event, newFiles) => {
//   const updatedFiles = [...files];
//   const updatedFormats = { ...individualSelectedFormats };
//   let newIndex = files.length; // Starting index for new files

//   newFiles.forEach((newFile, i) => {
//     updatedFiles.push(newFile); // Add the new file
//     const fileExtension = newFile.name.split(".").pop();
//     const index = newIndex + i; // Calculate the index
//     updatedFormats[`${newFile.name}_${index}`] = fileExtension; // Set default format for new file
//   });

//   event.target.value = '';
//   setSelectedFiles(updatedFiles);
//   setIndividualSelectedFormats(updatedFormats);
// };

// const handleFileChange = (event) => {
//   const newFiles = Array.from(event.target.files);
//   handleFileChange1(event, newFiles);
// };

// const handleDrop = (e) => {
//   e.preventDefault();
//   const newFiles = Array.from(e.dataTransfer.files);
//   handleFileChange1(e, newFiles);
// };
















//  this  function use  for delte files 
  const handleFileDelete = (fileName) => {
   HandleFileDelete  (fileName  , files , individualSelectedFormats , setSelectedFiles ,  setIndividualSelectedFormats  )
  };
  
  

// this for reload time 
  // useEffect(() => {
  //   const deleteFilesOnUnload = () => {
  //     if (convert.length > 0) {
  //       convert.filter((c) => type.includes(c.fileOutput)).forEach((c) => {
  //         axios
  //           .delete(`${apiUrl}/delete/${c._id}`)
  //           .then(() => {
  //           })
  //           .catch((error) => {
  //           });
  //       });
  //     }
  //   };

  //   window.addEventListener('beforeunload', deleteFilesOnUnload);

  //   return () => {
  //     window.removeEventListener('beforeunload', deleteFilesOnUnload);
  //   };
  // }, [convert, type]);


  useEffect(() => {
    const deleteFilesOnUnload = () => {
      if (convert.length > 0) {
        convert
          .filter((c) => type.includes(c.fileOutput))
          .forEach((c) => {
            axios
              .delete(`${apiUrl}/delete/${c._id}`)
              .then(() => {
                // Handle successful deletion
              })
              .catch((error) => {
                // Handle error
              });
          });
      }
    };
  
    window.addEventListener('beforeunload', deleteFilesOnUnload);
    window.addEventListener('unload', deleteFilesOnUnload);
  
    return () => {
      window.removeEventListener('beforeunload', deleteFilesOnUnload);
      window.removeEventListener('unload', deleteFilesOnUnload);
    };
  }, [convert, type]);
  

 

// this function for  send data  to back-end 
const handleFileUpload =   () => {
// this  function  for send data request
  Handlefiles (files , individualSelectedFormats  , setType  , apiUrl , setConvert  , setConversionProgress)




  // this use for  make the progress interval work
  setCheckHandleFile(true)
  

// we use it for true or false  for  control  the  design this for show  last one progress   
setCovertedFiles(true);


};






// this for  control the progress start  and end 











let progressCheckInterval;

useEffect(() => {
  const checkConversionProgress = () => {
    if (navigator.onLine) {
      CheckConversionProgress(apiUrl, setTotalConversionProgress);
    }
  };

  if (checkHandleFile) {
    if (downloadAll) {
      clearInterval(progressCheckInterval);
    } else {
      progressCheckInterval = setInterval(checkConversionProgress, 1000);
    }
  }

  // Cleanup interval on component unmount or if downloadAll changes
  return () => {
    clearInterval(progressCheckInterval);
  };
}, [checkHandleFile, downloadAll]);








  
//  we use the   downloadOne1  because when there there is one file
  // we give the bluer download if more  give the succes even it does not work
const [downloadOne , setDownloadOne] = useState(false)
const [downloadOne1 , setDownloadOne1] = useState(false)

const handleDownload = async (c) => {
  Download(c , setDownloadOne , setDownloadOne1 , files , apiUrl)
};

// function for download all files in folder zip
  const DownloadAll = () => {
    Downloadall (type ,  setDownloadValidation , apiUrl , convert) 
  };
  


// this useEffect  for chose which formts and category will get by just  use files.name.split('.').pop()
// based on  that we see the file formats for give potantial formats cloud change for 
  useEffect(() => {
    if (files.length > 0) {
        Availableformats(files, setAvailableFormats);
    }
}, [files]);




// this one give use the table

// Step 1: Identify all unique categories across all files
let allCategories = [];

files.forEach((file) => {
  const fileName = file.name;
  const fileAvailableFormats = availableFormats[fileName];

  if (fileAvailableFormats) {
    fileAvailableFormats.forEach((formatObj) => {
      formatObj.category.forEach((categoryObj) => {
        const category = categoryObj.la;
        if (!allCategories.includes(category)) {
          allCategories.push(category);
        }
      });
    });
  }
});

// Step 2: Determine shared formats for each category
let selectAll = [];

allCategories.forEach((category) => {
  let sharedFormats = null;
  let isFirstFile = true;

  files.forEach((file) => {
    const fileName = file.name;
    const fileAvailableFormats = availableFormats[fileName];
    let categoryFound = false;

    if (fileAvailableFormats) {
      fileAvailableFormats.forEach((formatObj) => {
        formatObj.category.forEach((categoryObj) => {
          if (categoryObj.la === category) {
            const formats = formatObj[category];
            if (isFirstFile) {
              sharedFormats = [...formats];
              isFirstFile = false;
            } else {
              sharedFormats = sharedFormats.filter((format) => formats.includes(format));
            }
            categoryFound = true;
          }
        });
      });
    }

    // If category not found in a file, reset sharedFormats
    if (!categoryFound) {
      sharedFormats = [];
    }
  });

  // Add the shared category and formats to selectAll array if sharedFormats is not empty
  if (sharedFormats && sharedFormats.length > 0) {
    // Filter out formats that are not common among all files
    const commonFormats = sharedFormats.filter((format) => {
      return files.every((file) => {
        const fileName = file.name;
        const fileAvailableFormats = availableFormats[fileName];
        return fileAvailableFormats && fileAvailableFormats.some((formatObj) => {
          return formatObj.category.some((categoryObj) => {
            return categoryObj.la === category && formatObj[category].includes(format);
          });
        });
      });
    });

    if (commonFormats.length > 0) {
      selectAll.push({ category: category, [category]: commonFormats });
    }
  }
});

// Print or use selectAll array as needed





const handleFileButtonClick = (fileName, index) => {
  setShowConvertChoseMap(prevState => {
    const newKey = `${fileName}_${index}`; // Use a combination of file name and index as the key
    const newState = { ...prevState };
    Object.keys(newState).forEach(key => {
      if (key !== newKey) {
        newState[key] = false; // Close all other open sections
      }
    });
    newState[newKey] = !prevState[newKey]; // Toggle the clicked file's section
    return newState;
  });
};

const handleClickOutside = (event) => {

  if (!event.target.closest('.convert_button_father') && !event.target.closest('.convert_button_child_icon')  && !event.target.closest('.convert_categories') ) {

    setShowConvertChoseMap(prevState => {
      const newState = { ...prevState };
      Object.keys(newState).forEach(key => {
        newState[key] = false; // Close all open sections
      });
      return newState;
    });
    
  }
  if (!event.target.closest('.convert_button_father_selectAll')&& !event.target.closest('.convert_button_child_icon_selectAl') 
    && !event.target.closest('.convert_categories') ) {

   setSelectAllCheck(false)
  
  }
    if (!event.target.closest('.chose_device_icon')&& !event.target.closest('.chose_upload_files_container') 
     ) {

    setIsHovered(false)
  }


  
}
  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

 

const [selectAllCheck , setSelectAllCheck] = useState(false)
const [selectAllCategory , setSelectAllCategory] = useState('')


const handleSellectAllClick = ()=>{
  setSelectAllCheck(
  !selectAllCheck
  )
}





useEffect(() => {
  if (convert.length > 0) {
    const completedFiles = convert.filter(item =>
      type.includes(item.fileOutput) && totalConversionProgress[item.fileOutput] === 100    );
    const allCompleted = completedFiles.length === type.length;
    setDownloadAll(allCompleted);
  }
}, [convert, totalConversionProgress]);








const handleOpenNewTab = () => {
  window.open('https://sitfile.com/', '_blank');
};

const truncateFileName = (fileName) => {
  const words = fileName.split(/[\s-_]+/); // Split by space, hyphen, or underscore
  if (words.length > 4) {
    return `${words.slice(0, 2).join(' ')} ... ${words.slice(-1).join(' ')}`;
  }
  return fileName;
};





// useEffect(() => {
//   const refreshAds = () => {
//     if (typeof window !== "undefined" && window.adsbygoogle) {
//       try {
//         // Push new ad requests to refresh the ads
//         window.adsbygoogle.push({});
//         window.adsbygoogle.push({});
//         window.adsbygoogle.push({});
//         window.adsbygoogle.push({});
//         window.adsbygoogle.push({});
//         window.adsbygoogle.push({});


//         window.adsbygoogle.push({});
//         window.adsbygoogle.push({});
//         window.adsbygoogle.push({});
//         window.adsbygoogle.push({});
//         window.adsbygoogle.push({});
//         window.adsbygoogle.push({});

//       } catch (e) {
//         console.error("AdSense error", e);
//       }
//     }
//   };

//   // Initial ads loading
//   refreshAds();


// }, []);



useEffect(() => {
  const loadAds = () => {
    if (typeof window !== "undefined" && window.adsbygoogle) {
      try {
        // Load all 12 ad slots
        for (let i = 0; i < 12; i++) {
          window.adsbygoogle.push({});
        }
      } catch (e) {
        console.error("AdSense error", e);
      }
    }
  };

  // Initial ads loading for all 12 ad slots
  loadAds();
}, []);





  return (

<>

<div className="convert" onDrop={handleDrop}onDragOver={handleDragOver}>
       <Navbar/> 

       <>
      {showAlert && (
        <div
          className='alert_section'
          style={{
            backgroundColor: isOnline ? '#28a745' : '#e57373',
          }}
        >
          {isOnline ? 'Network connected. You are now online' : 'Offline: Tasks will resume once connected'}
          <AiOutlineClose className='alert_close' onClick={handleDismiss} />
        </div>
      )}
    </>




      <h1 className='title'>{title_home}</h1>

      <p className='description' dangerouslySetInnerHTML={{ __html: des_home }} />



         <div className='googletest'>

    {/* {
      !payer && 
    } */}
          {/* this code for vertical  ads */}
          {
  !payer &&  <ins className="adsbygoogle  vertical "
  data-ad-client="ca-pub-9350232533240680"
  data-ad-slot="9050429554"></ins>
}

<div className={`convert_files ${payer ? 'convert_files_noads' : ''}`}>
        {/* code ads horizontal  */}




{
  !payer &&  
  <ins className="adsbygoogle horizontal"
           data-ad-format="fluid" 
           data-ad-layout-key="-fb+5w+4e-db+86" 
           data-ad-client="ca-pub-9350232533240680"
           data-ad-slot="1892637029"></ins>
}
{
  files.length === 0 ? (
<div className='chose_files_container'
 onDrop={handleDrop}
 onDragOver={handleDragOver}
>
<div className='sitfile_box'>"sitfile.com"</div>

  <div className='chose_device_container '>
  <label htmlFor="fileInput" className="custom-button_device">
<FaFolder className='chose_files_device_icon'/>

  Choose {type_file}
<input type='file'
  accept={format_type}

id="fileInput"
 multiple onChange={handleFileChange} 
  className='chose_device_input'/>

</label>
  
{/* {isHovered? <FaAngleUp  className='chose_device_icon'  onClick={handleMouseEnter} /> : <FaAngleDown  className='chose_device_icon' onClick={handleMouseEnter}/>   } */}


</div>
{/* <p className='update'>max file size 1BG <a href='/'>sign Up </a> for more</p> */}
<p className='update'>"      <BsFillLockFill style={{color:"#2ecc71"}} /> Drop your {type_file} here"</p>
{/* this for choose other devices */}


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

  Add More {type_file}
<input type="file"
AIFFept = {format_type}
id="fileInput"
multiple  onChange={handleFileChange} 
  className='chose_device_input'/>

</label>
  
{/* {isHovered? <FaAngleUp  className='chose_device_icon  chose_device_icon_section2'  onClick={handleMouseEnter} /> : <FaAngleDown className='chose_device_icon  chose_device_icon_section2' onClick={handleMouseEnter}/>   } */}


</div>



{/* this  who when we click  button add more show */}


{/* this section for click convert and select all */}

{files.length > 0 && (
  <div>
   <div className='convert_section_button'>
    {
      files.length > 1 &&(
        <div className='select_all_section'>
        <p className='select_all_p'> Convert All To</p>
        <p className='select_all_p  select_all_p1'> All To</p>

    
    <div className='convert_button_father_selectAll' onClick={handleSellectAllClick}>
    <p className='convert_button_child_button'>
     {
       globalSelectedFormat && files.every((file, index) => {
         return individualSelectedFormats[`${file.name}_${index}`] === globalSelectedFormat;
       }) ? (
         <p>{globalSelectedFormat}</p>
       ) : (
         <p className='select_p'>Select</p>
       )
     }
    </p>
    
         {selectAllCheck ?  <FaAngleUp  className='convert_button_child_icon_selectAl'/> : <FaAngleDown  className='convert_button_child_icon_selectAl'/>}
    
    </div> 
        </div>
      )
    }

    

<button onClick={handleFileUpload} className='button_click_convert'>Convert <BsArrowRight className='icon_convert'/></button>

</div>


{selectAllCheck && (
        <div className='convert_chose_father'>
          <div className='convert_chose convert_chose1'>
            <div className='convert_categories'>
              {selectAll.map((cat, index) => {

                if(!selectAllCategory){
                  setSelectAllCategory(cat.category)
                }
                return(
                  
                <div className='convert_category' onMouseEnter={() => setSelectAllCategory(cat.category)}>
                <div className='convert_category_content'>{cat.category}</div>
                {selectAllCategory === cat.category && <AiOutlineRight className='convert_category_icon' />}
              </div>
                )
                
})}
            </div>

            <ul className='convert_formats'>
            {selectAll.map((formats, index) => (
  Array.isArray(formats[selectAllCategory]) && formats[selectAllCategory].map((format) => (
    <li className='convert_format' onClick={() => {
      setGlobalSelectedFormat(format) ; setSelectAllCheck(!selectAllCheck)
      const updatedFormats = {};
            files.forEach((file , index) => {
              updatedFormats[`${file.name}_${index}`] = format ;
            });
            setIndividualSelectedFormats(updatedFormats);
    }}>
      {format}
    </li>
  ))
))}
            </ul>
          </div>
        </div>
      )}
  </div>
) }


{/* this section who has  file information with select */}
    {files.map((file, index) => (
  <div key={index} >



{/* this is the chosen section */}
<div className='convert_chose_files '>
<p className='convert_chose_files_name'>{truncateFileName(file.name)}</p>
<div className='convert_chose_files_chose'>
      <div className='convert_button-child_output'>Output: </div>

<div className='convert_button_father' onClick={() => handleFileButtonClick(file.name, index)}>
      
      <p  className='convert_button_child_button'>
        {individualSelectedFormats[`${file.name}_${index}`]}
      </p>
      {showConvertChoseMap[`${file.name}_${index}`] ? <FaAngleUp  className='convert_button_child_icon'/> : <FaAngleDown  className='convert_button_child_icon'/> }

</div>
<AiOutlineCloseCircle  onClick={() => handleFileDelete(`${file.name}_${index}`)} className='convert_chose_files_delete' />
</div>
</div>


{showConvertChoseMap[`${file.name}_${index}`] &&(
<div className='convert_chose_father'>

<div className='convert_chose' >

<div className='convert_categories'>
      {availableFormats[file.name].map((cat, index) => {
        if (!chose[file.name]) {
          setChose(prevState => ({ ...prevState, [file.name]: cat.category[0].la })); // Set chose to the first item in the category array
        }
        return cat.category.map((c) => (
          <div className='convert_category' onMouseEnter={() => setChose(prevState => ({ ...prevState, [file.name]: c.la }))}>
            <div className='convert_category_content' > {c.la}</div>
           
            {chose[file.name] === c.la && (
                    <AiOutlineRight className='convert_category_icon' />
                  )}
            {/* <AiOutlineRight  className='convert_category_icon' /> */}
           </div>
          ));
      })}
    </div>

<ul  className='convert_formats'>
{availableFormats[file.name].map((formats) => (
  formats[chose[file.name]] && formats[chose[file.name]].map((format) => (
    <li
    className='convert_format'
    onClick={() => {
      setIndividualSelectedFormats({
        ...individualSelectedFormats,
        [`${file.name}_${index}`]: format,
      });
      setShowConvertChoseMap(prevState => ({
        ...prevState,
        [`${file.name}_${index}`]: false // Close the convert_chose section when a format is clicked
      }));
    }}
    >
      {format}
    </li>
  ))
))}
</ul>

</div>

</div>
)}
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
  const fileName = file.name
{/* <p className='convert_chose_files_name'>{truncateFileName(file.name)}</p> */}

  const fileProgress = conversionProgress[fileName];
  
  const filteredConvertedFiles = convert.filter(
    (item) => type.includes(item.fileOutput) && item.filename === `${fileName}_${index}`
  );

  return (
    <div key={index} className='uploading'>
    <p className='section1_uploading'>{ truncateFileName(file.name)}</p>
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
                    <div className='progress_rate'>Converting {totalProgress}%</div>
                    <progress max="100" value={totalProgress} className='uploading_progress'></progress>
                  </div>
                  <button className='uploading_download'>Download</button>

                </>
              )
            ) : (
              <>
            <div className='uploading_convert_main'>
            <div className='progress_rate'>Converting ...</div>
            <div className="progress-bar"><div className="signal"></div></div>

           
            </div>
            <button className='uploading_download'>Download</button>

          </>
            )}


          </div>
        );
      })
    ) : (
      <div className='section2_uploading'>
        {fileProgress === 100 ? (
          <>
            <div className='uploading_convert_main'>
              <div className='progress_rate'>Converting ...</div>
            
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
        {/* code ads horizontal  */}
        {
          !payer && <ins className="adsbygoogle horizontal"
          data-ad-format="fluid" 
          data-ad-layout-key="-fb+5w+4e-db+86" 
          data-ad-client="ca-pub-9350232533240680"
          data-ad-slot="1892637029"></ins>
        }


{/* here we have description design */}
<div className={`full_section_describe ${payer ? 'full_section_describe_noads':''}`}>
        <div className='describe_how_convert'>
          <div className='full_how_convert'>
            <img className='Arrows' src='/Arrows.png' alt='arrows'/>
            <h2 className='how_convert'>{title1}</h2>
          </div>
          
          <p className='description_p'>{des1}</p>
          <p className='description_p'>{des2}</p>
          <p className='description_p'>{des3}</p>
        {/* code ads horizontal  */}
          {
            !payer &&  <ins className="adsbygoogle horizontal"
            data-ad-format="fluid" 
            data-ad-layout-key="-fb+5w+4e-db+86" 
            data-ad-client="ca-pub-9350232533240680"
            data-ad-slot="1892637029"></ins>
   
          }
        </div>

        <div className='how_work_cards'>
          <div className='how_work_card'>
            <div className='how_work_title'>
              <img className='image_how_work_title' src='/Simplicity.svg' alt='Simplicity'/>
              <h3 className='title_how_work_title'>{title2}</h3>
            </div>
            <p className='how_work_description'>{how_des1}</p>
          </div>

          <div className='how_work_card'>
            <div className='how_work_title'>
              <img className='image_how_work_title' src='/programming.svg' alt='programming'/>
              <h3 className='title_how_work_title'>{title3}</h3>
            </div>
            <p className='how_work_description'>{how_des2}</p>
          </div>

          <div className='how_work_card'>
            <div className='how_work_title'>
              <img className='image_how_work_title' src='/secure.svg' alt='secure'/>
              <h3 className='title_how_work_title'>{title4}</h3>
            </div>
            <p className='how_work_description'>{how_des3}</p>
          </div>
        </div>
        {/* code ads horizontal  */}
        {
            !payer &&  <ins className="adsbygoogle horizontal"
            data-ad-format="fluid" 
            data-ad-layout-key="-fb+5w+4e-db+86" 
            data-ad-client="ca-pub-9350232533240680"
            data-ad-slot="1892637029"></ins>
   
          }
      </div>



</div>
          {/* this code for vertical  ads */}

{
  !payer &&  <ins className="adsbygoogle  vertical "
  data-ad-client="ca-pub-9350232533240680"
  data-ad-slot="9050429554"></ins>
}

         </div>

<Footer/> 




</div>

<Head>
{
  !payer &&   <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9350232533240680" crossorigin="anonymous"></script>

} 
</Head>

</>


   
  );

  
}

export default Design;



































