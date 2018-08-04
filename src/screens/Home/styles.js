import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    flex: 1,
    height: null,
    width: null,
    resizeMode: 'cover',
    padding: 20,
    justifyContent: 'flex-end',
    shadowColor: '#222',
    shadowOffset: { width: 0, height: 7.5 },
    shadowRadius: 10,
    shadowOpacity: 0.5,
  },
  cardText: {
    color: 'white',
    fontSize: 40,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 5,
  },
});
