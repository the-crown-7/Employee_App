import Constants from "expo-constants";

const configuredUrl = process.env.EXPO_PUBLIC_API_URL?.trim();
const expoHost = Constants.expoConfig?.hostUri?.split(":")[0];
const developmentHost = expoHost || "localhost";

export const API_BASE_URL = (
  configuredUrl || `http://${developmentHost}:3000/api`
).replace(/\/$/, "");