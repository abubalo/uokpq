import { cleanEnv, str } from "envalid";

export const env = cleanEnv(process.env, {
  NEXT_PUBLIC_API_BASE_URL: str(),
  JWT_SECRET: str(),
});
