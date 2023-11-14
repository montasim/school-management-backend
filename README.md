<img loading="lazy" src="https://readme-typing-svg.demolab.com?font=Poppins&weight=700&size=28&duration=1&pause=1&color=EB008B&center=true&vCenter=true&repeat=false&width=376&height=40&lines=SCHOOL MANAGEMENT API" alt="SCHOOL MANAGEMENT API" />

[//]: # (# School Management API)

The School Management API is a robust and comprehensive backend system designed for educational institutions, 
developed using Node.js and Express.js. It centralizes various aspects of school management, 
such as administrative tasks, student information, blog updates, and more. 
A key feature is its strong user authentication system, providing secure login, signup, and password management. 
The API includes modules for diverse school activities, ranging from administration to blog and announcement management. 

Integration with Google Drive is a significant aspect, enabling efficient file management across different modules. 
Security and compliance are prioritized, with advanced authentication, role-based access control, 
and adherence to data protection standards, ensuring the safety of sensitive information. 

The APIs technology stack includes MongoDB, Bcrypt, CORS, Jsonwebtoken, Multer, Nodemailer, and Swagger, 
providing a comprehensive set of tools for database management, security, file handling, and documentation. 
The project is structured for easy development and maintenance, with clear directory organization and 
environment-specific configurations. Hosted on Vercel, it offers seamless deployment. Overall, 
the School Management API is a versatile and efficient solution for modern educational institutions, 
embodying both operational efficiency and technological advancement.


## Table of Contents

- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Deployment on Vercel](#deployment-on-vercel)
- [License](#license)
- [Acknowledgments](#acknowledgments)
- [FAQs](#faqs)


## Key Features

1. `User Authentication and Management:` Offers robust security features for login, signup, password management, and user verification, ensuring safe and secure access to the system. 
2. `Administration Services:` Manages administrative tasks, including creating, updating, and deleting administrative posts, with Google Drive integration for efficient file management. 
3. `Announcement Services:` Facilitates the creation, retrieval, update, and deletion of announcements, enhancing school-wide communication. 
4. `Blog Management:` Allows for comprehensive management of blog content, including creating, updating, and deleting posts, aiding in the school's digital outreach. 
5. `Category Management:` Provides services for handling different content categories, streamlining content organization and retrieval. 
6. `Contact Management:` Features a dedicated service for managing and sending emails, enhancing communication efficiency. 
7. `Dashboard Management:` Offers specialized services for managing dashboard functionalities, optimizing administrative oversight. 
8. `Designation Management:` Allows for the management of various designations within the school, including creation, update, and deletion. 
9. `Download Management:` Manages downloadable content like circulars and documents, with Google Drive integration for secure file storage. 
10. `HomePage Management:` Specialized services for dynamic management of the home page, including carousels, blogs, and links, enhancing the website's user experience. 
11. `Index Management:` Manages the index route of the API, providing detailed information about the available services. 
12. `Level Management:` Handles the creation, retrieval, update, and deletion of academic levels or grades, streamlining academic management. 
13. `Notice Management:` Manages notices and documents, with functionalities for adding, fetching, and deleting records, supported by Google Drive integration. 
14. `Others Information Management:` Manages miscellaneous information, providing services for adding, fetching, and deleting records, with file storage on Google Drive. 
15. `Result Management:` Handles academic results and records, offering services for adding, fetching, and deleting results. 
16. `Routine Management:` Manages school routines and schedules, facilitating the addition, retrieval, and deletion of routine records. 
17. `Status Management:` Offers comprehensive services to check the current status and health of the API. 
18. `Student Information Management:` Manages student data, including enrollment, academic records, and personal information, ensuring accurate and up-to-date record-keeping. 
19. `Undefined Route Management:` Monitors and manages responses for undefined API routes. 
20. `Website Management:` Allows customization and configuration of the school's website settings, including adding, updating, and removing configurations. 
21. `Security and Compliance:` Prioritizes security with advanced authentication mechanisms and compliance with educational data protection standards. 
22. `Customization and Scalability:` Designed for flexibility, allowing customization to fit specific institutional needs and scalable architecture for integration with other systems.


## Technology Stack

- `Node.js (v18.x)`: The runtime environment for executing JavaScript on the server side. 
- `Express.js:` The web application framework for creating server-side logic. 
- `MongoDB:` The NoSQL database for storing and retrieving data. 
- `Bcrypt:` For hashing and securing user passwords. 
- `Cors:` To enable Cross-Origin Resource Sharing. 
- `Dotenv:` For loading environment variables from a .env file. 
- `Express-rate-limit & Rate-limit-mongo:` For implementing rate limiting with MongoDB support. 
- `Fs:` File system module for file manipulation. 
- `Googleapis:` To interact with Google Drive for file storage and management. 
- `Joi:` For schema description and data validation. 
- `Jsonwebtoken:` For generating and verifying JSON Web Tokens. 
- `Multer:` Middleware for handling multipart/form-data for uploading files. 
- `Nodemailer:` For sending emails. 
- `Nodemon:` Utility for monitoring changes in the source and automatically restarting the server. 
- `Swagger-ui-express:` For documenting the API using Swagger.
- `User-agent-parser:` For parsing user-agent string to extract browser and device information. 
- `Uuid:` For generating unique identifiers. 
- `Winston:` For logging errors and information.


## Project Structure

Describe the project's structure, including directories, files, and their purposes. For example:

- `src/`
    - Source code of the application.
    - `app/`
        - Application files for modules, routes, and middlewares.
    - `config/`
        - Configuration files for parameters, database connections, etc from environment variable.
    - `constants/`
        - Constant values used across the application.
    - `data/`
        - Static data files or database seeding scripts.
    - `helpers/`
        - Utility functions and helper scripts.
    - `app.js`
        - Application point where the Express application is initialized, and middlewares & routes are set up.
    - `server.js/`
        - Starts the server, listens on a port.

- `.env.template`
    - Environment-specific configurations as template, e.g., database strings, API keys.

- `.env.development`
    - Environment-specific configurations as development, [.env.template](.env.template) as a template.

- `.gitignore/`
    - Files or folder list to ignore by git.

- `LICENSE/`
    - Project license.

- `package.json`
    - Metadata about the project and its dependencies.

- `postman_collection.json`
    - Metadata about the APIs to use on Postman as collection.

- `README.md`
    - Details information about the project.

- `swagger.json`
    - Metadata about the APIs documentations for Swagger APIs.

- `.vercel.json`
    - Configurations for deploying on [Vercel](https://vercel.com).


## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/montasim/school-management-backend.git
   ```
   
2. Change directory:

   ```bash
   cd school-management-backend
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env.production` file same as [.env.template](.env.template) and set your environment variables.

5. Start the application:

   ```bash
   npm start
   ```

    or, start the application on dev environment:
    
   ```bash
   npm run dev
   ```


## Usage

Import the [postman_collection.json](postman_collection.json) on [Postman](https://app.getpostman.com/app/download) and check the `/status` routes to make sure the API is working as expected.


## API Documentation

<details>
    <summary> List of API endpoints: </summary>

- `/api`
- `/api > v1`
- `/api > v1 > category`
- `/api > v1 > website`
- `/api > v1 > website > configuration`
- `/api > v1 > website > contact`
- `/api > v1 > website > importantInformationLink`
- `/api > v1 > website > officialLink`
- `/api > v1 > website > socialMediaLink`
- `/api > v1 > othersInformationCategory`
- `/api > v1 > announcement`
- `/api > v1 > administration`
- `/api > v1 > othersInformation`
- `/api > v1 > authentication`
- `/api > v1 > student`
- `/api > v1 > contact`
- `/api > v1 > download`
- `/api > v1 > notice`
- `/api > v1 > result`
- `/api > v1 > routine`
- `/api > v1 > level`
- `/api > v1 > designation`
- `/api > v1 > dashboard`
- `/api > v1 > homePage`
- `/api > v1 > homePage > homePagePost`
- `/api > v1 > homePage > homePageCarousel`
- `/api > v1 > homePage > homePageGallery`
- `/api > v1 > blog`
- `/status`
- `/index`
- `/undefined`
</details>

Check out [School Management API documentation on Swagger](https://app.swaggerhub.com/apis/MONTASIMMAMUN/school-management-api/1.0.0) for details.


## Deployment on Vercel

To deploy the School Management API on Vercel, a vercel.json file is used to define the deployment configuration. The structure of the vercel.json file for this project is as follows:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "./src/server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/src/server.js"
    }
  ]
}
```


## License

This project is licensed under the `MIT License` - see the [LICENSE](LICENSE) file for details.


## Acknowledgments

1. [ProtoCodersPoint](https://www.youtube.com/@ProtoCodersPoint) - for [Google Drive file upload tutorial](https://www.youtube.com/watch?v=bkaQTLCBBeo&t=600s).
2. [tanaike](https://stackoverflow.com/users/7108653/tanaike) - for his [StackOverflow answer on file upload to Google Drive](https://stackoverflow.com/questions/65181932/how-i-can-upload-file-to-google-drive-with-google-drive-api).
3. [Swagify.io](https://swagify.io/convert/) - for converting Postman APIs to Swagger API documentations.


## FAQs

<details>
    <summary>
        1. Why need mimeType in the req body?
    </summary>

    In many cases, it's not possible to accurately determine the MIME type of binary data solely based on the data itself, especially when you don't have additional context or metadata. The MIME type is typically determined by examining the file extension, content, or other contextual information.

    In your example, you have a base64-encoded PDF file, but without any additional information or context, it's challenging to determine the MIME type definitively. The MIME type "application/pdf" is a common type for PDF files, but it's not the only possible MIME type.

    To accurately determine the MIME type, you would typically rely on metadata provided by the sender or an external source. If the sender of this data does not provide the MIME type separately, you may need to make assumptions based on the context in which you are using the data. However, these assumptions may not always be accurate.

    In summary, while you can make educated guesses based on the content and structure of the data, there's no foolproof way to determine the MIME type of binary data without additional information or context.
</details>
