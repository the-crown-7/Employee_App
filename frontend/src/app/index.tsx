import React, { useEffect } from 'react';
import { View, Image, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { splashStyles } from './splash.styles';

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = await SecureStore.getItemAsync('token');

      // small delay for splash feel
      setTimeout(() => {
        if (token) {
          router.replace('/home'); // ✅ go to home if logged in
        } else {
          router.replace('/login'); // ❌ go to login if not
        }
      }, 2000);
    } catch (error) {
      router.replace('/login');
    }
  };

  return (
    <View style={splashStyles.container}>
      <View style={splashStyles.logoCircle}>
        <Image
          source={require('../../assets/images/logo.png')}
          style={splashStyles.logoImage}
          resizeMode="contain"
        />
      </View>

      {/* Optional loader */}
      <ActivityIndicator size="large" style={{ marginTop: 20 }} />
    </View>
  );
}