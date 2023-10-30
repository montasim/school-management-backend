import { AuthenticationService } from "./authentication.service.js";

const loginController = async (req, res) => {
    try {
        const {
            userName,
            password,
        } = req?.body;
        const loginDetails = {
            userName,
            password
        };
        const loginServiceResponse = await AuthenticationService.loginService(req?.db, loginDetails);
        const returnData = {
            data: loginServiceResponse?.data,
            success: loginServiceResponse?.success,
            status: loginServiceResponse?.status,
            message: loginServiceResponse?.message,
        };

        return res.status(loginServiceResponse?.status).json(returnData);
    } catch (error) {
        res.status(500).json(error);
    }
};

const signupController = async (req, res) => {
    try {
        const {
            name,
            userName,
            password,
            confirmPassword,
        } = req?.body;
        const signupDetails = {
            name,
            userName,
            password,
            confirmPassword,
        };
        const createAdministrationServiceResponse = await AuthenticationService.signupService(req?.db, signupDetails);
        const returnData = {
            data: createAdministrationServiceResponse?.data,
            success: createAdministrationServiceResponse?.success,
            status: createAdministrationServiceResponse?.status,
            message: createAdministrationServiceResponse?.message,
        };

        return res.status(createAdministrationServiceResponse?.status).json(returnData);
    } catch (error) {
        res.status(500).json(error);
    }
};

const resetPasswordController = async (req, res) => {
    try {
        const { administrationId } = req?.params;
        const {
            name,
            category,
            designation,
            image,
            requestedBy
        } = req?.body;
        const newAdministrationDetails = {
            name,
            category,
            designation,
            image,
            requestedBy
        };
        const updatedAdministrationServiceResponse = await AuthenticationService.updateAAdministrationService(req?.db, administrationId, newAdministrationDetails);
        const returnData = {
            data: updatedAdministrationServiceResponse?.data,
            success: updatedAdministrationServiceResponse?.success,
            status: updatedAdministrationServiceResponse?.status,
            message: updatedAdministrationServiceResponse?.message,
        };

        return res.status(updatedAdministrationServiceResponse?.status).json(returnData);
    } catch (error) {
        res.status(500).json(error);
    }
};

const deleteUserController = async (req, res) => {
    try {
        const { administrationId } = req?.params;
        const { requestedBy } = req?.query;
        const deletedAdministrationServiceResponse = await AuthenticationService.deleteAAdministrationService(req?.db, requestedBy, administrationId);
        const returnData = {
            data: deletedAdministrationServiceResponse?.data,
            success: deletedAdministrationServiceResponse?.success,
            status: deletedAdministrationServiceResponse?.status,
            message: deletedAdministrationServiceResponse?.message,
        };

        return res.status(deletedAdministrationServiceResponse?.status).json(returnData);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const AuthenticationController = {
    loginController,
    signupController,
    resetPasswordController,
    deleteUserController,
};