import bcrypt from "bcrypt";

import {
    FORBIDDEN_MESSAGE,
    STATUS_FORBIDDEN,
    STATUS_INTERNAL_SERVER_ERROR,
    STATUS_OK,
    STATUS_UNAUTHORIZED,
    STATUS_UNPROCESSABLE_ENTITY,
} from "../../../constants/constants.js";
import {MAX_CONCURRENT_LOGINS, MAX_FAILED_ATTEMPTS} from "../../../config/config.js";
import prisma from "../../../shared/prisma.js";
import logger from "../../../shared/logger.js";

import generateResponseData from "../../../shared/generateResponseData.js";
import createAuthenticationToken from "../../../helpers/createAuthenticationToken.js";
import generateUniqueID from "../../../helpers/generateUniqueID.js";

// Login Service
const loginService = async (db, loginDetails) => {
    try {
        const { userName, password, userAgent } = loginDetails;

        if (!userName) {
            return generateResponseData({}, false, STATUS_UNAUTHORIZED, "Username is required");
        }

        const foundAdminDetails = await prisma?.admin.findUnique({
            where: { userName },
        });

        if (!foundAdminDetails) {
            return generateResponseData({}, false, STATUS_UNAUTHORIZED, "Unauthorized");
        }

        if (foundAdminDetails?.currentlyLoggedInDevice >= parseInt(MAX_CONCURRENT_LOGINS, 10)) {
            return generateResponseData(
                {},
                false,
                STATUS_UNAUTHORIZED,
                `Cannot log in to more than ${MAX_CONCURRENT_LOGINS} devices at a time.`
            );
        }

        const isPasswordMatch = await bcrypt.compare(password, foundAdminDetails.password);
        if (!isPasswordMatch) {
            await prisma?.admin.update({
                where: { id: foundAdminDetails.id },
                data: { lastFailedAttempts: { increment: 1 } }
            });
            return generateResponseData({}, false, STATUS_UNAUTHORIZED, "Unauthorized");
        }

        const token = await createAuthenticationToken(db, userAgent, foundAdminDetails);
        await prisma?.admin.update({
            where: { id: foundAdminDetails.id },
            data: {
                lastLoginAt: new Date(),
                currentlyLoggedInDevice: { increment: 1 },
                tokenDetails: { ...token }
            }
        });

        const returnData = {
            name: foundAdminDetails.name,
            userName: foundAdminDetails.userName,
            token
        };
        return generateResponseData(returnData, true, STATUS_OK, "Authorized");
    } catch (error) {
        logger.error(error);
        return generateResponseData({}, false, STATUS_INTERNAL_SERVER_ERROR, 'Error in login');
    }
};

// Signup Service
const signupService = async (db, signupDetails) => {
    try {
        const { name, userName, password, confirmPassword } = signupDetails;
        const existingUser = await prisma?.admin.findUnique({ where: { userName } });

        if (existingUser) {
            return generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, `${userName} already exists`);
        }

        if (password !== confirmPassword) {
            return generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, "Passwords do not match");
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newAdmin = await prisma?.admin.create({
            data: {
                id: generateUniqueID("admin"),
                name: name,
                userName: userName,
                password: hashedPassword,
                currentlyLoggedInDevice: 0,
                tokenDetails: [],
                lastLoginAt: null,
                allowedFailedAttempts: parseInt(MAX_FAILED_ATTEMPTS, 10),
                lastFailedAttempts: null,
                createdAt: new Date(),
            }
        });

        return generateResponseData({ name: newAdmin.name, userName: newAdmin.userName }, true, STATUS_OK, "User created successfully");
    } catch (error) {
        logger.error(error);
        return generateResponseData({}, false, STATUS_INTERNAL_SERVER_ERROR, 'Error in signup');
    }
};

// Reset Password Service
const resetPasswordService = async (db, resetPasswordDetails) => {
    try {
        const { adminId, oldPassword, newPassword, confirmNewPassword } = resetPasswordDetails;
        const admin = await prisma?.admin.findUnique({ where: { id: adminId } });

        if (!admin) {
            return generateResponseData({}, false, STATUS_FORBIDDEN, "Forbidden");
        }

        const isPasswordMatch = await bcrypt.compare(oldPassword, admin.password);
        if (!isPasswordMatch) {
            return generateResponseData({}, false, STATUS_FORBIDDEN, "Incorrect old password");
        }

        if (newPassword !== confirmNewPassword) {
            return generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, "Passwords do not match");
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        await prisma?.admin.update({
            where: { id: adminId },
            data: {
                password: hashedNewPassword,
                modifiedAt: new Date(),
                tokenDetails: [],
                currentlyLoggedInDevice: 0
            }
        });

        return generateResponseData({}, true, STATUS_OK, "Password updated successfully");
    } catch (error) {
        logger.error(error);
        return generateResponseData({}, false, STATUS_INTERNAL_SERVER_ERROR, 'Error in resetting password');
    }
};

// Logout Service
const logoutService = async (db, adminId, tokenId) => {
    try {
        const admin = await prisma?.admin.findUnique({ where: { id: adminId } });
        if (!admin) {
            return generateResponseData({}, false, STATUS_FORBIDDEN, "Forbidden");
        }

        await prisma?.admin.update({
            where: { id: adminId },
            data: {
                currentlyLoggedInDevice: { decrement: 1 },
                tokenDetails: admin.tokenDetails.filter((token) => token !== tokenId)
            }
        });

        return generateResponseData({}, true, STATUS_OK, "Successfully logged out");
    } catch (error) {
        logger.error(error);
        return generateResponseData({}, false, STATUS_INTERNAL_SERVER_ERROR, 'Error in logout');
    }
};

// Delete User Service
const deleteUserService = async (db, adminId) => {
    try {
        await prisma?.admin.delete({ where: { id: adminId } });
        return generateResponseData({}, true, STATUS_OK, "User deleted successfully");
    } catch (error) {
        logger.error(error);
        return generateResponseData({}, false, STATUS_INTERNAL_SERVER_ERROR, 'Error in deleting user');
    }
};

export const AuthenticationService = {
    loginService,
    signupService,
    resetPasswordService,
    logoutService,
    deleteUserService,
};
