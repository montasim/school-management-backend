import googleDriveFileOperations from './googleDriveFileOperationsNew.js';
import s3FileOperations from './s3FileOperations.js';
import localFileOperations from './localFileOperations.js';
import { STORAGE_BACKEND } from '../config/config.js';

class FileManager {
    constructor() {
        switch (STORAGE_BACKEND) {
            case 'local':
                this.fileService = localFileOperations;
                break;
            case 's3':
                this.fileService = s3FileOperations;
                break;
            case 'googleDrive':
            default:
                this.fileService = googleDriveFileOperations;
                break;
        }
    }

    getFileService() {
        return this.fileService;
    }
}

const fileManager = new FileManager().getFileService();

// Export an instance to use the same file service across the application
export default fileManager;