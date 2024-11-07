
import axios from "axios";
import JSZip from 'jszip';



const Download = async (c , setDownloadOne , setDownloadOne1 , files , apiUrl ) => {
    try {
      if (files.length === 1) {
        setDownloadOne1(true);
      }
  
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
        setDownloadOne1(false);
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




const Downloadall = (type ,  setDownloadValidation , apiUrl , convert) => {
    const filesToDownload = convert.filter((c) => type.includes(c.fileOutput));
  
    // Create a new instance of JSZip
    setDownloadValidation(false);
    const zip = new JSZip();
  
    // Counter to keep track of downloaded files
    let downloadedFilesCount = 0;
  
    filesToDownload.forEach((down) => {
      axios
        .get(`${apiUrl}/api/download?fileName=${down.fileOutput}`, {
          responseType: 'blob'
        })
        .then(async (response) => {
          const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
          const filename = `${down.filename.split('.')[0]}.${down.convertType}`;
          const fileType = 'blob';
  
          // Download the file
          const fileResponse = await axios.get(downloadUrl, { responseType: fileType });
          // Add file to the zip
          zip.file(filename, fileResponse.data);
  
          // Increment downloaded files count
          downloadedFilesCount++;
  
          // Check if all files are downloaded
          if (downloadedFilesCount === filesToDownload.length) {
            // Generate the zip
            zip.generateAsync({ type: 'blob' }).then((content) => {
              // Create a temporary anchor element to download the zip
              const downloadAnchor = document.createElement('a');
              downloadAnchor.href = URL.createObjectURL(content);
              downloadAnchor.download = 'downloadedFiles.zip';
              downloadAnchor.click();
  
              // Set download validation to true when the download folder is shown to the user
              setDownloadValidation(true);
            });
          }
  
          // Delete the file after it's added to the zip
          setTimeout(() => {
            axios
              .delete(`${apiUrl}/delete/${down._id}`)
              .then(() => {
                console.log('File deleted successfully');
              })
              .catch((error) => {
                console.log('An error occurred while deleting the file:', error);
              });
          }, 2 * 60 * 60 * 1000);
        })
        .catch((error) => {
          console.log('An error occurred while downloading the file:', error);
        });
    });
  };


export { Download ,  Downloadall }