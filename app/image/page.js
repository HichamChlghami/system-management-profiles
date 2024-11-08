import Design from '../components/design';

function App() {

  const title_home = "Convert Images Seamlessly with Sitfile";
  const des_home = "Easily convert your images between formats online directly from your web browser using <span class='sitfile_span'>sitfile</span>.";
  
  const title1 = "How to Convert an Image?";
  const des1 = "1. Convert your images by selecting them with the 'Choose images' button.";
  const des2 = "2. Choose your desired format and click 'Convert' to start the process.";
  const des3 = "3. Once the conversion is complete, click 'Download' to save your images.";
  
  const title2 = "Simplicity at its Core";
  const how_des1 = "Just upload your images and tap 'Convert'. Our web-based service guarantees the highest quality conversion.";
  
  const title3 = "Unbeatable Features";
  const how_des2 = "Convert batches of images with ease—our service handles all image formats.";
  
  const title4 = "Privacy-Focused";
  const how_des3 = "Enjoy a secure and universally compatible web tool, accessible from any browser. For added security and privacy, images are automatically deleted after a few hours.";
  
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
