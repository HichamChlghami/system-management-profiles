

  import Design from '../../components/design';

function App() {
  const title_home = "Excel to PDF Converter";
  const des_home = "Convert from Excel To PDF online with <span class='sitfile_span'>sitfile</span>  Fast and secure";

  const title1 = "How to convert from Excel to PDF ?";
  const des1 = "1. Begin by selecting your Excel files with the 'Choose Excel' button.";
  const des2 = "2. Initiate the conversion process by clicking 'Convert to PDF'.";
  const des3 = "3. Once the status reads 'Done', hit 'Download PDF' to retrieve your converted files.";

  const title2 = "Simplicity at its Core";
  const how_des1 = "Just upload your Excel files and tap 'Convert'. Our tool guarantees the highest quality PDF conversion.";

  const title3 = "Unbeatable Features";
  const how_des2 = "Effortlessly convert batches of Excel files to PDF with our tool, which also accommodates animated Excel files.";

  const title4 = "Sercurity";
  const how_des3 = "Enjoy the benefits of Sercurity, and universally compatible tool accessible from any web browser. For added security and privacy, files are automatically deleted after a few hours.";

  const type_file = 'Excel';
  const format_type = '.xlsx, .xls';

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

   
<title> convert excel to pdf</title>
  <meta name="description" content="Convert From Excel To PDF Online  Fast, Secure and in few clicks" />

  <link rel="canonical" href="https://www.sitfile.com/document/excel-pdf" />

 

    </>
  );
}

export default App;
