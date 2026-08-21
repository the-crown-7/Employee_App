import { useEffect, useState } from 'react';
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Linking,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';
import { homeStyles } from './home.styles';
import { getProducts } from '../../services/productServices';

const employee = {
  id: 'EMP1024',
  name: 'John Doe',
  email: 'john.doe@example.com',
};

export default function HomeScreen() {
  const [showProfile, setShowProfile] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const result = await getProducts();

      if (result.success) {
        setProducts(result.products || result.data || []);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSell = (productId: string) => {
    console.log('Sell pressed for product:', productId);
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
        <Text>Loading products...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={homeStyles.screen} edges={['top', 'bottom']}>

      {/* Header */}
      <View style={homeStyles.header}>
        <Image
          source={require('../../../assets/images/logo.png')}
          style={homeStyles.headerLogo}
          resizeMode="contain"
        />

        <View style={homeStyles.headerCenter}>
          <Text style={homeStyles.headerTitle}>TCCKOL</Text>
          <Text style={homeStyles.headerSubtitle}>Your trusted marketplace</Text>
        </View>

        <TouchableOpacity onPress={() => setShowProfile(!showProfile)}>
          <Image
            source={require('../../../assets/images/logo.png')}
            style={homeStyles.headerAvatar}
          />
        </TouchableOpacity>
      </View>

      {/* Profile dropdown */}
      {showProfile && (
        <>
          <Pressable
            style={homeStyles.overlay}
            onPress={() => setShowProfile(false)}
          />

          <View style={homeStyles.profileDropdown}>
            <Text>{employee.id}</Text>
            <Text>{employee.name}</Text>
            <Text>{employee.email}</Text>
          </View>
        </>
      )}

      {/* Products */}
      <ScrollView>
        {products.map((product: any) => (
          <View key={product.id} style={homeStyles.card}>

            <Image
              source={{
                uri: product.image || 'https://via.placeholder.com/150',
              }}
              style={homeStyles.productImage}
            />

            <Text>{product.name}</Text>
            <Text>{product.description}</Text>
            <Text>₹{product.mrp}</Text>
            <Text>{product.discount}</Text>

            <TouchableOpacity onPress={() => handleSell(product.id)}>
              <Text>Sell</Text>
            </TouchableOpacity>

          </View>
        ))}

        {/* Footer (moved outside map correctly) */}
        <View style={homeStyles.footer}>
          <Text style={homeStyles.footerAddress}>
            123 Market Street, Kolkata, West Bengal, India
          </Text>
          <Text style={homeStyles.footerContact}>tcckol@example.com</Text>
          <Text style={homeStyles.footerContact}>+91 98765 43210</Text>

          <View style={homeStyles.socialRow}>
            <TouchableOpacity onPress={() => Linking.openURL('https://www.facebook.com/profile.php?id=61593189241605')}>
              <FontAwesome name="facebook" size={24} color="#1877F2" />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => Linking.openURL('https://wa.me/919147367703')}>
              <FontAwesome name="whatsapp" size={24} color="#25D366" />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => Linking.openURL('https://www.instagram.com/tcc536')}>
              <FontAwesome name="instagram" size={24} color="#E4405F" />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => Linking.openURL('https://x.com/consultanc19555')}>
              <FontAwesome name="twitter" size={24} color="#1DA1F2" />
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}