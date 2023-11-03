/**
 * Event listener for file input changes.
 * When a file is selected, it reads the file, prepares it for upload, and then sends it to a server endpoint.
 */
document.getElementById('files').addEventListener('change', async (event) => {
    /**
     * Gets the selected files from the input event.
     * @type {FileList}
     */
    const files = event.target.files;

    /**
     * Selects the first file from the file list.
     * @type {File}
     */
    const file = files[0];

    /**
     * Creates a new FileReader to read the content of the file.
     * @type {FileReader}
     */
    const fr = new FileReader();

    // Start reading the file as an ArrayBuffer
    fr.readAsArrayBuffer(file);

    /**
     * Event handler that gets called when the file read operation is completed.
     * @param {ProgressEvent<FileReader>} f - The event object containing the result of the read operation.
     */
    fr.onload = async (f) => {
        /**
         * Converts the ArrayBuffer to a Buffer for upload.
         * @type {Buffer}
         */
        const fileBuffer = Buffer.from(f.target.result);

        /**
         * Gets the MIME type of the file.
         * @type {string}
         */
        const mimeType = file.type;

        // Prepare and send the POST request to upload the file
        /**
         * Sends a POST request to the server to upload the file.
         * @type {Response}
         */
        const response = await fetch('/your-server-api-endpoint', {
            method: 'POST',
            body: JSON.stringify({ uniqueFilename: file.name, fileBuffer, mimeType }),
            headers: { 'Content-Type': 'application/json' },
        });

        /**
         * Parses the JSON response from the server.
         * @type {Object}
         */
        const result = await response.json();

        // Log the result to the console
        console.log(result);
    };
});
