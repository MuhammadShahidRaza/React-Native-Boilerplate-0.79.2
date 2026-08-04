import { StyleSheet, View } from 'react-native';
import Video from 'react-native-video';
import { VIDEO } from 'constants/assets';
import { COLORS } from 'utils/index';

export const Splash = () => {
  return (
    <View style={styles.container}>
      <Video
        source={VIDEO.SPLASH}
        style={styles.video}
        resizeMode='cover'
        muted
        repeat={false}
        playInBackground={false}
        playWhenInactive={false}
        ignoreSilentSwitch='obey'
      />
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
});
