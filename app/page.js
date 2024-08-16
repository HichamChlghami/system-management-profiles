import Design from './components/design';


function App (){
const title_home = "Sit a File and Let us convert " ;
const des_home = "Seamlessly switch file formats with our online converter";

const title1 = 'How to convert a file ?'
const des1 = '1.Convert your files easily by starting with selecting them using the "Choose Files" button'
const des2 ='2.Initiate the conversion process by choosing the desired format and clicking convert to'
const des3 = '3.Once the conversion is complete, click "Download" to retrieve your converted files'


const title2 = 'Simplicity at its Core'
const how_des1 = 'Just upload your files and tap "Convert". Our tool guarantees the highest quality conversion. Unbeatable Features'


const title3 = 'nbeatable Features'
const how_des2 = 'Effortlessly convert batches files with our tool, which accommodates any file formats.'


const title4 = 'Free and Secure'
const how_des3 = 'Enjoy the benefits of a free, secure, and universally compatible tool accessible from any web browser. For added security and privacy, files are automatically deleted after a few hours.'


const type_file = 'files'
const format_type = 'file'
  return(
    <>
 <Design 
 format_type={format_type}
 type_file ={type_file}
      title_home={title_home}
      des_home={des_home}
      title1={title1}
      des1={des1}
      des2={des2}
      des3={des3}
      title2={title2}
      how_des1={how_des1}
      title3={title3}
      how_des2={how_des2}
      title4={title4}
      how_des3={how_des3}
    />

 <title>sitfile | converter , compression and background remover platform</title>
   <meta name="description" content=" Convert & compress Files Above 1500+ Formats, Fast, Secure and Easy-to-use online tool, Supports Images, Documents, Audios, Videos and more" />

  <link rel="canonical" href="https://www.sitfile.com" />

















    </>
  )
}



export default App





// "use client"

// import React, { useState, useEffect  } from 'react';
// import { FaAngleDown, FaAngleUp  } from 'react-icons/fa';
// import { AiOutlineCloseCircle } from 'react-icons/ai';
// import { AiOutlineRight } from 'react-icons/ai';
// import { FaFolder  } from 'react-icons/fa';

// import { BsArrowRight } from 'react-icons/bs';
// import { BiDownload } from 'react-icons/bi';
// import { BsBoxArrowUpRight } from 'react-icons/bs';
// import Navbar from './navbar/navbar';
// import { BsFillLockFill } from 'react-icons/bs';
// import { FaFileUpload } from 'react-icons/fa';
// import Footer from './footer/footer';

// import './test/test.css'
// import Design from './components/design';
// import {CheckConversionProgress , Handlefiles , HandleFileDelete  , Availableformats , Download , Downloadall}  from './components'
// function App() {
//   const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  




  
//   const [files, setSelectedFiles] = useState([]);
//   const [conversionProgress, setConversionProgress] = useState({});
//   const [convert, setConvert] = useState([]);
//   const [type, setType] = useState([]);
//   const [globalSelectedFormat, setGlobalSelectedFormat] = useState('');
//   const [individualSelectedFormats, setIndividualSelectedFormats] = useState({});

//   const [totalConversionProgress, setTotalConversionProgress] = useState({});

//   const[chose , setChose] = useState({})
//   const [showConvertChoseMap, setShowConvertChoseMap] = useState({});
//   const [isHovered, setIsHovered] = useState(false);

// const [convertedFiles ,  setCovertedFiles] = useState(false);


// const [downloadAll, setDownloadAll] = useState(false);
// const [downloadValidation , setDownloadValidation]=useState(true)
 
// const [defaultProgress , setDefaultProgress] = useState(0)
 
// const [checkHandleFile , setCheckHandleFile] = useState(false)

// const [availableFormats ,  setAvailableFormats] = useState({})
 

//   const handleDragOver = (e) => {
//     e.preventDefault();
//   };






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








// //  this  function use  for delte files 
//   const handleFileDelete = (fileName) => {
//    HandleFileDelete  (fileName  , files , individualSelectedFormats , setSelectedFiles ,  setIndividualSelectedFormats  )
//   };
  
  

// // this for reload time 
//   useEffect(() => {
//     const deleteFilesOnUnload = () => {
//       if (convert.length > 0) {
//         convert.filter((c) => type.includes(c.fileOutput)).forEach((c) => {
//           axios
//             .delete(`${apiUrl}/delete/${c._id}`)
//             .then(() => {
//             })
//             .catch((error) => {
//               console.log('An error occurred while deleting the file:', error);
//             });
//         });
//       }
//     };

//     window.addEventListener('beforeunload', deleteFilesOnUnload);

