import { Readable } from "stream";
import logger from "../shared/logger.js";

/**
 * Converts a Buffer into a Readable Stream.
 *
 * This function takes a buffer and returns a Readable stream that can be used in
 * places where a stream is required, such as in file uploads or data processing pipelines.
 * The stream is created, the buffer is pushed into the stream, and then it is closed
 * with a 'null' to signify the end of the stream data.
 *
 * @param {Buffer} buffer - The buffer to convert into a stream.
 * @returns {Readable} A Readable stream containing the data from the buffer.
 */
const convertBufferToStream = (buffer) => {
    try {
        const stream = new Readable();

        stream.push(buffer);
        stream.push(null); // Signifies the end of the stream (EOF).

        return stream;
    } catch (error) {
        logger.error(error);

        return error;
    }
};

export default convertBufferToStream;