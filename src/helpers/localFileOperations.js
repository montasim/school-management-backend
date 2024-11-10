import fs from 'fs';
import path from 'path';

const generateUniqueFileName = (originalName) => {
    const name = path.parse(originalName).name;
    const ext = path.parse(originalName).ext;
    const timestamp = Date.now(); // You could also use a UUID for more uniqueness if needed
    return `${name}-${timestamp}${ext}`;
};

const uploadFile = async (file) => {
    // Define base directory and check for file existence
    const baseDir = path.join(process.cwd(), 'files');
    let fileName = file.originalname;
    let filePath = path.join(baseDir, fileName);

    // Generate unique file name if file exists
    if (fs.existsSync(filePath)) {
        fileName = generateUniqueFileName(file.originalname);
        filePath = path.join(baseDir, fileName);
    }

    // Ensure the 'files' directory exists
    if (!fs.existsSync(baseDir)) {
        fs.mkdirSync(baseDir, { recursive: true });
    }

    // Write file to the path
    await fs.promises.writeFile(filePath, file.buffer);
    
    return { fileId: fileName, filePath };
};

const deleteFile = async (fileId) => {
    const filePath = path.join(process.cwd(), 'files', fileId);

    try {
        // Check if the file exists before trying to delete it
        await fs.promises.access(filePath, fs.constants.F_OK);
        await fs.promises.unlink(filePath);
    } catch (error) {
        if (error.code === 'ENOENT') {
        } else {
            // Re-throw the error if it's not a 'file not found' error
            throw error;
        }
    }
};

const localFileOperations = {
    uploadFile,
    deleteFile,
};

export default localFileOperations;
