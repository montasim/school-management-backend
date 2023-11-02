import {STATUS_OK} from "../../../constants/constants.js";

/**
 * A predefined data object containing information about the API.
 * @constant
 * @type {Object}
 * @property {number} status - The HTTP status code.
 * @property {boolean} success - The success status of the response.
 * @property {string} message - A welcome message.
 * @property {Object} data - Contains general data about the API.
 * @property {string} data.description - Description of the API.
 * @property {string} data.version - Version of the API.
 * @property {string} data.author - Author of the API.
 * @property {string} data.email - Email of the author.
 * @property {string} data.status_information - Information on the current status of the API.
 * @property {string} data.terms_of_service - Terms of service for using the API.
 * @property {string} data.friendly_message - A friendly message to developers or visitors.
 * @property {Object} environment - Information about the current environment of the API.
 * @property {string} environment.currentEnvironment - The current environment (e.g., production).
 * @property {string} environment.apiVersion - The current version of the API.
 * @property {Object} endpoints - Paths for different endpoints of the API.
 * @property {string} endpoints.administration - Path for the administration endpoint.
 * @property {string} endpoints.announcement - Path for the announcement endpoint.
 * @property {string} endpoints.authentication - Path for the authentication endpoint.
 * @property {string} endpoints.category - Path for the category endpoint.
 * @property {string} endpoints.contact - Path for the contact endpoint.
 * @property {string} endpoints.dashboard - Path for the dashboard endpoint.
 * @property {string} endpoints.download - Path for the download endpoint.
 * @property {string} endpoints.homePage - Path for the home page endpoint.
 * @property {string} endpoints.level - Path for the level endpoint.
 * @property {string} endpoints.notice - Path for the notice endpoint.
 * @property {string} endpoints.othersInformation - Path for the others information endpoint.
 * @property {string} endpoints.othersInformationCategory - Path for the others information category endpoint.
 * @property {string} endpoints.result - Path for the result endpoint.
 * @property {string} endpoints.routine - Path for the routine endpoint.
 * @property {string} endpoints.students - Path for the student's endpoint.
 * @property {string} endpoints.teachers - Path for the teacher's endpoint.
 * @property {string} endpoints.website - Path for the website endpoint.
 * @property {Object} authentication - Information on authentication.
 * @property {string} authentication.info - Information on how to authenticate requests.
 * @property {string} authentication.signupLink - Path for the signup endpoint.
 * @property {Object} links - Various useful links related to the API.
 * @property {string} links.documentation - Link to the API documentation.
 * @property {string} links.swagger_ui - Link to the Swagger UI for the API.
 * @property {string} links.terms_of_service - Link to the terms of service.
 * @property {string} links.main_site - Link to the main site.
 * @property {Object} support - Information on how to get support.
 * @property {string} support.contact - Contact email for support.
 * @property {Object} tutorials - Links to tutorials on how to get started.
 * @property {string} tutorials.gettingStarted - Link to a getting started tutorial.
 * @property {Object} healthStatus - Information on the health status of the API.
 * @property {string} healthStatus.serviceStatus - Link to a page showing the current status of the API.
 * @property {Array} healthStatus.knownIssues - Array of known issues (if any).
 * @property {Object} aboutDeveloper - Information about the developer.
 * @property {string} aboutDeveloper.Name - The name of the developer.
 * @property {string} aboutDeveloper.email - The email of the developer.
 * @property {string} aboutDeveloper.mobile - The mobile number of the developer.
 * @property {string} aboutDeveloper.linkedin - The LinkedIn profile of the developer.
 * @property {string} aboutDeveloper.github - The GitHub profile of the developer.
 */
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

export default returnData;