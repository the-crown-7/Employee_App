import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { sellStyles } from './sell.styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createOrder } from '../../services/orderServices';
import { useState } from 'react';

export default function SellScreen() {
  const { name, amount } = useLocalSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const upiId = "thecr85838194@barodampay";

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f9fafb' }}>
      <ScrollView contentContainerStyle={sellStyles.container}>

        {/* HEADER */}
        <View style={sellStyles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={sellStyles.backText}>← Back</Text>
          </TouchableOpacity>
        </View>

        <Text style={sellStyles.title}>Complete Payment</Text>

        <Text style={sellStyles.product}>{name}</Text>

        <Text style={sellStyles.amount}>₹ {Number(amount)}</Text>

        <Image
          source={require('../../../assets/images/qr.jpeg')}
          style={sellStyles.qr}
        />

        <Text style={sellStyles.upi}>UPI ID: {upiId}</Text>

        <Text style={sellStyles.note}>
          Ask customer to scan and pay using GPay / PhonePe / Paytm
        </Text>

        {/* DONE BUTTON */}
        <TouchableOpacity
          style={sellStyles.doneButton}
          disabled={loading}
          onPress={async () => {
            if (loading) return;

            try {
              setLoading(true);

              const result = await createOrder(
                name as string,
                Number(amount)
              );


              if (result.success) {
                router.push({
                  pathname: '/success/success',
                  params: {
                    order_id: result.order_id, // 🔥 ONLY THIS IMPORTANT
                  },
                });
              }

            } catch (error) {
            } finally {
              setLoading(false);
            }
          }}
        >
          <Text style={sellStyles.doneText}>
            {loading ? "Processing..." : "Done"}
          </Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}