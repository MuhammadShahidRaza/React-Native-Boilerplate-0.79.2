import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Typography } from 'components/common';
import { FontSize, FontWeight } from 'types/fontTypes';
import { COLORS } from 'utils/index';

type Props = {
  title: string;
  onPress?: () => void;
  loading?: boolean;
  disabled?: boolean;
  variant?: 'silver' | 'green';
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

export const MotivaultGradientButton = ({
  title,
  onPress,
  loading,
  disabled,
  variant = 'silver',
  style,
  textStyle,
}: Props) => {
  const colors =
    variant === 'green'
      ? [COLORS.ACCENT_GREEN, COLORS.ACCENT_GREEN]
      : [COLORS.SILVER_LIGHT, COLORS.SILVER_DARK];

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      disabled={disabled || loading}
      style={[styles.touch, style]}
    >
      <LinearGradient
        colors={colors}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={[styles.btn, (disabled || loading) && styles.disabled]}
      >
        {loading ? (
          <ActivityIndicator color={variant === 'green' ? COLORS.WHITE : COLORS.BLACK} />
        ) : (
          <Typography
            translate={false}
            style={[
              styles.text,
              variant === 'green' ? styles.greenText : styles.silverText,
              textStyle,
            ]}
          >
            {title}
          </Typography>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touch: {
    width: '100%',
  },
  btn: {
    borderRadius: 50,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabled: {
    opacity: 0.55,
  },
  text: {
    fontSize: FontSize.MediumLarge,
    fontWeight: FontWeight.Bold,
    textAlign: 'center',
  },
  silverText: {
    color: '#2A2A2A',
  },
  greenText: {
    color: COLORS.WHITE,
  },
});
