import { Image, Linking, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { homeStyles } from './home.styles';

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

export default function HomeScreen() {
  const handleSell = (productId: string) => {
    // TODO: hook this up to your real sell/product flow
    console.log('Sell pressed for product:', productId);
  };

  const handleOpenAccount = () => {
    // TODO: point this wherever "open account" should go
    console.log('Open Account pressed');
  };

  return (
    <View style={homeStyles.screen}>
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

        <Image
          source={require('../../../assets/images/logo.png')}
          style={homeStyles.headerAvatar}
          resizeMode="cover"
        />
      </View>

      {/* Main content */}
      <ScrollView
        style={homeStyles.content}
        contentContainerStyle={homeStyles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {products.map((product) => (
          <View key={product.id} style={homeStyles.card}>
            <Image
              source={require('../../../assets/images/logo.png')}
              style={homeStyles.productImage}
              resizeMode="cover"
            />

            <View style={homeStyles.cardInfo}>
              <Text style={homeStyles.productName}>{product.name}</Text>
              <Text style={homeStyles.productDescription}>{product.description}</Text>

              <View style={homeStyles.priceRow}>
                <Text style={homeStyles.productMrp}>{product.mrp}</Text>
                <Text style={homeStyles.productDiscount}>{product.discount}</Text>
              </View>

              <TouchableOpacity
                style={homeStyles.sellButton}
                onPress={() => handleSell(product.id)}
              >
                <Text style={homeStyles.sellButtonText}>Sell</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {/* Footer */}
        <View style={homeStyles.footer}>
          <Text style={homeStyles.footerAddress}>
            123 Market Street, Kolkata, West Bengal, India
          </Text>
          <Text style={homeStyles.footerContact}>tcckol@example.com</Text>
          <Text style={homeStyles.footerContact}>+91 98765 43210</Text>

          <View style={homeStyles.socialRow}>
            <TouchableOpacity onPress={() => Linking.openURL('https://facebook.com')}>
              <Text style={homeStyles.socialIcon}>📘</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Linking.openURL('https://wa.me/')}>
              <Text style={homeStyles.socialIcon}>💬</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Linking.openURL('https://instagram.com')}>
              <Text style={homeStyles.socialIcon}>📷</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Linking.openURL('https://twitter.com')}>
              <Text style={homeStyles.socialIcon}>🐦</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={homeStyles.openAccountButton} onPress={handleOpenAccount}>
            <Text style={homeStyles.openAccountButtonText}>Open Account</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
