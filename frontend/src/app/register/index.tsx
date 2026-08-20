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
import { registerStyles } from './register.styles';

export default function RegisterScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

 const handleRegister = () => {
  const trimmedName = name.trim();
  const trimmedEmail = email.trim();

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
    'Please enter a strong password: 8+ characters, uppercase, lowercase, number and special character'
  );
  return;
}
  setError('');
  console.log('Register pressed:', trimmedName, trimmedEmail, password);

  router.replace('/login');
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

      <TouchableOpacity style={registerStyles.button} onPress={handleRegister}>
        <Text style={registerStyles.buttonText}>Register</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/login')}>
        <Text style={registerStyles.loginText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
    </ScrollView>
  </KeyboardAvoidingView>
);
}