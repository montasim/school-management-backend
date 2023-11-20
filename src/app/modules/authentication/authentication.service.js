/**
 * @fileoverview Service functions for user authentication and management.
 *
 * This file includes service functions related to user authentication and management
 * in the application. It encompasses services for logging in, verifying user credentials,
 * signing up new users, resetting passwords, and deleting user accounts.
 * These services interact with the database to fetch, verify, and manipulate user data
 * as per the requirements of each function. They are essential for implementing
 * the authentication and account management features of the application.
 *
 * @requires bcrypt - Module for hashing passwords.
 * @requires database - Database connection module.
 * @requires constants - Application constants for status codes and messages.
 * @requires logger - Logger module for logging errors and information.
 *
 * @module UserService - Exported user service functions for the application.
 */

import bcrypt from 'bcrypt';
import {
    ADMIN_COLLECTION_NAME,
    MAX_CONCURRENT_LOGINS,
    MAX_FAILED_ATTEMPTS
} from "../../../config/config.js";
import {
    FORBIDDEN_MESSAGE,
    STATUS_FORBIDDEN,
    STATUS_INTERNAL_SERVER_ERROR,
    STATUS_OK,
    STATUS_UNAUTHORIZED,
    STATUS_UNPROCESSABLE_ENTITY,
} from "../../../constants/constants.js";
import findByField from "../../../shared/findByField.js";
import isValidRequest from "../../../shared/isValidRequest.js";
import deleteByField from "../../../shared/deleteByField.js";
import generateResponseData from "../../../shared/generateResponseData.js";
import createByDetails from "../../../shared/createByDetails.js";
import updateById from "../../../shared/updateById.js";
import createAuthenticationToken from "../../../helpers/createAuthenticationToken.js";
import logger from "../../../shared/logger.js";
import resetFailedAttempts from "../../../helpers/resetFailedAttempts.js";
import incrementFailedAttempts from "../../../helpers/incrementFailedAttempts.js";
import checkIfAccountIsLocked from "../../../helpers/checkIfAccountIsLocked.js";
import addCurrentlyLoggedInDevice from "../../../shared/addCurrentlyLoggedInDevice.js";
import removeTokenId from "../../../helpers/removeTokenId.js";
import generateUniqueID from "../../../helpers/generateUniqueID.js";
import {ADMIN_CONSTANTS} from "./authentication.constants.js";

/**
 * Handles the login process for an admin user.
 *
 * This function checks the provided login details against the database records.
 * It validates the username and password, checks for account lock conditions due
 * to failed attempts, and generates an authentication token upon successful login.
 *
 * @async
 * @function loginService
 * @param {Object} db - The database connection object.
 * @param {Object} loginDetails - The login credentials provided by the user.
 * @param {string} loginDetails.userName - The username of the admin.
 * @param {string} loginDetails.password - The password of the admin.
 * @returns {Promise<Object>} A promise that resolves to an object containing either
 * the login status and token (on success) or an error message (on failure).
 * @throws {Error} Throws an error if there's an issue within the try block
 * (e.g., database connectivity issues, bcrypt comparison failure).
 *
 * The function performs several checks and operations:
 * - Validates whether the provided username exists in the database.
 * - Checks if the account is locked due to previous failed login attempts.
 * - Compares the provided password with the hashed password in the database.
 * - Generates an authentication token upon successful password match.
 * - Resets the failed login attempts counter after a successful login.
 * - Increments the failed login attempts counter upon an unsuccessful login.
 */
