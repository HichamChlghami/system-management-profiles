// src/utils/progressCheck.js

import axios from 'axios';

const CheckConversionProgress = async (apiUrl, setTotalConversionProgress) => {
  try {
    const responseVideoAudio = await axios.get(`${apiUrl}/progressVideoAudio`);
    const progress0 = responseVideoAudio.data.progress;

    const responseImageTxt = await axios.get(`${apiUrl}/progressImageTxt`);
    const progress1 = responseImageTxt.data.progress;

    const responseEbook = await axios.get(`${apiUrl}/progressEbook`);
    const progress2 = responseEbook.data.progress;

    const responseOffice = await axios.get(`${apiUrl}/progressOffice`);
    const progress3 = responseOffice.data.progress;

    const responseHtml = await axios.get(`${apiUrl}/progressHtml`);
    const progressHtml = responseHtml.data.progress;

    const responseImage = await axios.get(`${apiUrl}/progressImage`);
    const progressImage = responseImage.data.progress;

    const responseImageDocx = await axios.get(`${apiUrl}/progressImageDocx`);
    const progressImageDocx = responseImageDocx.data.progress;

    const responseMicro = await axios.get(`${apiUrl}/progressMicro`);
    const progressMicro = responseMicro.data.progress;

    setTotalConversionProgress({
      ...progress0,
      ...progress1,
      ...progress2,
      ...progress3,
      ...progressHtml,
      ...progressImage,
      ...progressImageDocx,
      ...progressMicro
    });

  } catch (error) {
    console.log('Error while checking conversion progress:');
  }
};

export default CheckConversionProgress;
