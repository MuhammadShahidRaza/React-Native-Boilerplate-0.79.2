import { StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon, Typography } from 'components/common';
import {
  MotivaultAuthBackground,
  MotivaultLogo,
} from 'components/appComponents/motivault';
import { VARIABLES } from 'constants/common';
import { onBack } from 'navigation/Navigators';
import { ChildrenType } from 'types/common';
import { FontSize, FontWeight } from 'types/fontTypes';
import { COLORS, screenWidth } from 'utils/index';

type Props = {
  children: ChildrenType;
  heading: string;
  description?: string;
  showBack?: boolean;
  showLogo?: boolean;
  bottomText?: string;
  bottomButtonText?: string;
  onBottomTextPress?: () => void;
};

export const MotivaultAuthShell = ({
  children,
  heading,
  description,
  showBack = false,
  showLogo = true,
  bottomText,
  bottomButtonText,
  onBottomTextPress,
}: Props) => {
  const insets = useSafeAreaInsets();

  return (
    <MotivaultAuthBackground>
      <KeyboardAwareScrollView
        style={styles.flex}
        contentContainerStyle={[
          styles.content,
          { paddingTop: insets.top + 8, paddingBottom: insets.bottom + 20 },
        ]}
        keyboardShouldPersistTaps='handled'
        showsVerticalScrollIndicator={false}
      >
        {showBack && (
          <Icon
            componentName={VARIABLES.Ionicons}
            iconName='chevron-back'
            size={28}
            color={COLORS.WHITE}
            onPress={onBack}
            iconStyle={styles.back}
          />
        )}
        {showLogo && <MotivaultLogo />}
        <View style={styles.sheet}>
          <Typography translate={false} style={styles.heading}>
            {heading}
          </Typography>
          {!!description && (
            <Typography translate={false} style={styles.description}>
              {description}
            </Typography>
          )}
          {children}
          {!!bottomText && !!bottomButtonText && (
            <View style={styles.bottomRow}>
              <Typography translate={false} style={styles.bottomText}>
                {bottomText}
              </Typography>
              <Typography
                translate={false}
                style={styles.bottomLink}
                onPress={onBottomTextPress}
              >
                {bottomButtonText}
              </Typography>
            </View>
          )}
        </View>
      </KeyboardAwareScrollView>
    </MotivaultAuthBackground>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1 },
  content: {
    flexGrow: 1,
    // paddingHorizontal: 20,
  },
  back: {
    alignSelf: 'flex-start',
    marginBottom: 4,
  },
  sheet: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 18,
    paddingTop: 24,
    paddingBottom: 10,
    marginTop: 8,
    minHeight: 320,
  },
  heading: {
    color: COLORS.WHITE,
    fontSize: FontSize.ExtraExtraLarge,
    fontWeight: FontWeight.Bold,
    textAlign: 'center',
  },
  description: {
    color: COLORS.WHITE,
    fontSize: FontSize.Medium,
    textAlign: 'center',
    marginBottom: 22,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    marginTop: 'auto',
    marginBottom: 8,
    width: screenWidth(90),
    alignSelf: 'center',
  },
  bottomText: {
    color: COLORS.LIGHT_GREY,
    fontSize: FontSize.Medium,
  },
  bottomLink: {
    color: COLORS.WHITE,
    fontSize: FontSize.Medium,
    fontWeight: FontWeight.Bold,
  },
});
