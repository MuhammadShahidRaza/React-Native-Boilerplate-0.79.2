import { StyleSheet, View } from 'react-native';
import { Icon, Typography } from 'components/common';
import { VARIABLES } from 'constants/common';
import { FontSize, FontWeight } from 'types/fontTypes';
import { COLORS } from 'utils/index';

export type TimelineItemData = {
  date: string;
  description: string;
};

type Props = {
  items: TimelineItemData[];
};

export const MotivaultTimeline = ({ items }: Props) => {
  return (
    <View style={styles.container}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <View key={`${item.date}-${index}`} style={styles.row}>
            <View style={styles.left}>
              <View style={styles.dot}>
                <Icon
                  componentName={VARIABLES.Ionicons}
                  iconName='checkmark'
                  size={12}
                  color={COLORS.WHITE}
                />
              </View>
              {!isLast && <View style={styles.line} />}
            </View>
            <View style={styles.content}>
              <Typography translate={false} style={styles.date}>
                {item.date}
              </Typography>
              <Typography translate={false} style={styles.desc}>
                {item.description}
              </Typography>
            </View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
  },
  row: {
    flexDirection: 'row',
    minHeight: 64,
  },
  left: {
    width: 28,
    alignItems: 'center',
  },
  dot: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: COLORS.ACCENT_GREEN,
    alignItems: 'center',
    justifyContent: 'center',
  },
  line: {
    flex: 1,
    width: 2,
    backgroundColor: COLORS.ACCENT_GREEN,
    marginVertical: 2,
  },
  content: {
    flex: 1,
    paddingLeft: 12,
    paddingBottom: 18,
  },
  date: {
    color: COLORS.WHITE,
    fontSize: FontSize.Medium,
    fontWeight: FontWeight.Bold,
  },
  desc: {
    color: COLORS.TEXT_SECONDARY,
    fontSize: FontSize.Small,
    marginTop: 2,
  },
});
