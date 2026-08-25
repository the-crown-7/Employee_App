import * as SecureStore from 'expo-secure-store';
import { API_BASE_URL } from './api';

export const fetchProfileAPI = async () => {
  try {
    const token = await SecureStore.getItemAsync('token');

    const res = await fetch(
      `${API_BASE_URL}/auth/profile`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();

    console.log("PROFILE API RESPONSE:", data);

    return data;
  } catch (error) {
    console.log('PROFILE ERROR:', error);
    return { success: false };
  }
};