

  import Design from '../../components/design';

function App() {
  const title_home = "Video to Audio Converter";
  const des_home = "Convert video to audio online with <span class='sitfile_span'>sitfile</span>—fast, secure, and entirely web-based.";
  
  const title1 = "How to Convert Video to Audio?";
  const des1 = "1. Select your video files using the 'Choose Video' button.";
  const des2 = "2. Start the conversion by clicking 'Convert to Audio.'";
  const des3 = "3. Once done, click 'Download Audio' to save your converted audio files.";
  
  const title2 = "Simplicity at its Core";
  const how_des1 = "Upload your video files, tap 'Convert,' and let our online service handle the rest for high-quality audio conversion.";
  
  const title3 = "Unbeatable Features";
  const how_des2 = "Easily convert batches of video files to audio—our web-based converter supports all video file types.";
  
  const title4 = "Security";
  const how_des3 = "Enjoy a secure, universally compatible web tool accessible from any browser. For added privacy, files are deleted automatically after a few hours.";
  
  const type_file = 'Video';
  const format_type = 'video/*';

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

<title> convert video to audio</title>
  <meta name="description" content="Convert From Video To Audio Online  Secure and in few clicks" />

  <link rel="canonical" href="https://www.sitfile.com/video/video-audio" />


    </>
  );
}

export default App;
