













  import Design from '../../components/design';

function App() {
  const title_home = "PDF to Excel Converter";
  const des_home = "Convert from PDF To Excel online free, fast, secure, and in a few clicks";

  const title1 = "How to convert from PDF to Excel ?";
  const des1 = "1. Begin by selecting your PDF files with the 'Choose PDF' button.";
  const des2 = "2. Initiate the conversion process by clicking 'Convert to Excel'.";
  const des3 = "3. Once the status reads 'Done', hit 'Download Excel' to retrieve your converted files.";

  const title2 = "Simplicity at its Core";
  const how_des1 = "Just upload your PDF files and tap 'Convert'. Our tool guarantees the highest quality Excel conversion.";

  const title3 = "Unbeatable Features";
  const how_des2 = "Effortlessly convert batches of PDF files to Excel with our tool, which also accommodates animated PDF files.";

  const title4 = "Free and Secure";
  const how_des3 = "Enjoy the benefits of a free, secure, and universally compatible tool accessible from any web browser. For added security and privacy, files are automatically deleted after a few hours.";

  const type_file = 'PDF';
  const format_type = '.PDF';

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

      <title>  convert pdf to excel</title>
  <meta name="description" content="Convert From PDF To Excel Online Free, Fast, Secure and in few clicks" />

  <link rel="canonical" href="https://www.sitfile.com/document/pdf-excel" />








    </>
  );
}

export default App;
