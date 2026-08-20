import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { loginStyles } from './login.styles';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // TODO: hook this up to your real auth logic
    console.log('Login pressed:', email, password);
    router.replace('/home');
  };


   return (
    <View style={loginStyles.container}>
      <View style={loginStyles.logoCircle}>
        <Image
          source={require('../../../assets/images/logo.png')}
          style={loginStyles.logoImage}
          resizeMode="contain"
        />
      </View>

      <Text style={loginStyles.title}>Login</Text>
      <TextInput
        style={loginStyles.input}
        placeholder="Email"
        placeholderTextColor="#999"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={loginStyles.input}
        placeholder="Password"
        placeholderTextColor="#999"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={loginStyles.button} onPress={handleLogin}>
        <Text style={loginStyles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/register')}>
        <Text style={loginStyles.registerText}>Don't have an account? Register</Text>
      </TouchableOpacity>
    </View>
  );
}