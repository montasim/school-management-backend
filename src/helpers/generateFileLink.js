import { STORAGE_BACKEND } from '../config/config.js';

const generateFileLink = (req, uploadFileResponse) => {
    // Dynamically create the server base URL
    const SERVER_BASE_URL = `${req.protocol}://${req.get('host')}`;

    let fileLink;
    if (STORAGE_BACKEND === 'local') {
        fileLink = uploadFileResponse.fileId ? `${SERVER_BASE_URL}/files/${uploadFileResponse.fileId}` : null
    } else {
        fileLink = uploadFileResponse?.downloadLink
    }

    return fileLink;
};

export default generateFileLink;