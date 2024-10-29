import googleDriveFileOperations from './googleDriveFileOperationsNew.js';
import s3FileOperations from './s3FileOperations.js';
import localFileOperations from './localFileOperations.js';
import { STORAGE_BACKEND } from '../config/config.js';

class FileManager {
    constructor() {
        switch (STORAGE_BACKEND) {
            case 'googleDrive':
                this.fileService = googleDriveFileOperations;
                break;
            case 's3':
                this.fileService = s3FileOperations;
                break;
            case 'local':
            default:
                this.fileService = localFileOperations;
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