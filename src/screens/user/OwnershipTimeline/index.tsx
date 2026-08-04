import { StyleSheet, View } from 'react-native';
import { Typography, Wrapper } from 'components/index';
import {
  MotivaultLabelValue,
  MotivaultScreenBackground,
  MotivaultTimeline,
} from 'components/appComponents/motivault';
import { useRoute } from '@react-navigation/native';
import { FontSize, FontWeight } from 'types/fontTypes';
import { COLORS, STYLES } from 'utils/index';

const FULL_TIMELINE = [
  { date: 'Jul 2026', description: 'Alex Morgan — Current owner, continuity verified' },
  { date: 'Mar 2024', description: 'Heritage Motors LLC — Dealer transfer with full documentation' },
  { date: 'Sep 2019', description: 'Restoration completed by Classic Auto Works' },
  { date: 'Jun 2015', description: 'James Patterson — Private sale, barn find restoration project' },
  { date: 'Aug 1998', description: 'Robert & Linda Hayes — Long-term ownership, 23 years' },
  { date: 'Apr 1972', description: 'Original owner — First registration in California' },
];

export const OwnershipTimeline = () => {
  const route = useRoute<any>();
  const vehicleName = route.params?.vehicleName ?? '1967 Ford Mustang';

  return (
    <MotivaultScreenBackground>
      <Wrapper
        headerTitle='Ownership Timeline'
        useScrollView
        safeAreaEdges={['top', 'bottom']}
        backgroundColor={COLORS.TRANSPARENT}
      >
        <View style={[STYLES.CONTAINER, styles.content]}>
          <View style={styles.summaryCard}>
            <MotivaultLabelValue label='Vehicle' value={vehicleName} />
            <MotivaultLabelValue label='Total Owners' value='5' />
            <MotivaultLabelValue label='Chain of Title' value='Complete' />
          </View>

          <Typography translate={false} style={styles.sectionTitle}>
            Full History
          </Typography>

          <View style={styles.timelineCard}>
            <MotivaultTimeline items={FULL_TIMELINE} />
          </View>
        </View>
      </Wrapper>
    </MotivaultScreenBackground>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingBottom: 24,
  },
  summaryCard: {
    backgroundColor: COLORS.CARD_DARK,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    color: COLORS.WHITE,
    fontSize: FontSize.Large,
    fontWeight: FontWeight.Bold,
    marginBottom: 14,
  },
  timelineCard: {
    backgroundColor: COLORS.CARD_DARK,
    borderRadius: 16,
    padding: 16,
  },
});
