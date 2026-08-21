import * as SecureStore from "expo-secure-store";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export const getProducts = async () => {
  try {
    const token = await SecureStore.getItemAsync("token");

    const res = await fetch(`${BASE_URL}/product/view`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const text = await res.text();

    const result = JSON.parse(text);

    return result;

  } catch (error) {
    return {
      success: false,
      message: "Network error",
    };
  }
};