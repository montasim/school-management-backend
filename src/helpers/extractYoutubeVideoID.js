/**
 * @fileoverview This module provides a utility function to extract the YouTube video ID from a given URL.
 * It supports various formats of YouTube URLs, including standard links, shortened links, and embed links.
 */

/**
 * Extracts the YouTube video ID from a given URL.
 *
 * The function uses a regular expression to match different formats of YouTube URLs and extract the video ID.
 * The supported URL formats include standard YouTube links, shortened (youtu.be) links, and embed links.
 * The function returns the video ID if a valid format is provided, otherwise, it returns null.
 *
 * @param {string} url - The YouTube URL from which to extract the video ID.
 * @returns {string|null} The extracted YouTube video ID, or null if the URL format is not valid or the ID is not found.
 * @example
 * // returns 'y9or2tqqfuE'
 * extractYoutubeVideoID('https://www.youtube.com/watch?v=y9or2tqqfuE');
 *
 * @example
 * // returns 'voRcOUggWcw'
 * extractYoutubeVideoID('https://youtu.be/voRcOUggWcw?si=Ufi0GnpHWf2lH7sq');
 *
 * @example
 * // returns null for invalid URL
 * extractYoutubeVideoID('https://example.com');
 */
const extractYoutubeVideoID = (url) => {
    // Regular expression to match various formats of YouTube URLs and extract the video ID.
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);

    // Check if the URL matches the regular expression and if the extracted string has the length of a typical YouTube video ID (11 characters).
    return (match && match[2].length === 11) ? match[2] : null;
};


export default extractYoutubeVideoID;