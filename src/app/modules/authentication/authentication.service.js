import { v4 as uuidv4 } from 'uuid';
import { ADMIN_COLLECTION_NAME } from "../../../config/config.js";
import {
    FORBIDDEN_MESSAGE,
    STATUS_FORBIDDEN,
    STATUS_INTERNAL_SERVER_ERROR,
    STATUS_OK,
    STATUS_UNAUTHORIZED,
    STATUS_UNPROCESSABLE_ENTITY
} from "../../../constants/constants.js";
import findById from "../../../shared/findById.js";
import findByUserName from "../../../shared/findByUserName.js";
import isValidRequest from "../../../shared/isValidRequest.js";
import deleteById from "../../../shared/deleteById.js";
import generateResponseData from "../../../shared/generateResponseData.js";
import addANewEntryToDatabase from "../../../shared/addANewEntryToDatabase.js";
import updateById from "../../../shared/updateById.js";
import createAuthenticationToken from "../../../helpers/createAuthenticationToken.js";
import logger from "../../../shared/logger.js";

/**
 * Service to authenticate a user using their login details.
 * @async
 * @param {Object} db - DatabaseMiddleware instance.
 * @param {Object} loginDetails - The login details provided.
 * @returns {Object} Result object containing status, message and data.
 */
const loginService = async (db,  loginDetails) => {
    try {
        const { userName, password } = loginDetails;
        const foundAdminDetails = await findByUserName(db, ADMIN_COLLECTION_NAME, userName);

        delete foundAdminDetails?._id;

        if (foundAdminDetails) {
            if (foundAdminDetails?.password === password) {
                const token = await createAuthenticationToken(foundAdminDetails);

                if (token) {
                    const returnData = {
                        name: foundAdminDetails?.name,
                        userName: foundAdminDetails?.userName,
                        token: token,
                    }
                    return generateResponseData(returnData, true, STATUS_OK, "Authorized");
                } else {
                    return generateResponseData({}, false, STATUS_UNAUTHORIZED, "Unauthorized");
                }
            } else {
                return generateResponseData({}, false, STATUS_UNAUTHORIZED, "Unauthorized");
            }
        } else {
            return generateResponseData({}, false, STATUS_UNAUTHORIZED, "Unauthorized");
        }
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * Service to authenticate an admin using their login token.
 * @async
 * @param {Object} db - DatabaseMiddleware instance.
 * @param {Object} adminId - The login details provided.
 * @returns {Object} Result object containing status, message and data.
 */
const verifyUserService = async (db,  adminId) => {
    try {
        const foundAdminDetails = await findById(db, ADMIN_COLLECTION_NAME, adminId);

        delete foundAdminDetails?._id;

        return foundAdminDetails
            ? generateResponseData({}, true, STATUS_OK, "Authorized")
            : generateResponseData({}, false, STATUS_UNAUTHORIZED, "Unauthorized");
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * Creates a new admin entry in the database.
 *
 * @async
 * @param {Object} db - DatabaseMiddleware connection object.
 * @param signupDetails
 * @returns {Object} - The response after attempting admin creation.
 * @throws {Error} Throws an error if any.
 */
const signupService = async (db, signupDetails) => {
    try {
        const { name, userName, password, confirmPassword } = signupDetails;
        const foundUserDetails = await findByUserName(db, ADMIN_COLLECTION_NAME, userName);

        if (foundUserDetails) {
            return generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, `${userName} already exists`);
        } else {
            if (password === confirmPassword) {
                const prepareNewUserDetails = {
                    id: `admin-${uuidv4().substr(0, 6)}`,
                    name: name,
                    userName: userName,
                    password: password,
                    createdAt: new Date(),
                };
                const result = await addANewEntryToDatabase(db, ADMIN_COLLECTION_NAME, prepareNewUserDetails);
                const latestData = await findById(db, ADMIN_COLLECTION_NAME, prepareNewUserDetails?.id);

                delete latestData?._id;
                delete latestData?.id;
                delete latestData?.password;

                return result?.acknowledged
                    ? generateResponseData(latestData, true, STATUS_OK, `${prepareNewUserDetails?.userName} created successfully`)
                    : generateResponseData({}, false, STATUS_INTERNAL_SERVER_ERROR, 'Failed to create. Please try again');

            } else {
                return generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, "Password did not matched");
            }
        }
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * Service to reset a user's password.
 * @async
 * @param {Object} db - DatabaseMiddleware instance.
 * @param {Object} resetPasswordDetails - New password details.
 * @returns {Object} Result object containing status, message and data.
 */
const resetPasswordService = async (db, resetPasswordDetails) => {
    try {
        const { adminId } = resetPasswordDetails;
        const foundAdmin = await findById(db, ADMIN_COLLECTION_NAME, adminId);

        if (foundAdmin) {
            const { oldPassword, newPassword, confirmNewPassword } = resetPasswordDetails;

            if (newPassword === confirmNewPassword) {
                if (foundAdmin?.password === oldPassword) {
                    if (foundAdmin?.id === adminId) {
                        const updatedAdminDetails = {
                            id: foundAdmin?.id,
                            userName: foundAdmin?.userName,
                            password: newPassword,
                            createdAt: foundAdmin?.createdAt,
                            modifiedAt: new Date(),
                        };
                        const result = await updateById(db, ADMIN_COLLECTION_NAME, adminId, updatedAdminDetails);
                        const latestData = await findById(db, ADMIN_COLLECTION_NAME, adminId);

                        delete latestData?._id;
                        delete latestData?.id;
                        delete latestData?.password;

                        return result?.modifiedCount
                            ? generateResponseData(latestData, true, STATUS_OK, `${adminId} updated successfully`)
                            : generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, `${adminId} not updated`);

                    } else {
                        return generateResponseData({}, false, STATUS_FORBIDDEN, "Forbidden");
                    }
                } else {
                    return generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, "Wrong password");
                }
            } else {
                return generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, "Password did not matched");
            }
        } else {
            return generateResponseData({}, false, STATUS_FORBIDDEN, "Forbidden");
        }
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * Service to delete a user.
 * @async
 * @param {Object} db - DatabaseMiddleware instance.
 * @param deleteAdminDetails
 * @returns {Object} Result object containing status, message and data.
 */
const deleteUserService = async (db, deleteAdminDetails) => {
    try {
        const { adminId } = deleteAdminDetails;
        if (!await isValidRequest(db, adminId))
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);

        const result = await deleteById(db, ADMIN_COLLECTION_NAME, adminId);

        return result
            ? generateResponseData({}, true, STATUS_OK, `${adminId} deleted successfully`)
            : generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, `${adminId} could not be deleted`);

    } catch (error) {
        logger.error(error);

        return error;
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
    verifyUserService,
    signupService,
    resetPasswordService,
    deleteUserService,
};
