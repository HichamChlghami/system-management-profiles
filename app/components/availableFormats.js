

const validFormats = {
  validImages :['png', 'jfif','jpeg', 'svg', 'ico', 'gif', 'psd', 'webp', 'bmp', 'jpg', 'tiff', 'jpeg', 'tga', 'ico', 'eps'],
  validPdf : ['pdf'],
  validExcel : ['xlsx','xls','excel'],
  validMicro : ['html',  'odt',   'word', 'doc', 'docx',  'odt',  'ppt', 'pptx','rtf'],
  validEbook : ['epub' , 'azw3' , 'mobi'],
  validTxt :['text' , 'txt' ],
  
  validVidoAudio : [
  'TTA'  , 'SPX' , 'IRCAM',    , 'AU' , 'AC3' ,
    'mov', '3gp', 'mp4', 'flv', 'mkv', 'avi', 'ogv', 'webm', 'wmv','gif','mpg','mpeg','m4v','mjpeg','hevc','swf','ts','vob','3g2','m2v','mts',
    'mp3', 'aiff', 'amr', 'alac', 'aac', 'wav', 'wma', 'flac', 'm4a', 'ogg','mp2','oga',
  ],
    validDevives :['xbox', 'mobile', 'kindle', 'ipad', 'android', 'psp', 'iphone'],
  // these will use for just for chose the right library
  image_svg:['png', 'jpeg', 'jfif' ,'ico', 'gif', 'psd', 'webp' ,'bmp', 'jpg', 'tiff', 'jpeg', 'tga', 'ico', 'eps','pdf'],
  svg:['svg'],
  imagesDocx:['doc' , 'word','docx' ,'excel', 'ppt', 'pptx' , 'xlsx','xls'],
  html:['html'],
  imagesTxt:['txt','text'],
  Txt:['txt','text','odt','ps' ,],
  micro:['doc' , 'docx' ,'word', 'ppt', 'pptx' ,'excel', 'xlsx','xls','csv','xml'],
  ebook:['epub' , 'azw3' , 'mobi'],
  MergeExcel:['csv' , 'xml' , 'pdf','rtf','odt','png', 'jpeg',],
  MergeMicro:[ 'pdf','rtf','odt','png', 'jpeg',],


  }
  

