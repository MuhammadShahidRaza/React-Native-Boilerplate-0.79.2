import { Image, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Video from 'react-native-video';
import { IMAGES, VIDEO } from 'constants/assets';
import { ChildrenType } from 'types/common';
import { COLORS, screenHeight, screenWidth } from 'utils/index';

type Props = {
  children: ChildrenType;
  showOverlay?: boolean;
};

export const MotivaultAuthBackground = ({ children, showOverlay = true }: Props) => {
  return (
    <View style={styles.bg}>
      <Video
        source={VIDEO.SPLASH}
        style={styles.video}
        resizeMode='cover'
        muted
        repeat
        paused={false}
        playInBackground={false}
        playWhenInactive={false}
        ignoreSilentSwitch='obey'
        poster={Image.resolveAssetSource(IMAGES.AUTH_BG)?.uri}
        posterResizeMode='cover'
      />
      {showOverlay && (
        <LinearGradient
          colors={['rgba(0,0,0,0.35)', 'rgba(0,0,0,0.75)', 'rgba(0,0,0,0.95)']}
          style={StyleSheet.absoluteFill}
        />
      )}
      <View style={styles.content}>{children}</View>
    </View>
  );
};

export const MotivaultLogo = ({ size = 'large' }: { size?: 'large' | 'small' }) => {
  const height = size === 'large' ? screenHeight(18) : screenHeight(12);
  const width = size === 'large' ? screenWidth(55) : screenWidth(40);
  return (
    <View style={styles.logoWrap}>
      <Image source={IMAGES.MOTIVAULT_LOGO} style={{ width, height }} resizeMode='contain' />
    </View>
  );
};

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: COLORS.BLACK,
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  content: {
    flex: 1,
  },
  logoWrap: {
    alignItems: 'center',
    marginTop: screenHeight(4),
    marginBottom: screenHeight(2),
  },
});
