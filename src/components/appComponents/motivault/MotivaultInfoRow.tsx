import { StyleSheet, View } from 'react-native';
import { Typography } from 'components/common';
import { FontSize, FontWeight } from 'types/fontTypes';
import { COLORS } from 'utils/index';

type Props = {
  label: string;
  value: string;
  valueColor?: string;
};

export const MotivaultInfoRow = ({ label, value, valueColor = COLORS.WHITE }: Props) => {
  return (
    <View style={styles.row}>
      <Typography translate={false} style={styles.label}>
        {label}
      </Typography>
      <Typography translate={false} style={[styles.value, { color: valueColor }]}>
        {value}
      </Typography>
    </View>
  );
};

type StackProps = {
  label: string;
  value: string;
};

export const MotivaultLabelValue = ({ label, value }: StackProps) => {
  return (
    <View style={styles.stack}>
      <Typography translate={false} style={styles.stackLabel}>
        {label}
      </Typography>
      <Typography translate={false} style={styles.stackValue}>
        {value}
      </Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.CARD_DARK,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 8,
  },
  label: {
    color: COLORS.TEXT_SECONDARY,
    fontSize: FontSize.Small,
    flex: 1,
    paddingRight: 12,
  },
  value: {
    fontSize: FontSize.Small,
    fontWeight: FontWeight.Medium,
    textAlign: 'right',
    flexShrink: 1,
  },
  stack: {
    marginBottom: 16,
  },
  stackLabel: {
    color: COLORS.TEXT_SECONDARY,
    fontSize: FontSize.Small,
    marginBottom: 4,
  },
  stackValue: {
    color: COLORS.WHITE,
    fontSize: FontSize.Medium,
    fontWeight: FontWeight.Bold,
  },
});
