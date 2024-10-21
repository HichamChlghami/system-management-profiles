










import Design from '../components/design';

function App() {
  const title_home = "Sit a video and let us convert it";
  const des_home = "Seamlessly switch video formats with <span class='sitfile_span'>sitfile</span> ";

  const title1 = "How to convert a video?";
  const des1 = "1. Convert your videos easily by starting with selecting them using the 'Choose videos' button.";
  const des2 = "2. Initiate the conversion process by choosing the desired format and clicking convert to.";
  const des3 = "3. Once the conversion is complete, click 'Download' to retrieve your converted videos.";

  const title2 = "Simplicity at its Core";
  const how_des1 = "Just upload your videos and tap 'Convert'. Our tool guarantees the highest quality conversion.";

  const title3 = "Unbeatable Features";
  const how_des2 = "Effortlessly convert batches of videos with our tool, which accommodates any video formats.";

  const title4 = "Secure";
  const how_des3 = "Enjoy the benefits of  secure, and universally compatible tool accessible from any web browser. For added security and privacy, videos are automatically deleted after a few hours.";

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
