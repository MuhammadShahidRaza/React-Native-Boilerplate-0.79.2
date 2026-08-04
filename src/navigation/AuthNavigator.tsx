import { StyleSheet, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MotivaultAuthBackground } from 'components/appComponents/motivault';
import { SCREENS } from 'constants/index';
import { useBackHandler } from 'hooks/index';
import {
  Login,
  SignUp,
  Verification,
  ResetPassword,
  ForgotPassword,
} from 'screens/auth';
import { screenOptions } from './Navigators';
import { PrivacyPolicy } from 'screens/common';
import { renderCommonScreens } from './CommonNavigator';

/** Screens that render on top of the shared MotivaultAuthBackground video below. */
const VIDEO_BG_SCREEN_OPTIONS = { contentStyle: { backgroundColor: 'transparent' } };

export const AuthNavigator = () => {
  useBackHandler();

  const Stack = createNativeStackNavigator();

  const screens = {
    [SCREENS.LOGIN]: Login,
    [SCREENS.SIGN_UP]: SignUp,
    [SCREENS.FORGOT_PASSWORD]: ForgotPassword,
    [SCREENS.RESET_PASSWORD]: ResetPassword,
    [SCREENS.VERIFICATION]: Verification,
  };

  return (
    <View style={styles.flex}>
      <View style={StyleSheet.absoluteFill}>
        <MotivaultAuthBackground />
      </View>
      <Stack.Navigator screenOptions={screenOptions}>
        {Object.entries(screens).map(([name, component]: [string, React.ComponentType<any>]) => (
          <Stack.Screen
            key={name}
            name={name}
            component={component}
            options={VIDEO_BG_SCREEN_OPTIONS}
          />
        ))}
        <Stack.Screen
          name={SCREENS.PRIVACY_POLICY}
          component={PrivacyPolicy as React.ComponentType<any>}
        />
        {renderCommonScreens(Stack)}
      </Stack.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1 },
});
