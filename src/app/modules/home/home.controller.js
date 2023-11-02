import logger from "../../../shared/logger.js";
import { SERVER_DOWN_MESSAGE, STATUS_INTERNAL_SERVER_ERROR, STATUS_OK } from "../../../constants/constants.js";

const homeController = async (req, res) => {
    try {
        const returnData = {
            status: STATUS_OK,
            success: true,
            message: "Welcome to School Management API 🚀",
            data: {
                description: "This API provides endpoints for managing school data including students, teachers, courses, and more.",
                version: "1.0.0",
                author: "Mohammad Montasim -Al- Mamun Shuvo",
                email: "montasimmamun@gmail.com",
                status_information: "All systems operational.",
                terms_of_service: "By using this API, you agree to our terms of service.",
                friendly_message: "Hello! If you're a developer, check out our docs to get started. If you're lost, here's a link to our main site.",
            },
            environment: {
                currentEnvironment: "production",
                apiVersion: "v1",
            },
            endpoints: {
                administration: "/api/v1/administration",
                announcement: "/api/v1/announcement",
                authentication: "/api/v1/authentication",
                category: "/api/v1/category",
                contact: "/api/v1/contact",
                dashboard: "/api/v1/dashboard",
                download: "/api/v1/download",
                homePage: "/api/v1/homePage",
                level: "/api/v1/level",
                notice: "/api/v1/notice",
                othersInformation: "/api/v1/othersInformation",
                othersInformationCategory: "/api/v1/othersInformationCategory",
                result: "/api/v1/result",
                routine: "/api/v1/routine",
                students: "/api/v1/students",
                teachers: "/api/v1/teachers",
                website: "/api/v1/website",
            },
            authentication: {
                info: "To authenticate requests, include your token in the headers.",
                signupLink: "/api/v1/authentication/signup",
            },
            links: {
                documentation: "https://your-api-domain.com/docs",
                swagger_ui: "https://your-api-domain.com/swagger",
                terms_of_service: "https://your-api-domain.com/terms",
                main_site: "https://your-main-domain.com",
            },
            support: {
                contact: "montasimmamun@gmail.com",
            },
            tutorials: {
                gettingStarted: "https://yourapi.com/docs/getting-started",
            },
            healthStatus: {
                serviceStatus: "https://status.yourapi.com",
                knownIssues: [],
            },
            aboutDeveloper: {
                Name: "Mohammad Montasim -Al- Mamun Shuvo",
                email: "montasimmamun@gmail.com",
                mobile: "+8801722815469",
                linkedin: "https://www.linkedin.com/in/montasim",
                github: "https://github.com/montasim",
            },
        };

        return res.status(returnData?.status).json(returnData);
    } catch (error) {
        logger.error(error);

        const returnData = {
            data: SERVER_DOWN_MESSAGE,
            success: false,
            status: STATUS_INTERNAL_SERVER_ERROR,
            message: error,
        };

        return res.status(returnData?.status).json(returnData);
    }
};

export default homeController;