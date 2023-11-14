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
        "description": "The School Management API is a robust and comprehensive backend system designed for educational institutions," +
            "developed using Node.js and Express.js. It centralizes various aspects of school management," +
            "such as administrative tasks, student information, blog updates, and more." +
            "A key feature is its strong user authentication system, providing secure login, signup, and password management." +
            "The API includes modules for diverse school activities, ranging from administration to blog and announcement management." +

            "Integration with Google Drive is a significant aspect, enabling efficient file management across different modules." +
            "Security and compliance are prioritized, with advanced authentication, role-based access control," +
            "and adherence to data protection standards, ensuring the safety of sensitive information." +

            "The APIs technology stack includes MongoDB, Bcrypt, CORS, Jsonwebtoken, Multer, Nodemailer, and Swagger," +
            "providing a comprehensive set of tools for database management, security, file handling, and documentation." +
            "The project is structured for easy development and maintenance, with clear directory organization and" +
            "environment-specific configurations. Hosted on Vercel, it offers seamless deployment. Overall," +
            "the School Management API is a versatile and efficient solution for modern educational institutions," +
            "embodying both operational efficiency and technological advancement.",
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
            "index": "/",
            "administration": "/api/v1/administration",
            "announcement": "/api/v1/announcement",
            "authentication": "/api/v1/authentication",
            "blog": "/api/v1/blog",
            "category": "/api/v1/category",
            "contact": "/api/v1/contact",
            "dashboard": "/api/v1/dashboard",
            "designation": "/api/v1/designation",
            "download": "/api/v1/download",
            "homePageCarousel": "/api/v1/homePage/homePageCarousel",
            "homePageGallery": "/api/v1/homePage/homePageGallery",
            "homePagePost": "/api/v1/homePage/homePagePost",
            "level": "/api/v1/level",
            "notice": "/api/v1/notice",
            "othersInformation": "/api/v1/othersInformation",
            "othersInformationCategory": "/api/v1/othersInformationCategory",
            "result": "/api/v1/result",
            "routine": "/api/v1/routine",
            "student": "/api/v1/student",
            "configuration": "/api/v1/website/configuration",
            "importantInformationLink": "/api/v1/website/importantInformationLink",
            "officialLink": "/api/v1/website/officialLink",
            "socialMediaLink": "/api/v1/website/socialMediaLink",
            "status": "/status",
            "undefined": "/undefined",
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