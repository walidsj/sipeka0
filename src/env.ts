import dotenv from 'dotenv'

dotenv.config()

export const env = {
    DB_HOST: process.env.DB_HOST as string,
    DB_USER: process.env.DB_USER as string,
    DB_PASSWORD: process.env.DB_PASSWORD as string,
    DB_NAME: process.env.DB_NAME as string,
    DB_PORT: process.env.DB_PORT as string,

    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY as string,
    PORT: Number(process.env.PORT) as number,

    NODE_ENV: process.env.NODE_ENV as 'development' | 'production',
}
