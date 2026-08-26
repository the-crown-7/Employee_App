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
import { registerUser } from '../../services/registerServices';

export default function RegisterScreen() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async () => {
    const trimmedName = name.trim();
    const trimmedEmail = email.trim().toLowerCase();

    // ✅ NAME VALIDATION
    const nameRegex = /^[A-Za-z]+(?: [A-Za-z]+)+$/;
    if (!nameRegex.test(trimmedName)) {
      setError('Please enter your full name');
      return;
    }

    // ✅ EMAIL VALIDATION (FIXED)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setError('Please enter a valid email');
      return;
    }

    // ✅ PASSWORD VALIDATION
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[@$!%*?&]/.test(password);
    const hasMinLength = password.length >= 8;

    if (!hasMinLength || !hasUppercase || !hasLowercase || !hasNumber || !hasSpecial) {
      setError(
        'Please enter a strong password: 8+ characters, uppercase, lowercase, number and special character'
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

      console.log("📤 SENDING DATA:", userData);

      // ✅ API CALL (IMPORTANT PART)
      const result = await registerUser(userData);

      console.log("📩 BACKEND RESPONSE:", result);

      if (result?.success) {
        router.replace('/login');
      } else {
        setError(result?.message || "Registration failed");
      }

    } catch (error) {
      console.log("REGISTER ERROR:", error);
      setError("Something went wrong");
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

          <View style={registerStyles.passwordContainer}>
            <TextInput
              key={showPassword ? 'password-visible' : 'password-hidden'}
              style={registerStyles.passwordInput}
              placeholder="Password"
              placeholderTextColor="#999"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              style={registerStyles.passwordToggleButton}
              onPress={() => setShowPassword((visible) => !visible)}
              activeOpacity={0.7}
              hitSlop={8}
              accessibilityRole="button"
              accessibilityLabel={showPassword ? 'Hide password' : 'Show password'}
            >
              <Text style={registerStyles.passwordToggle}>
                {showPassword ? 'Hide' : 'Show'}
              </Text>
            </TouchableOpacity>
          </View>

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