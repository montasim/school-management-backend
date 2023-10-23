import dotenv from "dotenv";

dotenv.config();

if ( process.env.NODE_ENV === "production" ) {
    dotenv.config({ path: ".env.production" });
} else if ( process.env.NODE_ENV === "staging" ) {
    dotenv.config({ path: ".env.staging" });
} else {
    dotenv.config({ path: ".env.development" });
}

export const {
    PORT,
    MONGODB_URI,
    DATABASE_NAME,
    API_VERSION,
    SECRET_TOKEN,
    CATEGORY_COLLECTION_NAME
} = process.env;
