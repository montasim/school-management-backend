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
    console.log(fileId)
    const filePath = path.join(process.cwd(), 'files', fileId);
    await fs.promises.unlink(filePath);
};

const localFileOperations = {
    uploadFile,
    deleteFile,
};

export default localFileOperations;
