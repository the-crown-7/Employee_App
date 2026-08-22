import { View, Image, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function ImageView() {
  const router = useRouter();
  const { image } = useLocalSearchParams();

  return (
    <View style={{ flex: 1, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center' }}>
      
      <TouchableOpacity
        onPress={() => router.back()}
        style={{ position: 'absolute', top: 40, right: 20, zIndex: 10 }}
      >
        {/* simple close button */}
      </TouchableOpacity>

      <Image
        source={{ uri: image as string }}
        style={{ width: '100%', height: '80%', resizeMode: 'contain' }}
      />
    </View>
  );
}