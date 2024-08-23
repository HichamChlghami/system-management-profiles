import Design from './components/design';


function App (){
const title_home = "Sit a File and Let us convert it" ;
const des_home = "Seamlessly switch file formats with <span class='sitfile_span'>sitfile</span> platform";

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
// import React, { useEffect, useState } from 'react';

// const ImageDisplay = () => {
//     const [images, setImages] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 // Fetch the file data
//                 const response = await fetch('https://api.sitfile.com/get');
//                 const data = await response.json();

//                 const imagePromises = data.map(async (file) => {
//                     const imageName = file.fileOutput;
//                     const imageResponse = await fetch(`https://api.sitfile.com/files/${imageName}`);
                    
//                     if (imageResponse.ok) {
//                         const blob = await imageResponse.blob();
//                         const imgUrl = URL.createObjectURL(blob);
//                         const img = new Image();
//                         img.src = imgUrl;
                        
//                         return new Promise((resolve) => {
//                             img.onload = () => {
//                                 resolve({
//                                     name: imageName,
//                                     width: img.width,
//                                     height: img.height,
//                                     size: (blob.size / (1024 * 1024)).toFixed(2), // Convert to MB
//                                     url: imgUrl,
//                                 });
//                             };
//                         });
//                     }
//                     return null;
//                 });

//                 const results = await Promise.all(imagePromises);
//                 setImages(results.filter(Boolean)); // Filter out null results
//             } catch (error) {
//                 console.error('Error fetching images:', error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, []);

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
//             {images.map((image, index) => (
//                 <div key={index} style={{ margin: '10px', textAlign: 'center' }}>
//                     <img src={image.url} alt={image.name} style={{ maxWidth: '100%', maxHeight: '100%' }} />
//                     <p>{image.name}</p>
//                     <p>Width: {image.width}px</p>
//                     <p>Height: {image.height}px</p>
//                     <p>Size: {image.size} MB</p>
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default ImageDisplay;






// 'use client'
// import React, { useEffect, useState } from 'react';

// const NetworkStatusAlert = () => {
//   const [isOnline, setIsOnline] = useState(navigator.onLine);
//   const [showAlert, setShowAlert] = useState(false);

//   useEffect(() => {
//     const updateOnlineStatus = () => {
//       setIsOnline(navigator.onLine);
//       setShowAlert(true);
//       if (navigator.onLine) {
//         setTimeout(() => setShowAlert(false), 10000);
//       }
//     };

//     window.addEventListener('online', updateOnlineStatus);
//     window.addEventListener('offline', updateOnlineStatus);

//     return () => {
//       window.removeEventListener('online', updateOnlineStatus);
//       window.removeEventListener('offline', updateOnlineStatus);
//     };
//   }, []);

//   const handleDismiss = () => {
//     setShowAlert(false);
//   };

//   return (
//     <>
//       {showAlert && (
//         <div
//           style={{
//             backgroundColor: isOnline ? 'green' : 'red',
//             color: 'white',
//             padding: '10px',
//             position: 'fixed',
//             top: '10px',
//             right: '10px',
//             zIndex: 1000,
//           }}
//         >
//           {isOnline ? 'You are online' : 'You are offline'}
//           <span
//             onClick={handleDismiss}
//             style={{
//               marginLeft: '10px',
//               cursor: 'pointer',
//             }}
//           >
//             ❌
//           </span>
//         </div>
//       )}
//     </>
//   );
// };

// export default NetworkStatusAlert;
