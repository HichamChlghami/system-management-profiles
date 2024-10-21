import Design from '../components/design';

function App() {

  const title_home = " Convert image Seamlessly with Sitfile";
  const des_home = "Easily convert images  between formats directly from your web browser using  <span class='sitfile_span'>sitfile</span> ";


  
  const title1 = "How to convert an image?";
  const des1 = "1. Convert your images easily by starting with selecting them using the 'Choose Images' button";
  const des2 = "2. Initiate the conversion process by choosing the desired format and clicking 'Convert to'";
  const des3 = "3. Once the conversion is complete, click 'Download' to retrieve your converted images";

  const title2 = "Simplicity at its Core";
  const how_des1 = "Just upload your images and tap 'Convert'. Our tool guarantees the highest quality conversion";

  const title3 = "Unbeatable Features";
  const how_des2 = "Effortlessly convert batches of images with our tool, which accommodates any image formats";
  
  const title4 = "Privacy-Focused";
  const how_des3 = "Enjoy the benefits of secure, and universally compatible tool accessible from any web browser. For added security and privacy, Images are automatically deleted after a few hours.";

  const type_file = 'Image';
  const format_type = 'Image/*';

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

      <title>Convert Images</title>
      <meta name="description" content="Seamlessly switch image formats with our online converter." />
      <link rel="canonical" href="https://www.sitfile.com/image" />
      </>
  );
}

export default App;
