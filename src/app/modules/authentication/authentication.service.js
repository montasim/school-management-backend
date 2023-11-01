import { v4 as uuidv4 } from 'uuid';
import { ADMIN_COLLECTION_NAME } from "../../../config/config.js";
import { FORBIDDEN_MESSAGE } from "../../../constants/constants.js";
import findByUserName from "../../../shared/findByUserName.js";
import logger from "../../middlewares/logger.js";
import isValidRequest from "../../../shared/isValidRequest.js";
import deleteById from "../../../shared/deleteById.js";
import createAuthenticationToken from "../../middlewares/createAuthenticationToken.js";
import generateResponseData from "../../../helpers/generateResponseData.js";
import addANewEntryToDatabase from "../../../shared/addANewEntryToDatabase.js";
import updateById from "../../../shared/updateById.js";
import findById from "../../../shared/findById.js";

/**
 * Service to authenticate a user using their login details.
 * @async
 * @param {Object} db - Database instance.
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
                    return generateResponseData(returnData, true, 200, "Authorized");
                } else {
                    return generateResponseData({}, false, 401, "Unauthorized");
                }
            } else {
                return generateResponseData({}, false, 401, "Unauthorized");
            }
        } else {
            return generateResponseData({}, false, 401, "Unauthorized");
        }
    } catch (error) {
        logger.error(error);

        throw error;
    }
};

/**
 * Creates a new admin entry in the database.
 *
 * @async
 * @param {Object} db - Database connection object.
 * @param signupDetails
 * @returns {Object} - The response after attempting admin creation.
 * @throws {Error} Throws an error if any.
 */
const signupService = async (db, signupDetails) => {
    try {
        const { name, userName, password, confirmPassword } = signupDetails;
        const foundUserDetails = await findByUserName(db, ADMIN_COLLECTION_NAME, userName);

        if (foundUserDetails) {
            return generateResponseData({}, false, 422, `${userName} already exists`);
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
                    ? generateResponseData(latestData, true, 200, `${prepareNewUserDetails?.userName} created successfully`)
                    : generateResponseData({}, false, 500, 'Failed to create. Please try again');

            } else {
                return generateResponseData({}, false, 422, "Password did not matched");
            }
        }
    } catch (error) {
        logger.error(error);

        throw error;
    }
};

/**
 * Service to reset a user's password.
 * @async
 * @param {Object} db - Database instance.
 * @param {Object} resetPasswordDetails - New password details.
 * @returns {Object} Result object containing status, message and data.
 */
const resetPasswordService = async (db, resetPasswordDetails) => {
    try {
        const { requestedBy } = resetPasswordDetails;
        const foundAdmin = await findByUserName(db, ADMIN_COLLECTION_NAME, requestedBy);

        if (foundAdmin) {
            const { oldPassword, newPassword, confirmNewPassword } = resetPasswordDetails;

            if (newPassword === confirmNewPassword) {
                if (foundAdmin?.password === oldPassword) {
                    if (foundAdmin?.id === requestedBy) {
                        const updatedAdminDetails = {
                            id: foundAdmin?.id,
                            userName: foundAdmin?.userName,
                            password: newPassword,
                            createdAt: foundAdmin?.createdAt,
                            modifiedAt: new Date(),
                        };
                        const result = await updateById(db, ADMIN_COLLECTION_NAME, requestedBy, updatedAdminDetails);
                        const latestData = await findById(db, ADMIN_COLLECTION_NAME, requestedBy);

                        delete latestData?._id;
                        delete latestData?.id;
                        delete latestData?.password;

                        return result?.modifiedCount
                            ? generateResponseData(latestData, true, 200, `${requestedBy} updated successfully`)
                            : generateResponseData({}, false, 422, `${requestedBy} not updated`);

                    } else {
                        return generateResponseData({}, false, 403, "Forbidden");
                    }
                } else {
                    return generateResponseData({}, false, 422, "Wrong password");
                }
            } else {
                return generateResponseData({}, false, 422, "Password did not matched");
            }
        } else {
            return generateResponseData({}, false, 403, "Forbidden");
        }
    } catch (error) {
        logger.error(error);

        throw error;
    }
};

/**
 * Service to delete a user.
 * @async
 * @param {Object} db - Database instance.
 * @param deleteAdminDetails
 * @returns {Object} Result object containing status, message and data.
 */
const deleteUserService = async (db, deleteAdminDetails) => {
    try {
        const { requestedBy } = deleteAdminDetails;
        if (!await isValidRequest(db, requestedBy))
            return generateResponseData({}, false, 403, FORBIDDEN_MESSAGE);

        const result = await deleteById(db, ADMIN_COLLECTION_NAME, requestedBy);

        return result
            ? generateResponseData({}, true, 200, `${requestedBy} deleted successfully`)
            : generateResponseData({}, false, 422, `${requestedBy} could not be deleted`);

    } catch (error) {
        logger.error(error);

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
