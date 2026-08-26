import * as SecureStore from "expo-secure-store";
import { API_BASE_URL } from "./api";

export const createOrder = async (product_name, amount) => {
  try {
    const token = await SecureStore.getItemAsync("token");

    if (!token) {
      return {
        success: false,
        message: "No token found",
      };
    }

    const res = await fetch(`${API_BASE_URL}/order/create-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        product_name,
        amount,
      }),
    });

    return await res.json();

  } catch (error) {
    return {
      success: false,
      message: "Network error. Check that the backend is running and reachable.",
    };
  }
};