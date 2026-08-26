import * as SecureStore from "expo-secure-store";
import { API_BASE_URL } from "./api";

export const loginUser = async (data) => {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    //  Handle non-200 responses
    if (!res.ok) {
      return {
        success: false,
        message: result.message || "Login failed",
      };
    }

    // Store token securely
    if (result.success && result.token) {
      await SecureStore.setItemAsync("token", result.token);
    }

    return result;

  } catch (error) {
    return {
      success: false,
      message: "Network error",
    };
  }
};


// Helper: get token (for protected APIs later)
export const getToken = async () => {
  return await SecureStore.getItemAsync("token");
};


// Helper: logout
export const logoutUser = async () => {
  await SecureStore.deleteItemAsync("token");
};