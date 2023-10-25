import { StatusCodes } from "http-status-codes";
import { CATEGORY_COLLECTION_NAME } from "../../../constants/index.js";
import isRequesterValid from "../../../shared/isRequesterValid.js";
import isCategoryAlreadyExists from "../../../shared/isCategoryAlreadyExists.js";

const createCategoryService = async (db,  newCategoryDetails) => {
    try {
        const { name, requestedBy} = newCategoryDetails;
        const isDuplicateCategory = await isCategoryAlreadyExists(db, name);
        const isValidRequester = await isRequesterValid(db, requestedBy);

        if (isDuplicateCategory) {
            return {
                data: {},
                success: true,
                status: StatusCodes.UNPROCESSABLE_ENTITY,
                message: `${name} already exists`
            };
        } else {
            if (isValidRequester) {
                const prepareNewCategoryDetails = {
                    name: name,
                    createdBy: requestedBy,
                    createdAt: new Date(),
                };

                const createNewCategoryResult = await db
                    .collection(CATEGORY_COLLECTION_NAME)
                    .insertOne(prepareNewCategoryDetails);

                if (createNewCategoryResult?.acknowledged) {
                    delete prepareNewCategoryDetails?._id;

                    return {
                        data: prepareNewCategoryDetails,
                        success: true,
                        status: StatusCodes.OK,
                        message: `${prepareNewCategoryDetails?.name} created successfully`
                    };
                } else {
                    return {
                        data: {},
                        success: false,
                        status: StatusCodes.INTERNAL_SERVER_ERROR,
                        message: 'Failed to create'
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
        }
    } catch (error) {
        throw error;
    }
};

const getACategoryService = async (db, res, categoryDetails) => {
    try {
        res.status(200).json(categoryDetails);
    } catch (error) {
        return res.status(500).json(categoryDetails);
    }
};

const updateACategoryService = async (db, res, newCategoryDetails) => {
    try {
        res.status(200).json(newCategoryDetails);
    } catch (error) {
        return res.status(500).json(newCategoryDetails);
    }
};

const deleteACategoryService = async (db, res, categoryDetails) => {
    try {
        res.status(200).json(categoryDetails);
    } catch (error) {
        return res.status(500).json(categoryDetails);
    }
};

export const CategoryService = {
    createCategoryService,
    getACategoryService,
    updateACategoryService,
    deleteACategoryService
};
