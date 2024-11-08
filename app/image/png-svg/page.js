







  import Design from '../../components/design';

function App() {
  const title_home = "PNG to SVG Converter";
  const des_home = "Convert PNG to SVG online with <span class='sitfile_span'>sitfile</span>—fast, secure, and entirely web-based.";
  
  const title1 = "How to Convert PNG to SVG?";
  const des1 = "1. Select your PNG files using the 'Choose PNG' button.";
  const des2 = "2. Start the conversion by clicking 'Convert to SVG.'";
  const des3 = "3. Once done, click 'Download SVG' to save your converted files.";
  
  const title2 = "Simplicity at its Core";
  const how_des1 = "Upload your PNG files, tap 'Convert,' and let our online service handle the rest for high-quality SVG conversion.";
  
  const title3 = "Unbeatable Features";
  const how_des2 = "Easily convert batches of PNG files to SVG—our web-based converter supports all PNG file types.";
  
  const title4 = "Security";
  const how_des3 = "Enjoy a secure, universally compatible web tool accessible from any browser. For added privacy, files are deleted automatically after a few hours.";
  
  const type_file = 'PNG';
  const format_type = '.png';

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
<title> convert png to svg</title>
  <meta name="description" content="Convert From image To SVG Online  Fast, Secure and in few clicks" />

  <link rel="canonical" href="https://www.sitfile.com/image/png-svg" />


    </>
  );
}

export default App;
