import * as SecureStore from "expo-secure-store";
import { API_BASE_URL } from "./api";

export const getProducts = async () => {
  try {
    const token = await SecureStore.getItemAsync("token");

    if (!token) {
      return {
        success: false,
        message: "No token found",
      };
    }

    const res = await fetch(`${API_BASE_URL}/product/view`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const text = await res.text();

    try {
      return JSON.parse(text);
    } catch (e) {
      return {
        success: false,
        message: "Server returned invalid response",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: "Network error",
    };
  }
};