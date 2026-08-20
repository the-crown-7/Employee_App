import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Image, View } from 'react-native';
import { splashStyles } from './splash.styles';
export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/login');
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={splashStyles.container}>
      <View style={splashStyles.logoCircle}>
        <Image
          source={require('../../assets/images/logo.png')}
          style={splashStyles.logoImage}
          resizeMode="contain"
        />
      </View>
    </View>
  );
}