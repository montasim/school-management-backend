/**
 * @fileoverview Buffer to Readable Stream Converter.
 *
 * This module contains a utility function that converts a Buffer into a Readable Stream.
 * Such conversion is particularly useful in scenarios where streaming data is required,
 * such as handling file uploads, streaming large data sets, or processing data in a
 * stream-based manner. The function encapsulates the logic for stream creation and
 * management, ensuring that the buffer data is correctly converted into a stream format.
 * This utility helps in abstracting the complexities of stream handling from the main
 * application logic, thereby enhancing code readability and maintainability.
 *
 * @requires stream - Node.js core module for handling streaming data.
 * @requires logger - Shared logging utility for error handling.
 * @module convertBufferToStream - Function to convert a Buffer into a Readable Stream.
 */

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