import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import { registerStyles } from './register.styles';
import { registerUser } from '../../services/registerServices'; // ✅ import API

export default function RegisterScreen() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    // ✅ validation
    if (!name || !email || !password) {
      Alert.alert("Error", "All fields are required");
      return;
    }

    try {
      const userData = {
        name,
        email,
        password,
      };

      console.log("Sending:", userData);

      const result = await registerUser(userData);

      console.log("Response:", result);

      if (result.success) {
        Alert.alert("Success", "Registered successfully");
        router.replace('/login'); // ✅ go to login after register
      } else {
        Alert.alert("Error", result.message);
      }

    } catch (error) {
      console.log("Register error:", error);
      Alert.alert("Error", "Something went wrong");
    }
  };

  return (
    <View style={registerStyles.container}>
      <View style={registerStyles.logoCircle}>
        <Image
          source={require('../../../assets/images/logo.png')}
          style={registerStyles.logoImage}
          resizeMode="contain"
        />
      </View>

      <TextInput
        style={registerStyles.input}
        placeholder="Name"
        placeholderTextColor="#999"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={registerStyles.input}
        placeholder="Email"
        placeholderTextColor="#999"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={registerStyles.input}
        placeholder="Password"
        placeholderTextColor="#999"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={registerStyles.button} onPress={handleRegister}>
        <Text style={registerStyles.buttonText}>Register</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/login')}>
        <Text style={registerStyles.loginText}>
          Already have an account? Login
        </Text>
      </TouchableOpacity>
    </View>
  );
}