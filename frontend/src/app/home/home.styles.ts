import { StyleSheet } from 'react-native';

export const homeStyles = StyleSheet.create({

  screen: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },

  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },

  headerLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },

  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#222',
  },

  headerSubtitle: {
    fontSize: 11,
    color: '#888',
  },

  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },

  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 5,
  },

  profileDropdown: {
    position: 'absolute',
    top: 70,
    right: 16,
    width: 240,
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    zIndex: 10,
    elevation: 8,
    alignItems: 'center',
  },

  profileAvatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 10,
  },

  profileName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#222',
    marginBottom: 8,
  },

  divider: {
    height: 1,
    width: '100%',
    backgroundColor: '#eee',
    marginVertical: 10,
  },

  infoRow: {
    width: '100%',
    marginBottom: 6,
  },

  label: {
    fontSize: 11,
    color: '#888',
  },

  value: {
    fontSize: 13,
    fontWeight: '600',
    color: '#222',
  },

  loadingText: {
    fontSize: 14,
    color: '#555',
  },

  contentContainer: {
    padding: 16,
    paddingBottom: 30,
  },

  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 14,
    elevation: 2,
    position: 'relative',
    minHeight: 110,
  },

  productImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 12,
    backgroundColor: '#f0f0f0',
  },

  cardInfo: {
    flex: 1,
    justifyContent: 'center',
  },

  productName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#222',
  },

  productDescription: {
    fontSize: 12,
    color: '#777',
    marginTop: 2,
    marginBottom: 6,
  },

  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },

  productMrp: {
    fontSize: 13,
    color: '#999',
    textDecorationLine: 'line-through',
    marginRight: 8,
  },

  productFinalPrice: {
  fontSize: 16,
  fontWeight: 'bold',
  color: 'green',
  marginTop: 2,   
},
  productDiscount: {
    fontSize: 13,
    color: '#2e8b57',
    fontWeight: '700',
  },

  sellButton: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    backgroundColor: '#16a34a',
    paddingVertical: 5,
    paddingHorizontal: 18,
    borderRadius: 8,
    elevation: 3,
  },

  sellButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 13,
  },

  footer: {
    marginTop: 12,
    paddingVertical: 24,
    paddingHorizontal: 16,
    backgroundColor: '#222',
    borderRadius: 12,
    alignItems: 'center',
  },
  footerAddress: {
    color: '#ccc',
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 6,
  },
  footerContact: {
    color: '#ccc',
    fontSize: 12,
    marginBottom: 4,
  },
  socialRow: {
    flexDirection: 'row',
    marginTop: 12,
    marginBottom: 20,
    alignItems: 'center',
    gap: 20,
    justifyContent: 'center',
  },
  socialIcon: {
    fontSize: 22,
    marginHorizontal: 10,
  },

});