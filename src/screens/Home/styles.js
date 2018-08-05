import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

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
    borderRadius: 20,
  },
  cardContainer: {
    shadowColor: '#222',
    shadowOffset: { width: 0, height: 7.5 },
    shadowRadius: 10,
    shadowOpacity: 0.5,
    padding: 20,
  },
  cardText: {
    width: width - 100,
    color: 'white',
    fontSize: 36,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 5,
    position: 'absolute',
    bottom: 45,
    left: 45,
  },
});
