import { Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

const guidelineBaseWidth = 350;

export const scale = size => (width / guidelineBaseWidth) * size;
export const cardHeight = scale(height - 200);