//     return () => {
//       window.removeEventListener('beforeunload', deleteFilesOnUnload);
//     };
//   }, [convert, type]);


// // this function for  send data  to back-end 
// const handleFileUpload =   () => {
// // this  function  for send data request
//   Handlefiles (files , individualSelectedFormats  , setType  , apiUrl , setConvert  , setConversionProgress)




//   // this use for  make the progress interval work
//   setCheckHandleFile(true)
  

// // we use it for true or false  for  control  the  design this for show  last one progress   
// setCovertedFiles(true);


// };






// // this for  control the progress start  and end 

// let progressCheckInterval;

// useEffect(() => {
//   if (checkHandleFile) {
//     if (downloadAll) {
//       clearInterval(progressCheckInterval);
//     } else {
//       progressCheckInterval = setInterval(() => {
//         CheckConversionProgress(apiUrl, setTotalConversionProgress);
//       }, 1000);
//     }
//   }

//   // Cleanup interval on component unmount or if downloadAll changes
//   return () => {
//     clearInterval(progressCheckInterval);
//   };
// }, [checkHandleFile, downloadAll]);


















  
// //  we use the   downloadOne1  because when there there is one file
//   // we give the bluer download if more  give the succes even it does not work
// const [downloadOne , setDownloadOne] = useState(false)
// const [downloadOne1 , setDownloadOne1] = useState(false)

// const handleDownload = async (c) => {
//   Download(c , setDownloadOne , setDownloadOne1 , files , apiUrl)
// };

// // function for download all files in folder zip
//   const DownloadAll = () => {
//     Downloadall (type ,  setDownloadValidation , apiUrl , convert) 
//   };
  


// // this useEffect  for chose which formts and category will get by just  use files.name.split('.').pop()
// // based on  that we see the file formats for give potantial formats cloud change for 
//   useEffect(() => {
//     if (files.length > 0) {
//         Availableformats(files, setAvailableFormats);
//     }
// }, [files]);




// // this one give use the table

// // Step 1: Identify all unique categories across all files
// let allCategories = [];

// files.forEach((file) => {
//   const fileName = file.name;
//   const fileAvailableFormats = availableFormats[fileName];

//   if (fileAvailableFormats) {
//     fileAvailableFormats.forEach((formatObj) => {
//       formatObj.category.forEach((categoryObj) => {
//         const category = categoryObj.la;
//         if (!allCategories.includes(category)) {
//           allCategories.push(category);
//         }
//       });
//     });
//   }
// });

// // Step 2: Determine shared formats for each category
// let selectAll = [];

// allCategories.forEach((category) => {
//   let sharedFormats = null;
//   let isFirstFile = true;

//   files.forEach((file) => {
//     const fileName = file.name;
//     const fileAvailableFormats = availableFormats[fileName];
//     let categoryFound = false;

//     if (fileAvailableFormats) {
//       fileAvailableFormats.forEach((formatObj) => {
//         formatObj.category.forEach((categoryObj) => {
//           if (categoryObj.la === category) {
//             const formats = formatObj[category];
//             if (isFirstFile) {
//               sharedFormats = [...formats];
//               isFirstFile = false;
//             } else {
//               sharedFormats = sharedFormats.filter((format) => formats.includes(format));
//             }
//             categoryFound = true;
//           }
//         });
//       });
//     }

//     // If category not found in a file, reset sharedFormats
//     if (!categoryFound) {
//       sharedFormats = [];
//     }
//   });

//   // Add the shared category and formats to selectAll array if sharedFormats is not empty
//   if (sharedFormats && sharedFormats.length > 0) {
//     // Filter out formats that are not common among all files
//     const commonFormats = sharedFormats.filter((format) => {
//       return files.every((file) => {
//         const fileName = file.name;
//         const fileAvailableFormats = availableFormats[fileName];
//         return fileAvailableFormats && fileAvailableFormats.some((formatObj) => {
//           return formatObj.category.some((categoryObj) => {
//             return categoryObj.la === category && formatObj[category].includes(format);
//           });
//         });
//       });
//     });

//     if (commonFormats.length > 0) {
//       selectAll.push({ category: category, [category]: commonFormats });
//     }
//   }
// });

// // Print or use selectAll array as needed





// const handleFileButtonClick = (fileName, index) => {
//   setShowConvertChoseMap(prevState => {
//     const newKey = `${fileName}_${index}`; // Use a combination of file name and index as the key
//     const newState = { ...prevState };
//     Object.keys(newState).forEach(key => {
//       if (key !== newKey) {
//         newState[key] = false; // Close all other open sections
//       }
//     });
//     newState[newKey] = !prevState[newKey]; // Toggle the clicked file's section
//     return newState;
//   });
// };

