// import { cleanEnv, str } from "envalid";
// import {config} from "dotenv"

// config();

export const env = cleanEnv(process.env, {
  NEXT_PUBLIC_API_BASE_URL: str(),
  JWT_SECRET: str(),
});

// import dotenv from "dotenv";

// dotenv.config();

interface AppConfig {
  mongo: {
    url: string;
  };
  server: {
    port: number;
  };
  jwt: {
    secret: string;
  };
  s3: {
    accesskey: string;
    secretKey: string;
  };
  aws: {
    region: string;
    sqs: string;
    sns: string;
  };
  stripe: {
    secret: string;
    publishKey: string
  };
  nodemailer:{
    user: string;
    password: string
  }
}

// Define a function to validate and load environment variables
function validateEnvVariable(
  name: string,
  defaultValue: string,
  validator?: (value: string) => boolean
): string {
  const value = process.env[name] || defaultValue;
  if (validator && !validator(value)) {
    throw new Error(`Invalid value for ${name}: ${value}`);
  }
  return value;
}

// Validate and load environment variables
const NEXT_PUBLIC_API_BASE_URL = validateEnvVariable("NEXT_PUBLIC_API_BASE_URL", "");


// Create the configuration object
export const config: AppConfig = {
  server: {
    port: parseInt(SERVER_PORT),
  },
  jwt: {
    secret: JWT_SECRET,
  }
};
