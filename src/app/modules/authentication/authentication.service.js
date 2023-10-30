import { ADMIN_COLLECTION_NAME, SECRET_TOKEN } from "../../../constants/index.js";
import isRequesterValid from "../../../shared/isRequesterValid.js";
import isAdministrationValid from "../../../shared/isAdministrationValid.js";

const loginService = async (db,  loginDetails) => {
    try {
        const {
            userName,
            password,
        } = loginDetails;

        const foundUserDetails = await db
            .collection(ADMIN_COLLECTION_NAME)
            .findOne({ userName: userName }, { projection: { _id: 0 } });

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
                    status: 401,
                    message: 'Unauthorized'
                };
            }
        } else {
            return {
                data: {},
                success: false,
                status: 401,
                message: 'Unauthorized'
            };
        }
    } catch (error) {
        throw error;
    }
};

const signupService = async (db, signupDetails) => {
    try {
        const {
            name,
            userName,
            password,
            confirmPassword,
        } = signupDetails;
        const foundUserDetails = await db
            .collection(ADMIN_COLLECTION_NAME)
            .findOne({ userName: userName }, { projection: { _id: 0 } });

        if (foundUserDetails) {
            return {
                data: {},
                success: false,
                status: 422,
                message: `${userName} already exists`
            };
        } else {
            if (password === confirmPassword) {
                const prepareNewUserDetails = {
                    id: `admin-${uuidv4().substr(0, 6)}`,
                    name: name,
                    userName: userName,
                    password: password,
                    createdAt: new Date(),
                };
    
                const createNewUserResult = await db
                    .collection(ADMIN_COLLECTION_NAME)
                    .insertOne(prepareNewUserDetails);
    
                if (createNewUserResult?.acknowledged) {
                    delete prepareNewUserDetails?._id;
    
                    return {
                        data: prepareNewUserDetails,
                        success: true,
                        status: 200,
                        message: `${prepareNewUserDetails?.name} created successfully`
                    };
                } else {
                    return {
                        data: {},
                        success: false,
                        status: 500,
                        message: 'Failed to create'
                    };
                }
            } else {
                return {
                    data: {},
                    success: false,
                    status: 422,
                    message: 'Password did not matched'
                };
            }
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
                status: 200,
                message: `${administrationId} found successfully`
            };
        } else {
            return {
                data: {},
                success: true,
                status: 404,
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
                        status: 200,
                        message: `${administrationId} deleted successfully`,
                    };
                } else {
                    return {
                        data: {},
                        success: false,
                        status: 422,
                        message: `${administrationId} could not be deleted`,
                    };
                }
            } else {
                return {
                    data: {},
                    success: false,
                    status: 404,
                    message: `${administrationId} not found`,
                };
            }
        } else {
            return {
                data: {},
                success: false,
                status: 401,
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
