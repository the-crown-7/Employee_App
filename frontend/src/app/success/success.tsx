import { View, Text, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { sellStyles } from './success.styles';

export default function SuccessScreen() {
  const router = useRouter();

  const { order_id } = useLocalSearchParams();

  return (
    <View style={sellStyles.successContainer}>

      <View style={sellStyles.successIcon}>
        <Text style={sellStyles.tick}>✓</Text>
      </View>

      <Text style={sellStyles.successText}>
        Order Created Successfully
      </Text>

      <Text style={sellStyles.successAmount}>
        Order ID: {order_id}
      </Text>

      <TouchableOpacity
        style={sellStyles.doneButton}
        onPress={() => router.replace('/home')}
      >
        <Text style={sellStyles.doneText}>
          Back to Home
        </Text>
      </TouchableOpacity>

    </View>
  );
}