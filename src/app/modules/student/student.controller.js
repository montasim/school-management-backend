import { StudentService } from "./student.service.js";
const createStudentController = async (req, res) => {
    try {
        const {
            name,
            level,
            image,
            requestedBy
        } = req?.body;
        const newStudentDetails = {
            name,
            level,
            image,
            requestedBy
        };
        const createStudentServiceResponse = await StudentService.createStudentService(req?.db, newStudentDetails);
        const returnData = {
            data: createStudentServiceResponse?.data,
            success: createStudentServiceResponse?.success,
            status: createStudentServiceResponse?.status,
            message: createStudentServiceResponse?.message,
        };

        return res.status(createStudentServiceResponse?.status).json(returnData);
    } catch (error) {
        res.status(500).json(error);
    }
};

const getStudentListController = async (req, res) => {
    try {
        const createStudentServiceResponse = await StudentService.getStudentListService(req?.db);
        const returnData = {
            data: createStudentServiceResponse?.data,
            success: createStudentServiceResponse?.success,
            status: createStudentServiceResponse?.status,
            message: createStudentServiceResponse?.message,
        };

        return res.status(createStudentServiceResponse?.status).json(returnData);
    } catch (error) {
        res.status(500).json(error);
    }
};

const getAStudentController = async (req, res) => {
    try {
        const { studentId } = req?.params;
        const createStudentServiceResponse = await StudentService.getAStudentService(req?.db, studentId);
        const returnData = {
            data: createStudentServiceResponse?.data,
            success: createStudentServiceResponse?.success,
            status: createStudentServiceResponse?.status,
            message: createStudentServiceResponse?.message,
        };

        return res.status(createStudentServiceResponse?.status).json(returnData);
    } catch (error) {
        res.status(500).json(error);
    }
};

const updateAStudentController = async (req, res) => {
    try {
        const { studentId } = req?.params;
        const {
            name,
            level,
            image,
            requestedBy
        } = req?.body;
        const newStudentDetails = {
            name,
            level,
            image,
            requestedBy
        };
        const updatedStudentServiceResponse = await StudentService.updateAStudentService(req?.db, studentId, newStudentDetails);
        const returnData = {
            data: updatedStudentServiceResponse?.data,
            success: updatedStudentServiceResponse?.success,
            status: updatedStudentServiceResponse?.status,
            message: updatedStudentServiceResponse?.message,
        };

        return res.status(updatedStudentServiceResponse?.status).json(returnData);
    } catch (error) {
        res.status(500).json(error);
    }
};

const deleteAStudentController = async (req, res) => {
    try {
        const { studentId } = req?.params;
        const { requestedBy } = req?.query;
        const deletedStudentServiceResponse = await StudentService.deleteAStudentService(req?.db, requestedBy, studentId);
        const returnData = {
            data: deletedStudentServiceResponse?.data,
            success: deletedStudentServiceResponse?.success,
            status: deletedStudentServiceResponse?.status,
            message: deletedStudentServiceResponse?.message,
        };

        return res.status(deletedStudentServiceResponse?.status).json(returnData);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const StudentController = {
    createStudentController,
    getStudentListController,
    getAStudentController,
    updateAStudentController,
    deleteAStudentController
};