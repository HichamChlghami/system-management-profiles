










import Design from '../components/design';

function App() {
  const title_home = "Convert Videos Seamlessly with Sitfile";
  const des_home = "Easily convert your videos between formats online directly from your web browser using <span class='sitfile_span'>sitfile</span>.";
  
  const title1 = "How to Convert a Video?";
  const des1 = "1. Convert your videos by selecting them with the 'Choose videos' button.";
  const des2 = "2. Choose your desired format and click 'Convert' to start the process.";
  const des3 = "3. Once the conversion is complete, click 'Download' to save your videos.";
  
  const title2 = "Simplicity at its Core";
  const how_des1 = "Just upload your videos and tap 'Convert'. Our web-based service guarantees the highest quality conversion.";
  
  const title3 = "Unbeatable Features";
  const how_des2 = "Convert batches of videos with ease—our service handles all video formats.";
  
  const title4 = "Privacy-Focused";
  const how_des3 = "Enjoy a secure and universally compatible web tool, accessible from any browser. For added security and privacy, videos are automatically deleted after a few hours.";
  
  const type_file = 'video';
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

      <title>Convert Video Formats</title>
      <meta name="description" content="Seamlessly switch video formats with our online converter." />
      <link rel="canonical" href="https://www.sitfile.com/video" />


      </>
  );
}

export default App;
