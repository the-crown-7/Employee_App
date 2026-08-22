import { StyleSheet } from 'react-native';

export const sellStyles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f9fafb',
    justifyContent: 'flex-start', // fixed (better than space-between)
  },

  header: {
    width: '100%',
    marginBottom: 15,
  },

  backText: {
    fontSize: 16,
    color: '#2563eb',
    fontWeight: '600',
  },

  title: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 10,
  },

  product: {
    fontSize: 15,
    textAlign: 'center',
    marginTop: 8,
    color: '#6b7280',
  },

  amount: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#16a34a',
    textAlign: 'center',
    marginVertical: 20,
  },

  qr: {
    width: 220,
    height: 220,
    alignSelf: 'center',
    borderRadius: 16,
    marginVertical: 25,
  },

  upi: {
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 8,
  },

  note: {
    fontSize: 13,
    color: '#6b7280',
    textAlign: 'center',
    marginTop: 10,
    paddingHorizontal: 20,
  },

  doneButton: {
    backgroundColor: '#16a34a',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 40,

    // Android shadow
    elevation: 4,

    // iOS shadow
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },

  doneText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },

  // SUCCESS SCREEN STYLES

  successContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    padding: 20,
  },

  successIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 110,
    width: 110,
    backgroundColor: '#16a34a',
    borderRadius: 55,
    marginBottom: 20,

    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },

  tick: {
    fontSize: 65,
    color: '#fff',
    fontWeight: 'bold',
  },

  successText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },

  successAmount: {
    fontSize: 20,
    color: '#4b5563',
    marginBottom: 30,
  },
});