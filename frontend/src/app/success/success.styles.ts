import { StyleSheet } from 'react-native';

export const sellStyles = StyleSheet.create({
  successContainer: {
    flex: 1,
    backgroundColor: '#f9fafb',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  successIcon: {
    height: 110,
    width: 110,
    borderRadius: 55,
    backgroundColor: '#16a34a',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,

    // subtle shadow (Android + iOS)
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

  doneButton: {
    backgroundColor: '#16a34a',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 12,
    alignItems: 'center',

    // shadow for button
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },

  doneText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});