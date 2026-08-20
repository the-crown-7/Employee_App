import { useEffect, useState } from 'react';
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Linking,
} from 'react-native';
import { homeStyles } from './home.styles';
import { getProducts } from '../../services/productServices';

export default function HomeScreen() {
  const [products, setProducts] = useState([]);
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
      } else {
      }

    } catch (error) {
    } finally {
      setLoading(false);
    }
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
    <View style={homeStyles.screen}>

      {/* Header */}
      <View style={homeStyles.header}>
        <Text style={homeStyles.headerTitle}>TCCKOL</Text>
      </View>

      {/* Products */}
      <ScrollView>
        {products.map((product: any) => (
          <View key={product.id} style={homeStyles.card}>

            <Image
              source={{
                uri: product.image || 'https://via.placeholder.com/150'
              }}
              style={homeStyles.productImage}
            />

            <Text>{product.name}</Text>
            <Text>{product.description}</Text>
            <Text>₹{product.mrp}</Text>
            <Text>{product.discount}</Text>

            <TouchableOpacity
            >
              <Text>Sell</Text>
            </TouchableOpacity>

          </View>
        ))}
      </ScrollView>

    </View>
  );
}