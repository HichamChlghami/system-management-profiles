








  import Design from '../../components/design';

function App() {
  const title_home = "Video to GIF Converter";
  const des_home = "Convert from Video to GIF online with <span class='sitfile_span'>sitfile</span> Free, Fast and secure";

  const title1 = "How to convert from Video to GIF?";
  const des1 = "1. Begin by selecting your Video files with the 'Choose Video' button.";
  const des2 = "2. Initiate the conversion process by clicking 'Convert to GIF'.";
  const des3 = "3. Once the status reads 'Done', hit 'Download GIF' to retrieve your converted files.";

  const title2 = "Simplicity at its Core";
  const how_des1 = "Just upload your Video files and tap 'Convert'. Our tool guarantees the highest quality GIF conversion.";

  const title3 = "Unbeatable Features";
  const how_des2 = "Effortlessly convert batches of Video files to GIF with our tool, which also accommodates animated Video files.";

  const title4 = "Free and Secure";
  const how_des3 = "Enjoy the benefits of a free, secure, and universally compatible tool accessible from any web browser. For added security and privacy, files are automatically deleted after a few hours.";

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

<title> convert video to gif</title>
  <meta name="description" content="Convert From Video To GIF Online Free, Fast, Secure and in few clicks" />

  <link rel="canonical" href="https://www.sitfile.com/video/video-gif" />


    </>
  );
}

export default App;
