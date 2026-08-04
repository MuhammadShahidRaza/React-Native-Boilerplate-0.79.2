import { useMemo, useCallback } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SCREENS, VARIABLES } from 'constants/index';
import { COLORS } from 'utils/colors';
import { Icon, Typography } from 'components/common';
import type { IconComponentProps } from 'components/common/Icon';
import { FontSize, FontWeight } from 'types/fontTypes';
import { screenHeight } from 'utils/index';
import { Home, MyAccount, Vehicles, ContinuityCases } from 'screens/user';
import { useTranslation } from 'hooks/useTranslation';

const Tab = createBottomTabNavigator();

type ScreenConfig = {
  component: React.ComponentType<any>;
  iconName: string;
  componentName: IconComponentProps['componentName'];
  label: string;
};

const screenConfig: Record<string, ScreenConfig> = {
  [SCREENS.HOME]: {
    component: Home,
    iconName: 'home',
    componentName: VARIABLES.Feather,
    label: 'Home',
  },
  [SCREENS.VEHICLES]: {
    component: Vehicles,
    iconName: 'car-sport-outline',
    componentName: VARIABLES.Ionicons,
    label: 'Vehicles',
  },
  [SCREENS.CONTINUITY_CASES]: {
    component: ContinuityCases,
    iconName: 'chatbubble-ellipses-outline',
    componentName: VARIABLES.Ionicons,
    label: 'Continuity',
  },
  [SCREENS.MY_ACCOUNT]: {
    component: MyAccount,
    iconName: 'person-outline',
    componentName: VARIABLES.Ionicons,
    label: 'Profile',
  },
};

const screenOrder = [
  SCREENS.HOME,
  SCREENS.VEHICLES,
  SCREENS.CONTINUITY_CASES,
  SCREENS.MY_ACCOUNT,
];

export const BottomNavigator = () => {
  const insets = useSafeAreaInsets();
  const { isLangRTL } = useTranslation();

  const orderedScreens = useMemo(() => {
    return isLangRTL ? [...screenOrder].reverse() : screenOrder;
  }, [isLangRTL]);

  const tabBarStyle = useMemo(
    () => ({
      backgroundColor: COLORS.BOTTOM_NAVIGATION_BAR,
      height: screenHeight(8.5) + insets.bottom * 0.3,
      marginBottom: Math.max(insets.bottom, 8),
      borderRadius: 28,
      marginHorizontal: 16,
      paddingTop: 8,
      paddingBottom: 4,
      borderTopWidth: 0,
      elevation: 0,
    }),
    [insets.bottom],
  );

  const screenOptions = useCallback(
    ({ route }: { route: { name: string } }): BottomTabNavigationOptions => {
      const config = screenConfig[route.name];

      if (!config) {
        return { headerShown: false };
      }

      return {
        headerShown: false,
        tabBarStyle,
        tabBarIcon: ({ focused }) => (
          <View style={styles.iconContainer}>
            <Icon
              iconName={config.iconName}
              componentName={config.componentName}
              size={FontSize.ExtraLarge}
              color={focused ? COLORS.WHITE : COLORS.TEXT_SECONDARY}
            />
          </View>
        ),
        tabBarLabel: ({ focused }) =>
          focused ? (
            <View style={styles.labelContainer}>
              <Typography translate={false} style={styles.label}>
                {config.label}
              </Typography>
              <View style={[styles.indicator, { backgroundColor: COLORS.WHITE }]} />
            </View>
          ) : null,
        tabBarHideOnKeyboard: true,
      };
    },
    [tabBarStyle],
  );

  return (
    <Tab.Navigator screenOptions={screenOptions}>
      {orderedScreens.map((screenName: string) => {
        const config = screenConfig[screenName];
        if (!config) return null;
        return <Tab.Screen key={screenName} name={screenName} component={config.component} />;
      })}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  indicator: {
    height: 3,
    width: 15,
    marginTop: 4,
    borderRadius: 10,
    alignSelf: 'center',
  },
  label: {
    color: COLORS.WHITE,
    fontSize: FontSize.ExtraSmall,
    fontWeight: FontWeight.Bold,
  },
});