function Availableformats ( files ,  setAvailableFormats ){
    










files.forEach((file) => {
    const fileName = file.name;
    const fileExtension = fileName.split('.').pop().toLowerCase();
  
    // Initialize available formats array for the current file
    let fileAvailableFormats = [];
    if (validFormats.validImages.includes(fileExtension)) {
  
      // Your code for the condition when 'fileName' contains valid formats
     
      
      fileAvailableFormats = [{
        
        category:[{la:"Image"},{la:"Document"},],
        Image: ['PNG', 'JPEG', 'SVG', 'ICO', 'GIF', 'PSD', 'WEBP', 'BMP', 'JPG', 'TIFF', 'JPEG', 'TGA', 'ICO', 'EPS'],
        Document: ['TXT', 'TEXT', 'PDF', 'WORD', 'DOC', 'DOCX', 'HTML', 'EXCEL','PPT', 'PPTX', 'XLSX', 'XLS'],
  
  
      }
    
    ];
  
  
    } 
    
    else if (validFormats.validPdf.includes(fileExtension)) {
  
      
      fileAvailableFormats = [{
        category:[{la:"Image"},{la:"Document"},{la:"Ebook"}],
        Document: ['TXT', 'TEXT', 'PS', 'PDF', 'WORD', 'DOC', 'DOCX', 'EXCEL', 'XLSX', 'XLS', 'ODT', 'PPT', 'PPTX', 'RTF', 'EPUB', 'AZW3', 'MOBI', 'HTML'],
        Image: ['PNG', 'JPEG', 'SVG', 'ICO', 'GIF', 'PSD', 'WEBP', 'BMP', 'JPG', 'TIFF', 'TGA', 'ICO', 'EPS'],
        Ebook :['EPUB' , 'AZW3' , 'MOBI']
  
      }
    
    ];
    }
  
  
    else if (validFormats.validExcel.includes(fileExtension)) {
      fileAvailableFormats = [
  {   
    category:[{la:"Image"},{la:"Document"},],
    Document: ['CSV', 'XML', 'PDF', 'ODT', 'RTF', 'TXT', 'TEXT'],
    Image: ['PNG', 'JPEG','GIF',],
    
  }   ];    
     
  
   }
  
  
   else if (validFormats.validMicro.includes(fileExtension)) {
    fileAvailableFormats = [
  
      {   
        category:[{la:"Image"},{la:"Document"},],
        Document: ['PDF', 'ODT', 'PS', 'RTF','TXT', 'TEXT' ],
        Image: ['PNG', 'JPEG','GIF',],
        
      }
  
    
   ];    
   
  
  }
  
  else if (validFormats.validEbook.includes(fileExtension)) {
    fileAvailableFormats = [
      {   
        category:[{la:"Document"},{la:"Image"}],
        Document: ['PDF',  'DOCX', 'DOC', 'WORD', 'XLSX', 'XLS', 'EXCEL', 'HTML', 'PPT', 'PPTX','TXT', 'TEXT'],
        Image: ['PNG', 'JPEG','GIF',],
      
      }
     
   ];    
   
  
  }
  
  else if (validFormats.validTxt.includes(fileExtension)) {
    fileAvailableFormats = [
  
      {   
        category:[{la:"Image"},{la:"Document"},],
        Document: ['PDF', 'TXT', 'TEXT', 'DOCX', 'DOC', 'WORD', 'XLSX', 'XLS', 'EXCEL', 'HTML', 'PPT', 'PPTX'],
        Image: ['PNG', 'JPEG', 'SVG', 'ICO', 'GIF', 'PSD', 'WEBP', 'BMP', 'JPG', 'TIFF', 'TGA', 'ICO', 'EPS'],
        
      }
  
  
  
   ];    
   
  
  }
  else if (validFormats.validVidoAudio.includes(fileExtension)) {
    fileAvailableFormats = [
  
  
      {   
        category:[{la:"Audio"},{la:"Video"},{la:'Image'}],
    
    Audio: ['MP3', 'AIFF', 'AAC',  'FLAC',  'MP2', 'OGA' , 'WAV' , 'TTA'  , 'SPX' , 'IRCAM'  ,  'AU' , 'AC3' , ],
        Video: ['MOV', 'MP4',   'MKV' ,'FLV',  'AVI',  'AVI' ,'WEBM',   'OGV',  'MPEG', 'M4V', 'MJPEG', 'HEVC', 'SWF',  'VOB'],
  
  Image:['GIF'],
        // Device:['xbox', 'mobile', 'kindle', 'ipad', 'Android', 'PSP', 'iphone'],
     
      }
  
  
  
      
      
  
  
   ];    
   
  
  }
    
  // else if (validFormats.validDevives.includes(fileExtension)) {
  //   fileAvailableFormats = [
  //     {
  //       Device:['xbox', 'mobile', 'kindle', 'ipad', 'Android', 'PSP', 'iphone'],
  
  //     }
  // ];    
  
  // }
    
    else {
      
      // Your code for the condition when 'fileName' does not contain valid formats
      fileAvailableFormats = [
        {   
          category:[{la:"Image"},{la:"Document"},],
          Document: ['PDF', 'TXT', 'TEXT', 'DOCX', 'DOC', 'WORD', 'XLSX', 'XLS', 'EXCEL', 'HTML', 'PPT', 'PPTX'],
          Image: ['PNG', 'JPEG','GIF' ],
          
        }
      ];
  
    }
  
    // Store available formats for the current file in the object
    setAvailableFormats((prevFormats) => ({
      ...prevFormats,
      [fileName]: fileAvailableFormats
    }));
  
  });
  
}


export { Availableformats, validFormats };
