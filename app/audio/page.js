



  import Design from '../components/design';

function App() {
  const title_home = " Convert Audios Seamlessly with Sitfile";
  const des_home = "Easily convert audios  between formats directly from your web browser using  <span class='sitfile_span'>sitfile</span> ";

  const title1 = "How to convert an Audio ?";
  const des1 = "1. Convert your Audios easily by starting with selecting them using the 'Choose Audios' button.";
  const des2 = "2. Initiate the conversion process by choosing the desired format and clicking convert to.";
  const des3 = "3. Once the conversion is complete, click 'Download' to retrieve your converted Audios.";

  const title2 = "Simplicity at its Core";
  const how_des1 = "Just upload your Audios and tap 'Convert'. Our tool guarantees the highest quality conversion. Unbeatable Features.";

  const title3 = "Unbeatable Features";
  const how_des2 = "Effortlessly convert batches of Audios with our tool, which accommodates any Audio formats.";

  const title4 = "Privacy-Focused";
  const how_des3 = "Enjoy the benefits of secure, and universally compatible tool accessible from any web browser. For added security and privacy, Audios are automatically deleted after a few hours.";


  const type_file = 'Audio';
  const format_type = 'audio/*';

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

      <title>Audio Converter </title>
      <meta name="description" content="Convert Audios to various formats online  fast, secure, and easy-to-use tool. Supports various Audio formats." />
      <link rel="canonical" href="https://www.sitfile.com/audio" />
     
      </>
  );
}

export default App;
