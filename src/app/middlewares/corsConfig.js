const ALLOWED_ORIGIN = [
    "https://school-abid.vercel.app",
    "http://localhost:3000", // Allow requests from localhost
];

const ALLOWED_METHODS = "GET,PUT,POST,DELETE";

const corsOptions = {
    origin: ALLOWED_ORIGIN,
    methods: ALLOWED_METHODS,
    credentials: true, // If you need to support cookies or authentication
};

export default corsOptions;