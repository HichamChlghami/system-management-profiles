

import Design from '../../components/design';

function App() {
  const title_home = "MP4 to AVI Converter";
  const des_home = "Convert MP4 to AVI online with <span class='sitfile_span'>sitfile</span>—fast, secure, and entirely web-based.";
  
  const title1 = "How to Convert MP4 to AVI?";
  const des1 = "1. Select your MP4 files using the 'Choose MP4' button.";
  const des2 = "2. Start the conversion by clicking 'Convert to AVI.'";
  const des3 = "3. Once done, click 'Download AVI' to save your converted files.";
  
  const title2 = "Simplicity at its Core";
  const how_des1 = "Upload your MP4 files, tap 'Convert,' and let our online service handle the rest for high-quality AVI conversion.";
  
  const title3 = "Unbeatable Features";
  const how_des2 = "Easily convert batches of MP4 files to AVI—our web-based converter supports all MP4 file types.";
  
  const title4 = "Security";
  const how_des3 = "Enjoy a secure, universally compatible web tool accessible from any browser. For added privacy, files are deleted automatically after a few hours.";
  
  const type_file = 'MP4';
  const format_type = '.mp4';

  return (
    <>
      <Design 
        format_type={format_type}
        type_file={type_file}
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

<title>  convert mp4 to avi</title>
  <meta name="description" content="Convert From MP4 To AVI Online  Fast, Secure and in few clicks" />

  <link rel="canonical" href="https://www.sitfile.com/video/mp4-avi" />


    </>
  );
}

export default App;
