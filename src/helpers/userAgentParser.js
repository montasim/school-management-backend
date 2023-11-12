/**
 * @fileoverview Browser Information Extractor
 *
 * This module provides functionality to extract detailed browser and device information
 * from a user-agent string. It utilizes the 'user-agent-parser' library to parse the user-agent
 * string from HTTP request headers and extracts key information such as browser name and version,
 * operating system name and version, and device model. This data can be used for analytics,
 * logging, or providing a tailored user experience based on the client's browser or device.
 *
 * @module extractBrowserInfo
 * @requires user-agent-parser - A library for parsing user-agent strings.
 * @requires logger - Shared logger module for logging errors.
 */

import userAgentParser from "user-agent-parser";
import logger from "../shared/logger.js";

/**
 * Extracts browser and device information from a user-agent string.
 *
 * Parses the provided user-agent string to extract information about the client's browser,
 * operating system, and device. This information can be useful for logging, analytics,
 * or customizing content based on the client's environment.
 *
 * @function
 * @param {string} userAgent - The user-agent string from the request header.
 * @returns {Object} An object containing browser and device information.
 */
const extractBrowserInfo = (userAgent) => {
    try {
        const parsedUserAgent = userAgentParser(userAgent);

        return {
            browser: parsedUserAgent.browser.name,
            browserVersion: parsedUserAgent.browser.version,
            os: parsedUserAgent.os.name,
            osVersion: parsedUserAgent.os.version,
            device: parsedUserAgent.device.model || 'Unknown Device'
        };
    } catch (error) {
        logger.error(error);

        return error;
    }
};

export default extractBrowserInfo;