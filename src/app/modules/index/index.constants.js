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
    "status": 200,
    "success": true,
    "message": "Welcome to the School Management API! 👋",
    "data": {
        "description": "The School Management API is a comprehensive backend system designed to facilitate the management of various aspects of a school's operations. " +
                       "This robust API integrates a range of functionalities tailored to meet the diverse needs of educational institutions. " +
                       "It serves as the backbone for a school management software, enabling efficient handling of administrative tasks, student information management, blog updates, and much more.",
        "version": "1.0.0",
        "author": "Mohammad Montasim -Al- Mamun Shuvo",
        "contact": {
            "email": "montasimmamun@gmail.com",
            "phone": "+8801722815469"
        },
        "statusInformation": "All systems are currently operational. ✅",
        "termsOfService": "/terms",
        "apiDocumentation": {
            "overview": "/docs",
            "swaggerUI": "/api-docs"
        },
        "rateLimit": {
            "limit": "100 requests per 15 minutes 🕒",
            "info": "To ensure fair usage, our API limits the number of requests to 100 every 15 minutes."
        },
        "environment": {
            "current": "production 🌐",
            "apiVersion": "v1"
        },
        "endpoints": {
            "administration": "/api/v1/administration",
            "announcements": "/api/v1/announcements",
            "authentication": "/api/v1/authentication",
            "categories": "/api/v1/categories",
            "contacts": "/api/v1/contacts",
            "dashboard": "/api/v1/dashboard",
            "downloads": "/api/v1/downloads",
            "homePage": "/api/v1/homePage",
            "levels": "/api/v1/levels",
            "notices": "/api/v1/notices",
            "otherInformation": "/api/v1/otherInformation",
            "results": "/api/v1/results",
            "routines": "/api/v1/routines",
            "students": "/api/v1/students",
            "teachers": "/api/v1/teachers",
            "websiteConfig": "/api/v1/websiteConfig"
        },
        "authentication": {
            "info": "Authenticate requests with a token in the header.",
            "signupEndpoint": "/api/v1/authentication/signup"
        },
        "support": {
            "contactEmail": "montasimmamun@gmail.com",
            "technicalSupport": "/support"
        },
        "tutorials": {
            "gettingStarted": "/docs/getting-started"
        },
        "healthStatus": {
            "checkEndpoint": "/status",
            "knownIssues": []
        },
        "aboutDeveloper": {
            "name": "Mohammad Montasim -Al- Mamun Shuvo",
            "email": "montasimmamun@gmail.com",
            "mobile": "+8801722815469",
            "linkedin": "https://www.linkedin.com/in/montasim",
            "github": "https://github.com/montasim",
        }
    }
};

export default returnData;