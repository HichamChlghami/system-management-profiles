import axios from "axios";
import { validFormats } from "./availableFormats";

async function Handlefiles(files, individualSelectedFormats, setType, apiUrl, setConvert, setConversionProgress) {
    // Inner function to handle file uploads
    const handleUpload = async (url, formData, fileName, totalChunks, fileSize, totalUploaded) => {
        try {
            const response = await axios.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: (progressEvent) => {
                    const chunkProgress = progressEvent.loaded / progressEvent.total;
                    const cumulativeProgress = Math.min(((totalUploaded + chunkProgress * (fileSize / totalChunks)) / fileSize) * 100, 100);
                    setConversionProgress((prevProgress) => ({
                        ...prevProgress,
                        [fileName]: Math.round(cumulativeProgress),
                    }));
                },
            });
            return response;
        } catch (error) {
            console.log('An error occurred during the upload of' , error);
            throw error;
        }
    };

    // Define valid formats for different file types
    try {
        const sanitizeFileName = (fileName) => {
            return fileName.replace(/[ %&?#<>/\\+:;=]/g, '_');
        };

        const typeArray = files.map((file, index) => {
            const sanitizedFileName = sanitizeFileName(file.name);
            const formatMappings = {
                word: 'docx',
                excel: 'xlsx',
            };
            const format = individualSelectedFormats[`${file.name}_${index}`].toLowerCase();
            const convertType = formatMappings[format] || format;
            const fileType = sanitizedFileName + Date.now() + "output." + convertType;
            return fileType;
        });

        setType(typeArray);

        await Promise.all(files.map(async (file, index) => {
            const formatMappings = {
                word: 'docx',
                excel: 'xlsx',
            };
            const format = individualSelectedFormats[`${file.name}_${index}`].toLowerCase();
            const convertType = formatMappings[format] || format;

            const chunkSize = 4 * 64 * 1024; // 1MB
            const totalChunks = Math.ceil(file.size / chunkSize);
            const fileName_read = Date.now() + file.name;
            let totalUploaded = 0;

            for (let i = 0; i < totalChunks; i++) {
                console.log(chunkSize, 'chunkSize');
                const start = i * chunkSize;
                const end = Math.min(file.size, start + chunkSize);
                const chunk = file.slice(start, end);

                const formData = new FormData();
                formData.append('chunk', chunk);
                formData.append('chunkNumber', i);
                formData.append('totalChunks', totalChunks);
                formData.append('fileName', fileName_read);
                formData.append('convertType', convertType);
                formData.append('fileOutput', typeArray[index]);
                formData.append('filename', `${file.name}_${index}`);

                const fileName = file.name;
                const fileExtension = fileName.split('.').pop().toLowerCase();
                const formatChose = individualSelectedFormats[`${fileName}_${index}`].toLowerCase();

                let uploadUrl = '';

                // Determine upload URL based on file type and selected format
                if (validFormats.validImages.includes(fileExtension)) {
                    if (validFormats.image_svg.includes(formatChose)) {
                        uploadUrl = `${apiUrl}/images_svg`;
                    } else if (validFormats.svg.includes(formatChose)) {
                        uploadUrl = `${apiUrl}/office`;
                    } else if (validFormats.imagesDocx.includes(formatChose)) {
                        uploadUrl = `${apiUrl}/imagesDocx`;
                    } else if (validFormats.Txt.includes(formatChose)) {
                        uploadUrl = `${apiUrl}/imagesTxt`;
                    } else if (validFormats.html.includes(formatChose)) {
                        uploadUrl = `${apiUrl}/html`;
                    }
                } else if (validFormats.validPdf.includes(fileExtension)) {
                    if (validFormats.image_svg.concat(validFormats.svg).includes(formatChose)) {
                        uploadUrl = `${apiUrl}/office`;
                    } else if (validFormats.micro.includes(formatChose)) {
                        uploadUrl = `${apiUrl}/micro`;
                    } else if (validFormats.Txt.includes(formatChose)) {
                        uploadUrl = `${apiUrl}/imagesTxt`;
                    } else if (validFormats.html.includes(formatChose)) {
                        uploadUrl = `${apiUrl}/html`;
                    } else if (validFormats.ebook.includes(formatChose)) {
                        uploadUrl = `${apiUrl}/ebook`;
                    }
                } else if (validFormats.validExcel.includes(fileExtension)) {
                    if (validFormats.MergeExcel.includes(formatChose)) {
                        uploadUrl = `${apiUrl}/office`;
                    } else if (validFormats.Txt.includes(formatChose)) {
                        uploadUrl = `${apiUrl}/office`;
                    }
                } else if (validFormats.validMicro.includes(fileExtension)) {
                    if (validFormats.MergeMicro.includes(formatChose)) {
                        uploadUrl = `${apiUrl}/office`;
                    } else if (validFormats.Txt.includes(formatChose)) {
                        uploadUrl = `${apiUrl}/office`;
                    }
                } else if (validFormats.validTxt.includes(fileExtension)) {
                    if (validFormats.image_svg.concat(validFormats.svg).concat(validFormats.MergeExcel).includes(formatChose)) {
                        uploadUrl = `${apiUrl}/office`;
                    } else if (validFormats.imagesDocx.includes(formatChose)) {
                        uploadUrl = `${apiUrl}/micro`;
                    } else if (validFormats.html.includes(formatChose)) {
                        uploadUrl = `${apiUrl}/html`;
                    } else if (validFormats.validTxt.includes(formatChose)) {
                        uploadUrl = `${apiUrl}/office`;
                    }
                } else if (validFormats.validVidoAudio.includes(fileExtension)) {
                    if (validFormats.validVidoAudio.includes(formatChose)) {
                        uploadUrl = `${apiUrl}/videoAudio`;
                    } else if (validFormats.validDevives.includes(formatChose)) {
                        uploadUrl = `${apiUrl}/videoAudio`;
                    }
                } else if (validFormats.validDevives.includes(fileExtension)) {
                    if (validFormats.validDevives.includes(formatChose)) {
                        uploadUrl = `${apiUrl}/videoAudio`;
                    }
                } else {
                    if (validFormats.micro.includes(formatChose)) {
                        uploadUrl = `${apiUrl}/micro`;
                    }if (validFormats.image_svg.includes(formatChose) && formatChose !== 'pdf') {
                        uploadUrl = `${apiUrl}/images_svg`;
                    }else if (validFormats.Txt.includes(formatChose)) {
                        uploadUrl = `${apiUrl}/office`;
                    } else if (validFormats.html.includes(formatChose)) {
                        uploadUrl = `${apiUrl}/html`;
                    }
                    else if (validFormats.validVidoAudio.includes(formatChose)) {
                        uploadUrl = `${apiUrl}/videoAudio`;
                    }  else{
                        uploadUrl = `${apiUrl}/office`;

                    }
                }

                if (uploadUrl) {
                    
                    // Retry upload logic with network checks
                    while (true) {
                        if (!navigator.onLine) {
                            console.log('Network is offline. Waiting for connection...');
                            await new Promise(resolve => {
                                const onlineHandler = () => {
                                    window.removeEventListener('online', onlineHandler);
                                    resolve();
                                };
                                window.addEventListener('online', onlineHandler);
                            });
                        }

                        try {
                            await handleUpload(uploadUrl, formData, fileName, totalChunks, file.size, totalUploaded);
                            totalUploaded += chunk.size; // Update the total uploaded size
                            break; // Break the loop if upload is successful
                        } catch (error) {
                            if (error.message.includes('ERR_ADDRESS_UNREACHABLE')) {
                                console.error('Network unreachable, waiting for connection...');
                                await new Promise(resolve => {
                                    const onlineHandler = () => {
                                        window.removeEventListener('online', onlineHandler);
                                        resolve();
                                    };
                                    window.addEventListener('online', onlineHandler);
                                });
                            } else {
                                console.error('Error during file upload:');
                            }
                        }
                    }
                } else {
                    console.error(`No valid upload URL for `);
                }
            }

            const res = await axios.get(`${apiUrl}/get`);
            setConvert(res.data);

            setTimeout(() => {
                window.location.reload();
                return;
            }, 2 * 60 * 60 * 1000);
        }));
    } catch (error) {
        console.log('An error occurred during the conversion:',);
    }
}

export default Handlefiles;