const loginService = async (db, loginDetails) => {
    try {
        const { userName, password, userAgent } = loginDetails;
        const foundAdminDetails = await findByField(db, ADMIN_COLLECTION_NAME, 'userName', userName);

        if (!foundAdminDetails)
            return generateResponseData({}, false, STATUS_UNAUTHORIZED, "Unauthorized");

        /**
         * Limit the number of concurrent login
         *
         * Here, parseInt is used with a radix of 10 to ensure it's parsed as a base-10 number.
         * This is especially important in cases where the value might start with 0
         * (which could be incorrectly interpreted as an octal number) or include non-numeric characters.
         */
        if (foundAdminDetails?.currentlyLoggedInDevice >= parseInt(MAX_CONCURRENT_LOGINS, 10))
            return generateResponseData({}, false, STATUS_UNAUTHORIZED, "Can not log in more that 'MAX_CONCURRENT_LOGINS' devices at a time. Please log out from any of the login device and try again");

        // Check if the account is locked
        const accountLockResponse = checkIfAccountIsLocked(foundAdminDetails);

        if (accountLockResponse)
            return accountLockResponse; // Return the lock response immediately if the account is locked

        const isPasswordMatch = await bcrypt.compare(password, foundAdminDetails?.password);

        if (!isPasswordMatch) {
            // Increment failed attempts
            await incrementFailedAttempts(db, foundAdminDetails);

            return generateResponseData({}, false, STATUS_UNAUTHORIZED, "Unauthorized");
        }

        const token = await createAuthenticationToken(db, userAgent, foundAdminDetails);

        if (!token)
            return generateResponseData({}, false, STATUS_UNAUTHORIZED, "Failed to create token");

        // Reset failed attempts on successful login
        await resetFailedAttempts(db, userName);
        // Add currently logged in device
        await addCurrentlyLoggedInDevice(db, foundAdminDetails);

        const returnData = {
            name: foundAdminDetails.name,
            userName: foundAdminDetails.userName,
            currentlyLoggedInDevice: foundAdminDetails.currentlyLoggedInDevice,
            token: token,
        };

        return generateResponseData(returnData, true, STATUS_OK, "Authorized");
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * Verifies the existence and validity of a user's admin ID.
 *
 * This function is used to validate if a given admin ID is present and active in the database.
 * It primarily serves for user verification purposes, where it confirms if an admin user
 * exists based on the provided ID. It does not perform any authentication or authorization checks.
 *
 * @async
 * @function verifyUserService
 * @param {Object} db - The database connection object.
 * @param {string} adminId - The unique identifier of the admin user to be verified.
 * @returns {Promise<Object>} A promise that resolves to an object containing
 * either a success message (if the admin ID is found) or an error/unauthorized message.
 * @throws {Error} Throws an error if there's an issue within the try block
 * (e.g., database connectivity issues or failure during data retrieval).
 *
 * The function performs the following operations:
 * - Fetches admin details based on the given ID from the database.
 * - Checks if the admin details exist.
 * - Returns a success response if the admin exists, otherwise returns an unauthorized response.
 */
const verifyUserService = async (db,  adminId) => {
    try {
        const foundAdminDetails = await findByField(db, ADMIN_COLLECTION_NAME, 'id', adminId);

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
 * Handles the user signup process for an admin user.
 *
 * This service is responsible for processing the signup details of a new admin user.
 * It includes verifying if the username already exists, matching passwords, hashing the password,
 * and adding the new admin user to the database. It ensures that each admin user has a unique username.
 *
 * @async
 * @function signupService
 * @param {Object} db - The database connection object.
 * @param {Object} signupDetails - The signup details of the new admin user.
 * @param {string} signupDetails.name - The full name of the new admin user.
 * @param {string} signupDetails.userName - The username for the new admin user.
 * @param {string} signupDetails.password - The password for the new admin user.
 * @param {string} signupDetails.confirmPassword - The password confirmation for validation.
 * @returns {Promise<Object>} A promise that resolves to an object containing either
 * a success message and the user's details (if the user is created successfully)
 * or an error/unprocessable entity message.
 * @throws {Error} Throws an error if there's an issue within the try block
 * (e.g., database connectivity issues, bcrypt hashing failure, or failure during user creation).
 *
 * The function performs the following operations:
 * - Checks if the username already exists in the database.
 * - Validates if the password and confirmPassword match.
 * - Hashes the password using bcrypt.
 * - Creates a new admin user entry in the database with the hashed password and other details.
 */
const signupService = async (db, signupDetails) => {
    try {
        const { name, userName, password, confirmPassword } = signupDetails;
        const foundUserDetails = await findByField(db, ADMIN_COLLECTION_NAME,  'userName', userName);

        if (foundUserDetails) {
            return generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, `${userName} already exists`);
        } else {
            if (password === confirmPassword) {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);
                const prepareNewUserDetails = {
                    id: generateUniqueID(ADMIN_CONSTANTS?.ADMIN_ID_PREFIX),
                    name: name,
                    userName: userName,
                    password: hashedPassword,
                    currentlyLoggedInDevice: 0,
                    tokenId: [],
                    lastLoginAt: null,
                    allowedFailedAttempts: MAX_FAILED_ATTEMPTS,
                    lastFailedAttempts: null,
                    createdAt: new Date(),
                };
                const result = await createByDetails(db, ADMIN_COLLECTION_NAME, prepareNewUserDetails);
                const latestData = await findByField(db, ADMIN_COLLECTION_NAME, 'id', prepareNewUserDetails?.id);

                delete latestData?._id;
                delete latestData?.id;
                delete latestData?.password;
                delete latestData?.allowedFailedAttempts;
                delete latestData?.lastFailedAttempts;
                delete latestData?.currentlyLoggedInDevice;
                delete latestData?.tokenId;
                delete latestData?.lastLoginAt;
                delete latestData?.createdAt;
                delete latestData?.modifiedAt;

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
 * Service to handle the reset password functionality.
 *
 * This service facilitates the process of resetting an admin password. It ensures
 * that the request is valid, the old password matches, and updates the password with
 * a hashed version of the new password.
 *
 * @async
 * @function resetPasswordService
 * @param {Object} db - Database connection object.
 * @param {Object} resetPasswordDetails - Details for password reset including adminId, oldPassword, newPassword, confirmNewPassword.
 * @returns {Promise<Object>} - Promise object representing the outcome of the password reset operation.
 */
const resetPasswordService = async (db, resetPasswordDetails) => {
    try {
        const { adminId, tokenId, oldPassword, newPassword, confirmNewPassword } = resetPasswordDetails;
        const foundAdminDetails = await findByField(db, ADMIN_COLLECTION_NAME, 'id', adminId);

        if (!foundAdminDetails || foundAdminDetails?.id !== adminId)
            return generateResponseData({}, false, STATUS_FORBIDDEN, "Forbidden");

        const isPasswordMatch = await bcrypt.compare(oldPassword, foundAdminDetails?.password);

        if (!isPasswordMatch)
            return generateResponseData({}, false, STATUS_FORBIDDEN, "Wrong password");

        const isNewAndOldPasswordMatch = await bcrypt.compare(oldPassword, newPassword);

        if (isNewAndOldPasswordMatch)
            return generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, "New password can not be same as old password");

        if (newPassword !== confirmNewPassword)
            return generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, "Passwords do not match");

        const salt = await bcrypt.genSalt(10);
        const hashedNewPassword = await bcrypt.hash(newPassword, salt);
        const updatedAdminDetails = {
            password: hashedNewPassword,
            modifiedAt: new Date(),
        };
        const result = await updateById(db, ADMIN_COLLECTION_NAME, adminId, updatedAdminDetails);

        if (result?.modifiedCount) {
            await removeTokenId(db, foundAdminDetails, tokenId);

            return generateResponseData({}, true, STATUS_OK, "Password updated successfully")
        } else {
            return generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, "Failed to update password");
        }
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * Service to handle the log-out functionality.
 *
 * This service facilitates the process of log our an admin. It ensures
 * that the request is valid, and updates the currently logged in device number
 *
 * @async
 * @function logoutService
 * @param {Object} db - Database connection object.
 * @param {Object} adminId - Admin id.
 * @param tokenId
 * @returns {Promise<Object>} - Promise object representing the outcome of the log-out operation.
 */
const logoutService = async (db, adminId, tokenId) => {
    try {
        const foundAdminDetails = await findByField(db, ADMIN_COLLECTION_NAME, 'id', adminId);

        // Check if admin details were found and if the ID matches.
        if (!foundAdminDetails || foundAdminDetails?.id !== adminId) {
            return generateResponseData({}, false, STATUS_FORBIDDEN, "Forbidden");
        }

        // Decrement the currentlyLoggedInDevice count.
        if (foundAdminDetails?.currentlyLoggedInDevice > 0)
            foundAdminDetails.currentlyLoggedInDevice -= 1;

        // Update the admin details in the database.
        const result = await updateById(db, ADMIN_COLLECTION_NAME, adminId, foundAdminDetails);

        if (result?.modifiedCount) {
            await removeTokenId(db, foundAdminDetails, tokenId);

            return generateResponseData({}, true, STATUS_OK, "Successfully logged out")
        } else {
            return generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, "Failed to update logout status");
        }
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * Service for deleting an admin user from the database.
 *
 * This service facilitates the deletion of an admin user identified by their unique ID.
 * It checks if the request to delete the user is valid and then proceeds to remove the user from the database.
 * The function returns a response indicating the success or failure of the deletion process.
 *
 * @async
 * @function deleteUserService
 * @param {Object} db - The database connection object.
 * @param {Object} adminDetails - The details of the admin user to be deleted.
 * @param {string} adminDetails.adminId - The unique identifier of the admin user to be deleted.
 * @returns {Promise<Object>} A promise that resolves with the response data after attempting to delete the admin user.
 * @throws {Error} Throws an error if the operation fails.
 */
const deleteUserService = async (db, adminDetails) => {
    try {
        const { adminId } = adminDetails;

        if (!await isValidRequest(db, adminId))
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);

        const result = await deleteByField(db, ADMIN_COLLECTION_NAME, 'id', adminId);

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
    logoutService,
    deleteUserService,
};