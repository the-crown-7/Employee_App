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
import { loginStyles } from './login.styles';
import { loginUser } from '../../services/loginServices';

export default function LoginScreen() {
  const router = useRouter();

  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!employeeId || !password) {
      Alert.alert("Error", "All fields are required");
      return;
    }

    try {
      const result = await loginUser({
        employee_id: employeeId,
        password,
      });

      if (result.success) {
        Alert.alert("Success", "Login successful");
        router.replace('/home');
      } else {
        Alert.alert("Error", result.message);
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong");
    }
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
            <Text style={loginStyles.registerText}>
              Don't have an account? Register
            </Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}