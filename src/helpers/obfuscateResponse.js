import logger from "../shared/logger.js";

const obfuscateResponse = (data) => {
    try {
        if (typeof data === 'object') {
            // Convert the object to a JSON string and then to a Base64 string
            return Buffer.from(JSON.stringify(data)).toString('base64');
        }

        return data;
    } catch (error) {
        logger.error(error);

        return error;
    }
}

export default obfuscateResponse;