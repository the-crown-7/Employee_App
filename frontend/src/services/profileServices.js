import * as SecureStore from 'expo-secure-store';

export const fetchProfileAPI = async () => {
  try {
    const token = await SecureStore.getItemAsync('token');

    const res = await fetch(
      `${process.env.EXPO_PUBLIC_API_URL}/auth/profile`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const text = await res.text();

    try {
      return JSON.parse(text);
    } catch {
      console.log("NOT JSON RESPONSE:", text);
      return { success: false };
    }
  } catch (error) {
    console.log('PROFILE ERROR:', error);
    return { success: false };
  }
};