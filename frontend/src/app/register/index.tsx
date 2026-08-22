import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';

import { registerStyles } from './register.styles';
import { registerUser } from '../../services/registerServices';

export default function RegisterScreen() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async () => {
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    // ✅ validation
    if (!trimmedName || !trimmedEmail || !password) {
      Alert.alert("Error", "All fields are required");
      return;
    }

    const nameRegex = /^[A-Za-z]+(?: [A-Za-z]+)+$/;
    if (!nameRegex.test(trimmedName)) {
      setError('Please enter your full name');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setError('Please enter a valid email');
      return;
    }

    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[@$!%*?&]/.test(password);
    const hasMinLength = password.length >= 8;

    if (
      !hasMinLength ||
      !hasUppercase ||
      !hasLowercase ||
      !hasNumber ||
      !hasSpecial
    ) {
      setError(
        'Password must be 8+ chars with uppercase, lowercase, number, special char'
      );
      return;
    }

    setError('');

    try {
      const userData = {
        name: trimmedName,
        email: trimmedEmail,
        password,
      };


      const result = await registerUser(userData);


      if (result.success) {
        Alert.alert("Success", "Registered successfully");
        router.replace('/login');
      } else {
        Alert.alert("Error", result.message);
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong");
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#ffffff' }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={registerStyles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={registerStyles.container}>

          <View style={registerStyles.logoCircle}>
            <Image
              source={require('../../../assets/images/logo.png')}
              style={registerStyles.logoImage}
              resizeMode="contain"
            />
          </View>

          {error ? (
            <Text style={registerStyles.errorText}>{error}</Text>
          ) : null}

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

          <TouchableOpacity
            style={registerStyles.button}
            onPress={handleRegister}
          >
            <Text style={registerStyles.buttonText}>Register</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push('/login')}>
            <Text style={registerStyles.loginText}>
              Already have an account? Login
            </Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}