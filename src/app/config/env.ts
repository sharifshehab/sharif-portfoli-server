import dotenv from "dotenv";

dotenv.config();

interface EnvConfig {
  PORT: string,
  DB_URL: string,
  NODE_ENV: "development" | "production"
  BCRYPT_SALT_ROUND: string
  JWT_ACCESS_SECRET: string
  JWT_ACCESS_EXPIRES: string
  JWT_REFRESH_SECRET: string
  JWT_REFRESH_EXPIRES: string

  CLOUDINARY: {
    CLOUDINARY_CLOUD_NAME: string;
    CLOUDINARY_API_KEY: string;
    CLOUDINARY_API_SECRET: string;
  };
  
  SUPER_ADMIN_EMAIL: string
  SUPER_ADMIN_PASSWORD: string
  FRONTEND_URL: string
}

/*
  This function checks if all required environment variables are defined in the ".env" file before the application starts.
*/
const loadEnvVariables = (): EnvConfig => {

  // List of environment variable keys that must exist in the ".env" file
  const requiredEnvVariables: string[] = ["PORT", "DB_URL", "NODE_ENV", "BCRYPT_SALT_ROUND", "JWT_ACCESS_SECRET", "JWT_ACCESS_EXPIRES", "JWT_REFRESH_SECRET", "JWT_REFRESH_EXPIRES", "CLOUDINARY_CLOUD_NAME", "CLOUDINARY_API_KEY", "CLOUDINARY_API_SECRET", "SUPER_ADMIN_EMAIL", "SUPER_ADMIN_PASSWORD", "FRONTEND_URL"];

  // Check each required environment variable. If any of the environment variable is missing, throw an error.
  requiredEnvVariables.forEach(key => {
    if (!process.env[key]) {
      throw new Error(`Missing require environment variable ${key}`)
    }
  });

  // If all required variables are found, return them in an object-format
  return {
    PORT: process.env.PORT as string,
    DB_URL: process.env.DB_URL as string,
    NODE_ENV: process.env.NODE_ENV as "development" | "production",
    BCRYPT_SALT_ROUND: process.env.BCRYPT_SALT_ROUND as string,
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET as string,
    JWT_ACCESS_EXPIRES: process.env.JWT_ACCESS_EXPIRES as string,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET as string,
    JWT_REFRESH_EXPIRES: process.env.JWT_REFRESH_EXPIRES as string,
    CLOUDINARY: {
      CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME as string,
      CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY as string,
      CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET as string,
    },
    SUPER_ADMIN_EMAIL: process.env.SUPER_ADMIN_EMAIL as string,
    SUPER_ADMIN_PASSWORD: process.env.SUPER_ADMIN_PASSWORD as string,
    FRONTEND_URL: process.env.FRONTEND_URL as string,
  }
}

export const envVars = loadEnvVariables();