// const handleClickOutside = (event) => {

//   if (!event.target.closest('.convert_button_father') && !event.target.closest('.convert_button_child_icon')  && !event.target.closest('.convert_categories') ) {

//     setShowConvertChoseMap(prevState => {
//       const newState = { ...prevState };
//       Object.keys(newState).forEach(key => {
//         newState[key] = false; // Close all open sections
//       });
//       return newState;
//     });
    
//   }
//   if (!event.target.closest('.convert_button_father_selectAll')&& !event.target.closest('.convert_button_child_icon_selectAl') 
//     && !event.target.closest('.convert_categories') ) {

//    setSelectAllCheck(false)
  
//   }
//     if (!event.target.closest('.chose_device_icon')&& !event.target.closest('.chose_upload_files_container') 
//      ) {

//     setIsHovered(false)
//   }


  
// }
//   useEffect(() => {
//     document.addEventListener('click', handleClickOutside);
//     return () => {
//       document.removeEventListener('click', handleClickOutside);
//     };
//   }, []);

 

// const [selectAllCheck , setSelectAllCheck] = useState(false)
// const [selectAllCategory , setSelectAllCategory] = useState('')


// const handleSellectAllClick = ()=>{
//   setSelectAllCheck(
//   !selectAllCheck
//   )
// }





// useEffect(() => {
//   if (convert.length > 0) {
//     const completedFiles = convert.filter(item =>
//       type.includes(item.fileOutput) && totalConversionProgress[item.fileOutput] === 100    );
//     const allCompleted = completedFiles.length === type.length;
//     setDownloadAll(allCompleted);
//   }
// }, [convert, totalConversionProgress]);




// const incrementProgress = () => {
//   setDefaultProgress((prevProgress) => {
//     // Toggle between incrementing and resetting based on current progress
//     const newProgress = prevProgress >= 100 ? 0 : prevProgress + 1;
//     return newProgress;
//   });
// };

// // useEffect to start incrementing progress when component mounts
// useEffect(() => {
//   let timer;
//   const startProgress = () => {
//     timer = setInterval(() => {
//       incrementProgress();
//     }, 10); // Increment every 10 milliseconds
//   };

//   // Simulate backend response delay
//   setTimeout(() => {
//     startProgress();
//   }, 2000); // Simulated delay for backend response

//   // Clear interval when component unmounts or when conversion is completed
//   return () => clearInterval(timer);
// }, []); // Empty dependency array ensures this effect runs only once






// const handleOpenNewTab = () => {
//   window.open('https://sitfile.com/', '_blank');
// };


//   return (

// <>
// <Design
//         handleDrop={handleDrop}
//         handleDragOver={handleDragOver}
//         handleFileChange={handleFileChange}
//         convertedFiles={convertedFiles}
//         files={files}
//         handleSellectAllClick={handleSellectAllClick}
//         individualSelectedFormats={individualSelectedFormats}
//         globalSelectedFormat={globalSelectedFormat}
//         selectAllCheck={selectAllCheck}
//         selectAll={selectAll}
//         setSelectAllCategory={setSelectAllCategory}
//         selectAllCategory={selectAllCategory}
//         setIndividualSelectedFormats={setIndividualSelectedFormats}
       
//         handleFileButtonClick={handleFileButtonClick}
//         handleFileUpload={handleFileUpload}
//         showConvertChoseMap={showConvertChoseMap}
//         availableFormats={availableFormats}
//         chose={chose}
//         setChose={setChose}
//         downloadAll={downloadAll}
//         downloadValidation={downloadValidation}
//         DownloadAll={DownloadAll}
//         totalConversionProgress={totalConversionProgress}
//         conversionProgress={conversionProgress}
//         handleOpenNewTab={handleOpenNewTab}
//         downloadOne={downloadOne}
//         downloadOne1={downloadOne1}
//         handleDownload={handleDownload}
//         handleFileDelete={handleFileDelete}
//         convert={convert}
//         type={type}
//         setGlobalSelectedFormat={setGlobalSelectedFormat}
//         setShowConvertChoseMap={setShowConvertChoseMap}
//       />


// <title>sitfile|Converter and Compression Platform</title>
//   <meta name="description" content=" Convert & compress Files Above 1500+ Formats, Fast, Secure and Easy-to-use online tool, Supports Images, Documents, Audios, Videos and more" />

//   <link rel="canonical" href="https://www.sitfile.com" />
// </>


   
//   );

  
// }

// export default App;



















