import * as SecureStore from "expo-secure-store";
import { API_BASE_URL } from "./api";

export const registerUser = async (data) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
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
    return {
      success: false,
      message: "Network error. Check that the backend is running and reachable.",
    };
  }
};