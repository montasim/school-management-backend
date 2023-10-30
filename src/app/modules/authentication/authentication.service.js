import { StatusCodes } from "http-status-codes";
import { ADMIN_COLLECTION_NAME, SECRET_TOKEN } from "../../../constants/index.js";
import isRequesterValid from "../../../shared/isRequesterValid.js";
import isAdministrationValid from "../../../shared/isAdministrationValid.js";

const loginService = async (db,  loginDetails) => {
    try {
        const {
            username,
            password,
        } = loginDetails;

        const foundUserDetails = await db
            .collection(ADMIN_COLLECTION_NAME)
            .findOne({ username: username }, { projection: { _id: 0 } });

        if (foundUserDetails) {
            if (foundUserDetails?.password === password) {
                return {
                    data: SECRET_TOKEN,
                    success: true,
                    status: 200,
                    message: 'Authorized'
                };
            } else {
                return {
                    data: {},
                    success: false,
                    status: StatusCodes.UNAUTHORIZED,
                    message: 'Unauthorized'
                };
            }
        } else {
            return {
                data: {},
                success: false,
                status: StatusCodes.UNAUTHORIZED,
                message: 'Unauthorized'
            };
        }
    } catch (error) {
        throw error;
    }
};

const signupService = async (db) => {
    try {
        const administrationList = await db
            .collection(ADMIN_COLLECTION_NAME)
            .find({}, { projection: { _id: 0 } })
            .toArray();

        if (administrationList?.length > 0) {
            return {
                data: administrationList,
                success: false,
                status: StatusCodes.OK,
                message: `${administrationList?.length} administration found`
            };
        } else {
            return {
                data: {},
                success: false,
                status: StatusCodes.NOT_FOUND,
                message: 'No administration found'
            };
        }
    } catch (error) {
        throw error;
    }
};

const resetPasswordService = async (db, administrationId) => {
    try {
        const foundAdministration = await db
            .collection(ADMIN_COLLECTION_NAME)
            .findOne({ id: administrationId }, { projection: { _id: 0 } });

        if (foundAdministration) {
            return {
                data: foundAdministration,
                success: true,
                status: StatusCodes.OK,
                message: `${administrationId} found successfully`
            };
        } else {
            return {
                data: {},
                success: true,
                status: StatusCodes.NOT_FOUND,
                message: `${administrationId} not found`
            };
        }
    } catch (error) {
        throw error;
    }
};

const deleteUserService = async (db, requestedBy, administrationId) => {
    try {
        const isValidRequester = await isRequesterValid(db, requestedBy);

        if (isValidRequester) {
            const isAdministrationExists = await isAdministrationValid(db, administrationId);

            if (isAdministrationExists) {
                const deleteResult = await db
                    .collection(ADMIN_COLLECTION_NAME)
                    .deleteOne({ id: administrationId });

                if (deleteResult?.deletedCount === 1) {
                    return {
                        data: {},
                        success: true,
                        status: StatusCodes.OK,
                        message: `${administrationId} deleted successfully`,
                    };
                } else {
                    return {
                        data: {},
                        success: false,
                        status: StatusCodes.UNPROCESSABLE_ENTITY,
                        message: `${administrationId} could not be deleted`,
                    };
                }
            } else {
                return {
                    data: {},
                    success: false,
                    status: StatusCodes.NOT_FOUND,
                    message: `${administrationId} not found`,
                };
            }
        } else {
            return {
                data: {},
                success: false,
                status: StatusCodes.UNAUTHORIZED,
                message: 'You do not have necessary permission'
            };
        }
    } catch (error) {
        throw error;
    }
};

export const AuthenticationService = {
    loginService,
    signupService,
    resetPasswordService,
    deleteUserService,
};
