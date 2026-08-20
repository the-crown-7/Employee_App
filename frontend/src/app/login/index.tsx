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
} from 'react-native';
import { loginStyles } from './login.styles';

export default function LoginScreen() {
  const router = useRouter();
 const [employeeId, setEmployeeId] = useState('');
 const [password, setPassword] = useState('');
 const [error, setError] = useState('');

  const handleLogin = () => {
  const trimmedEmployeeId = employeeId.trim();

  // Employee ID format
  const employeeIdRegex = /^EMP[0-9]{3,}$/i;

  if (!employeeIdRegex.test(trimmedEmployeeId)) {
    setError('Please enter a valid employee ID');
    return;
  }

  // Strong password format
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
    setError('Please enter a valid strong password');
    return;
  }

  // Basic validation passed
  setError('');

  console.log('Employee ID:', trimmedEmployeeId);
  console.log('Password:', password);

  router.replace('/home');
};


   return (
  <KeyboardAvoidingView
    style={{ flex: 1 }}
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
  >
    <ScrollView
      contentContainerStyle={loginStyles.scrollContainer}
      keyboardShouldPersistTaps="handled"
    >
      <View style={loginStyles.container}>
      <View style={loginStyles.logoCircle}>
        <Image
          source={require('../../../assets/images/logo.png')}
          style={loginStyles.logoImage}
          resizeMode="contain"
        />
      </View>
      
      <Text style={loginStyles.title}>Login</Text>
      {error ? (
  <Text style={loginStyles.errorText}>{error}</Text>
) : null}
      <TextInput
  style={loginStyles.input}
  placeholder="Employee ID"
  placeholderTextColor="#999"
  autoCapitalize="characters"
  value={employeeId}
  onChangeText={setEmployeeId}
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
    </ScrollView>
  </KeyboardAvoidingView>
);
}