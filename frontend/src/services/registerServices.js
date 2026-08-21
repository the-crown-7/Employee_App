import * as SecureStore from "expo-secure-store"; 
const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

if (!BASE_URL) {
}

export const registerUser = async (data) => {
  try {

    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    console.log("Status:", res.status);

    const result = await res.json();

    console.log("Response:", result);

    // handle backend error responses
    if (!res.ok) {
      return {
        success: false,
        message: result.message || "Registration failed",
      };
    }

    return result;

  } catch (error) {
    console.log("REGISTER API ERROR:", error);
    return {
      success: false,
      message: "Network error",
    };
  }
};