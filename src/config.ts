import 'dotenv/config';

const port: string | number = process.env.PORT || 3000;
const jwtSecretAccessKey: string | undefined = process.env.JWT_SECRET_ACCESS_KEY;
const jwtSecretRefreshKey: string | undefined = process.env.JWT_SECRET_REFRESH_KEY;
const jwtExpiresAccess: string | undefined = process.env.JWT_EXPIRES_ACCESS;
const jwtExpiresRefresh: string | undefined = process.env.JWT_EXPIRES_REFRESH;
const dbUser: string | undefined = process.env.DB_USER;
const dbHost: string | undefined = process.env.DB_HOST;
const dbName: string | undefined = process.env.DB_NAME;
const dbPassword: string | undefined = process.env.DB_PASSWORD;
const dbPort: number | undefined = +process.env.DB_PORT!;

const common = {
    port,
    jwtSecretAccessKey,
    jwtSecretRefreshKey,
    jwtExpiresAccess,
    jwtExpiresRefresh,
    dbUser,
    dbHost,
    dbName,
    dbPassword,
    dbPort,
};

export default common;
