import { Image, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Video from 'react-native-video';
import { IMAGES, VIDEO } from 'constants/assets';
import { COLORS, screenHeight, screenWidth } from 'utils/index';

export const Splash = () => {
  return (
    <View style={styles.container}>
      <Video
        source={VIDEO.SPLASH}
        style={styles.video}
        resizeMode='cover'
        muted
        playInBackground={false}
        playWhenInactive={false}
        ignoreSilentSwitch='obey'
        repeat
        paused={false}
      />
      <LinearGradient
        colors={['rgba(0,0,0,0.35)', 'rgba(0,0,0,0.75)', 'rgba(0,0,0,0.95)']}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.logoWrap}>
        <Image source={IMAGES.MOTIVAULT_LOGO} style={styles.logo} resizeMode='contain' />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
  logoWrap: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: screenWidth(80),
    height: screenHeight(30),
  },
});
