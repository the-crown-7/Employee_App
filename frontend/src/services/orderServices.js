import * as SecureStore from "expo-secure-store";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export const createOrder = async (product_name, amount) => {
  try {
    const token = await SecureStore.getItemAsync("token");

    if (!token) {
      return {
        success: false,
        message: "No token found",
      };
    }

    const res = await fetch(`${BASE_URL}/order/create-order`, {
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

    const text = await res.text();

    try {
      return JSON.parse(text);
    } catch (e) {
      return {
        success: false,
        message: "Invalid server response",
      };
    }

  } catch (error) {
    return {
      success: false,
      message: "Network error",
    };
  }
};