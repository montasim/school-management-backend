import { v4 as uuidv4 } from 'uuid';
import {ADMIN_COLLECTION_NAME, SECRET_TOKEN} from "../../../constants/index.js";

/**
 * Service to authenticate a user using their login details.
 * @async
 * @param {Object} db - Database instance.
 * @param {Object} loginDetails - The login details provided.
 * @returns {Object} Result object containing status, message and data.
 */
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
                const returnData = {
                    id: foundUserDetails?.id,
                    token: SECRET_TOKEN,
                }
                return {
                    data: returnData,
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

/**
 * Service to sign up a new user.
 * @async
 * @param {Object} db - Database instance.
 * @param {Object} signupDetails - The signup details provided.
 * @returns {Object} Result object containing status, message and data.
 */
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
            console.log(signupDetails)
            if (password === confirmPassword) {
                const prepareNewUserDetails = {
                    id: `admin-${uuidv4().substr(0, 6)}`,
                    name: name,
                    userName: userName,
                    password: password,
                    createdAt: new Date(),
                };

                console.log(prepareNewUserDetails)
    
                const createNewUserResult = await db
                    .collection(ADMIN_COLLECTION_NAME)
                    .insertOne(prepareNewUserDetails);
    
                if (createNewUserResult?.acknowledged) {
                    delete prepareNewUserDetails?._id;
                    delete prepareNewUserDetails?.password;

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

/**
 * Service to reset a user's password.
 * @async
 * @param {Object} db - Database instance.
 * @param {string} adminId - ID of the admin whose password needs to be reset.
 * @param {Object} resetPasswordDetails - New password details.
 * @returns {Object} Result object containing status, message and data.
 */
const resetPasswordService = async (db, adminId, resetPasswordDetails) => {
    try {
        const foundAdmin = await db
            .collection(ADMIN_COLLECTION_NAME)
            .findOne({ id: adminId }, { projection: { _id: 0 } });

        if (foundAdmin) {
            const {
                password,
                confirmPassword,
                requestedBy
            } = resetPasswordDetails;

            if (password === confirmPassword) {
                if (foundAdmin?.userName === requestedBy) {
                    const updatedAdminDetails = {
                        id: foundAdmin?.id,
                        userName: foundAdmin?.userName,
                        ...(password && { password }),
                        createdAt: foundAdmin?.createdAt,
                        modifiedAt: new Date(),
                    };
                    const updateAdminDataResult = await db
                        .collection(ADMIN_COLLECTION_NAME)
                        .updateOne(
                            { id: adminId },
                            { $set: updatedAdminDetails },
                        );

                    if (updateAdminDataResult?.modifiedCount > 0) {
                        const updatedData = await db
                            .collection(ADMIN_COLLECTION_NAME)
                            .findOne({ id: adminId });

                        delete updatedData._id;

                        return {
                            data: updatedData,
                            success: true,
                            status: 200,
                            message: `${adminId} updated successfully`
                        };
                    } else {
                        return {
                            data: {},
                            success: true,
                            status: 422,
                            message: `${adminId} not updated`
                        };
                    }
                } else {
                    return {
                        data: {},
                        success: false,
                        status: 403,
                        message: 'Unauthorized'
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
        } else {
            return {
                data: {},
                success: true,
                status: 404,
                message: `${adminId} not found`
            };
        }
    } catch (error) {
        throw error;
    }
};

/**
 * Service to delete a user.
 * @async
 * @param {Object} db - Database instance.
 * @param {string} requestedBy - The username of the requester.
 * @param {string} adminId - ID of the admin to be deleted.
 * @returns {Object} Result object containing status, message and data.
 */
const deleteUserService = async (db, requestedBy, adminId) => {
    try {
        const foundAdmin = await db
            .collection(ADMIN_COLLECTION_NAME)
            .findOne({ id: adminId }, { projection: { _id: 0 } });

        if (foundAdmin) {
            if (foundAdmin?.userName === requestedBy) {
                const deleteResult = await db
                    .collection(ADMIN_COLLECTION_NAME)
                    .deleteOne({ id: adminId });

                if (deleteResult?.deletedCount === 1) {
                    return {
                        data: {},
                        success: true,
                        status: 200,
                        message: `${adminId} deleted successfully`,
                    };
                } else {
                    return {
                        data: {},
                        success: false,
                        status: 422,
                        message: `${adminId} could not be deleted`,
                    };
                }
            } else {
                return {
                    data: {},
                    success: false,
                    status: 404,
                    message: `${adminId} not found`,
                };
            }
        } else {
            return {
                data: {},
                success: false,
                status: 403,
                message: 'Unauthorized'
            };
        }
    } catch (error) {
        throw error;
    }
};

/**
 * @typedef {Object} AuthenticationService
 * @property {Function} loginService - Service function for user login.
 * @property {Function} signupService - Service function for user signup.
 * @property {Function} resetPasswordService - Service function to reset user password.
 * @property {Function} deleteUserService - Service function to delete a user.
 */
export const AuthenticationService = {
    loginService,
    signupService,
    resetPasswordService,
    deleteUserService,
};
