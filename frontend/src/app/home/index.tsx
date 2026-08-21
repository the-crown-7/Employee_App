import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image, Linking, Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { homeStyles } from './home.styles';
import { FontAwesome } from '@expo/vector-icons';

type Product = {
  id: string;
  name: string;
  description: string;
  mrp: string;
  discount: string;
};

const products: Product[] = [
  { id: '1', name: 'Product One', description: 'Short product description goes here', mrp: '₹999', discount: '20% OFF' },
  { id: '2', name: 'Product Two', description: 'Short product description goes here', mrp: '₹1,499', discount: '15% OFF' },
  { id: '3', name: 'Product Three', description: 'Short product description goes here', mrp: '₹799', discount: '10% OFF' },
  { id: '4', name: 'Product Four', description: 'Short product description goes here', mrp: '₹2,199', discount: '25% OFF' },
  { id: '5', name: 'Product Five', description: 'Short product description goes here', mrp: '₹599', discount: '5% OFF' },
  { id: '6', name: 'Product Six', description: 'Short product description goes here', mrp: '₹1,099', discount: '30% OFF' },
  { id: '7', name: 'Product Seven', description: 'Short product description goes here', mrp: '₹1,899', discount: '18% OFF' },
];
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

const employee = {
  id: 'EMP1024',
  name: 'John Doe',
  email: 'john.doe@example.com',
};

export default function HomeScreen() {
  const [showProfile, setShowProfile] = useState(false);

  const handleSell = (productId: string) => {
    // TODO: hook this up to your real sell/product flow
    console.log('Sell pressed for product:', productId);
  };
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
            resizeMode="cover"
          />
        </TouchableOpacity>
      </View>

      {/* Profile dropdown - only shows when avatar is tapped */}
      {showProfile && (
        <>
          <Pressable style={homeStyles.overlay} onPress={() => setShowProfile(false)} />

          <View style={homeStyles.profileDropdown}>
            <View style={homeStyles.profileAvatarCircle}>
              <Image
                source={require('../../../assets/images/logo.png')}
                style={homeStyles.profileAvatarImage}
                resizeMode="cover"
              />
            </View>

            <Text style={homeStyles.profileLabel}>Employee ID</Text>
            <Text style={homeStyles.profileValue}>{employee.id}</Text>

            <Text style={homeStyles.profileLabel}>Name</Text>
            <Text style={homeStyles.profileValue}>{employee.name}</Text>

            <Text style={homeStyles.profileLabel}>Email</Text>
            <Text style={homeStyles.profileValue}>{employee.email}</Text>
          </View>
        </>
      )}

      {/* Main content */}
      <ScrollView
        style={homeStyles.content}
        contentContainerStyle={homeStyles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {products.map((product) => (
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

        {/* Footer */}
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

  <TouchableOpacity
  onPress={() => Linking.openURL('https://www.instagram.com/tcc536')}
>
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