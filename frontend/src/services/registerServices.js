import * as SecureStore from "expo-secure-store"; 
const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

if (!BASE_URL) {
}

export const registerUser = async (data) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log("REGISTER RESPONSE:", result);

    return result;
  } catch (error) {
    console.log("REGISTER ERROR:", error);
  }
};