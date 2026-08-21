import { useState, useEffect } from 'react';
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
import * as SecureStore from 'expo-secure-store';
import { useRouter } from 'expo-router';

import { homeStyles } from './home.styles';
import { getProducts } from '../../services/productServices';
import { fetchProfileAPI } from '../../services/profileServices';

export default function HomeScreen() {
  const router = useRouter();

  const [showProfile, setShowProfile] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [employee, setEmployee] = useState<any>(null);
  const [profileLoading, setProfileLoading] = useState(false);

  // ✅ CORRECT HOOK
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
    } finally {
      setLoading(false);
    }
  };

  const handleSell = (productId: string) => {
  };

  // PROFILE FETCH
  const handleProfileOpen = async () => {
    setShowProfile(true);
    setProfileLoading(true);

    const res = await fetchProfileAPI();


    if (res.success) {
      setEmployee(res.profile);
    }

    setProfileLoading(false);
  };

  // LOGOUT
  const handleLogout = async () => {
    await SecureStore.deleteItemAsync('token');
    setShowProfile(false);
    router.replace('/login');
  };

  if (loading) {
    return (
      <View style={homeStyles.loaderContainer}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 10 }}>Loading products...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={homeStyles.screen} edges={['top', 'bottom']}>

      {/* HEADER */}
      <View style={homeStyles.header}>
        <Image
          source={require('../../../assets/images/logo.png')}
          style={homeStyles.headerLogo}
        />

        <View style={homeStyles.headerCenter}>
          <Text style={homeStyles.headerTitle}>TCCKOL</Text>
          <Text style={homeStyles.headerSubtitle}>
            Your Trust , Our Priority
          </Text>
        </View>

        {/* AVATAR */}
        <TouchableOpacity onPress={handleProfileOpen}>
          <Image
            source={require('../../../assets/images/avater.png')}
            style={homeStyles.headerAvatar}
          />
        </TouchableOpacity>
      </View>

      {/* PROFILE DROPDOWN */}
      {showProfile && (
        <>
          <Pressable
            style={homeStyles.overlay}
            onPress={() => setShowProfile(false)}
          />

          <View style={homeStyles.profileDropdown}>

            {profileLoading ? (
              <Text style={homeStyles.loadingText}>
                Loading profile...
              </Text>
            ) : employee ? (
              <>
                <Image
                  source={
                    employee?.avatar
                      ? { uri: employee.avatar }
                      : require('../../../assets/images/avater.png')
                  }
                  style={homeStyles.profileAvatar}
                />

                <Text style={homeStyles.profileName}>
                  {employee.name}
                </Text>

                <View style={homeStyles.divider} />

                <View style={homeStyles.infoRow}>
                  <Text style={homeStyles.label}>Employee ID</Text>
                  <Text style={homeStyles.value}>
                    {employee.employee_id}
                  </Text>
                </View>

                <View style={homeStyles.infoRow}>
                  <Text style={homeStyles.label}>Email</Text>
                  <Text style={homeStyles.value}>
                    {employee.email}
                  </Text>
                </View>

                {/* LOGOUT INSIDE DROPDOWN */}
                <TouchableOpacity
                  style={{
                    marginTop: 12,
                    backgroundColor: '#dc2626',
                    paddingVertical: 8,
                    paddingHorizontal: 20,
                    borderRadius: 8,
                  }}
                  onPress={handleLogout}
                >
                  <Text style={{ color: '#fff', fontWeight: '700' }}>
                    Logout
                  </Text>
                </TouchableOpacity>

              </>
            ) : (
              <Text style={homeStyles.loadingText}>
                Failed to load profile. Please try again.
              </Text>
            )}

          </View>
        </>
      )}

      {/* PRODUCTS */}
      <ScrollView contentContainerStyle={homeStyles.contentContainer}>

        {products.map((product: any) => (
          <View key={product.id} style={homeStyles.card}>

            <Image
              source={{
                uri: product.image || 'https://via.placeholder.com/150',
              }}
              style={homeStyles.productImage}
            />

            <View style={homeStyles.cardInfo}>
              <Text style={homeStyles.productName}>
                {product.name}
              </Text>

              <Text numberOfLines={2} style={homeStyles.productDescription}>
                {product.description}
              </Text>

              <View>
                {Number(product.discount) > 0 ? (
                  <>
                    {/* Row 1 → MRP + Discount */}
                    <View style={homeStyles.priceRow}>
                      <Text style={homeStyles.productMrp}>
                        ₹{product.mrp}
                      </Text>

                      <Text style={homeStyles.productDiscount}>
                        {product.discount}% OFF
                      </Text>
                    </View>

                    {/* Row 2 → Final Price */}
                    <Text style={homeStyles.productFinalPrice}>
                      ₹{product.final_price}
                    </Text>
                  </>
                ) : (
                  /* No discount → show only price */
                  <Text style={homeStyles.productFinalPrice}>
                    ₹{product.final_price}
                  </Text>
                )}
              </View>
            </View>

            <TouchableOpacity
              style={homeStyles.sellButton}
              onPress={() => handleSell(product.id)}
            >
              <Text style={homeStyles.sellButtonText}>Sell</Text>
            </TouchableOpacity>

          </View>
        ))}

        {/* FOOTER */}
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
}