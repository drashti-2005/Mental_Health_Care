// filepath: /sih-hackathon/sih-hackathon/server/src/config/index.js

import dotenv from 'dotenv';

dotenv.config();

const config = {
    PORT: process.env.PORT ,
    MONGODB_URI: process.env.MONGODB_URI ,
    JWT_SECRET: process.env.JWT_SECRET ,
};

export default config;