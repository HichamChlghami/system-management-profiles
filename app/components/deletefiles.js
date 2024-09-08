const HandleFileDelete = (fileName  , files , individualSelectedFormats , setSelectedFiles ,  setIndividualSelectedFormats  ) => {
    const indexToDelete = files.findIndex((file, index) => `${file.name}_${index}` === fileName);
    
    if (indexToDelete === -1) {
      // File not found
      return;
    }
  
    const updatedFiles = files.filter((file, index) => index !== indexToDelete);
    
    // Update indexes in individualSelectedFormats after deletion
    const updatedFormats = {};
    updatedFiles.forEach((file, index) => {
      const newIndex = index;
      const oldIndex = index < indexToDelete ? index : index + 1;
      const oldFileKey = `${file.name}_${oldIndex}`;
      updatedFormats[`${file.name}_${newIndex}`] = individualSelectedFormats[oldFileKey];
    });
    
    setSelectedFiles(updatedFiles);
    setIndividualSelectedFormats(updatedFormats);
  
    if (updatedFiles.length === 0) {
      window.location.reload();
    }
  };
  



  export default HandleFileDelete