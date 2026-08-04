import { Image, StyleSheet, View } from 'react-native';
import { IMAGES } from 'constants/assets';
import { ChildrenType } from 'types/common';
import { COLORS } from 'utils/index';

type Props = {
  children: ChildrenType;
};

export const MotivaultScreenBackground = ({ children }: Props) => {
  return (
    <View style={styles.container}>
      <Image source={IMAGES.BG_BLOB} style={styles.blobRight} resizeMode='contain' />
      <Image source={IMAGES.BG_BLOB} style={styles.blobLeft} resizeMode='contain' />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BLACK,
  },
  blobRight: {
    position: 'absolute',
    right: -80,
    top: '35%',
    width: 220,
    height: 220,
    opacity: 0.35,
  },
  blobLeft: {
    position: 'absolute',
    left: -90,
    bottom: 40,
    width: 240,
    height: 240,
    opacity: 0.3,
  },
});
