import { StyleSheet, View } from 'react-native';
import { Typography } from 'components/common';
import { FontSize, FontWeight } from 'types/fontTypes';
import { COLORS } from 'utils/index';

type Props = {
  label: string;
  color?: string;
};

export const MotivaultStatusBadge = ({ label, color = COLORS.STATUS_GREEN }: Props) => {
  return (
    <View style={[styles.badge, { borderColor: color }]}>
      <Typography translate={false} style={[styles.text, { color }]}>
        {label}
      </Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: FontSize.ExtraSmall,
    fontWeight: FontWeight.Medium,
  },
});
