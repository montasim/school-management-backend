import { FlushCacheService } from "./flushCache.service.js";
import logger from "../../../shared/logger.js";

import extractFromRequest from "../../../helpers/extractFromRequest.js";
import handleServiceResponse from "../../../helpers/handleServiceResponse.js";

const deleteFlushCacheController = async (req, res) => {
    try {
        const { adminId, db } = extractFromRequest(req);

        await handleServiceResponse(res, FlushCacheService.deleteFlushCacheService, db, adminId);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * @namespace FlushCacheController
 * @description Group of controllers for handling flushCache operations.
 */
export const FlushCacheController = {
    deleteFlushCacheController
};
