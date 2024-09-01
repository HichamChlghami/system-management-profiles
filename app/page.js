import Design from './components/design';
import Head from 'next/head';

function App() {
  const title_home = "Sit a File and Let us convert it";
  const des_home = "Seamlessly switch file formats with <span class='sitfile_span'>sitfile</span> platform";

  const title1 = 'How to convert a file?';
  const des1 = '1. Convert your files easily by starting with selecting them using the "Choose Files" button';
  const des2 = '2. Initiate the conversion process by choosing the desired format and clicking convert to';
  const des3 = '3. Once the conversion is complete, click "Download" to retrieve your converted files';

  const title2 = 'Simplicity at its Core';
  const how_des1 = 'Just upload your files and tap "Convert". Our tool guarantees the highest quality conversion. Unbeatable Features';

  const title3 = 'Unbeatable Features';
  const how_des2 = 'Effortlessly convert batches of files with our tool, which accommodates any file formats.';

  const title4 = 'Free and Secure';
  const how_des3 = 'Enjoy the benefits of a free, secure, and universally compatible tool accessible from any web browser. For added security and privacy, files are automatically deleted after a few hours.';

  const type_file = 'files';
  const format_type = 'file';

  return (
    <>
      <Head>
        <title>sitfile | converter, compression and background remover platform</title>
        <meta name="description" content="Convert & compress Files Above 1500+ Formats, Fast, Secure and Easy-to-use online tool, Supports Images, Documents, Audios, Videos and more" />
        <link rel="canonical" href="https://www.sitfile.com" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9350232533240680" crossorigin="anonymous"></script>
      </Head>
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
    </>
  );
}

export default App;

