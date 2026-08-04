import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Icon, RowComponent, Typography, Wrapper } from 'components/index';
import {
  MotivaultScreenBackground,
  MotivaultStatusBadge,
} from 'components/appComponents/motivault';
import { VARIABLES } from 'constants/common';
import { SCREENS } from 'constants/routes';
import { navigate } from 'navigation/index';
import { FontSize, FontWeight } from 'types/fontTypes';
import { COLORS, STYLES } from 'utils/index';

const CASES = [
  {
    id: 'MV-2024-00042',
    part: 'Performance Battery',
    statusText: 'Submitted - Awaiting Review',
    badge: 'Under Motivault Review',
    statusColor: COLORS.STATUS_PURPLE,
    date: '11/25/16',
  },
  {
    id: 'MV-2024-00043',
    part: 'Brake System Kit',
    statusText: 'Approved',
    badge: 'Verified by Motivault',
    statusColor: COLORS.STATUS_GREEN,
    date: '11/25/16',
  },
  {
    id: 'MV-2024-00044',
    part: 'Exhaust System',
    statusText: 'Declined',
    badge: 'Declined',
    statusColor: COLORS.STATUS_RED,
    date: '11/25/16',
  },
];

export const ContinuityCases = () => {
  return (
    <MotivaultScreenBackground>
      <Wrapper
        showBackButton={false}
        useScrollView
        safeAreaEdges={['top', 'bottom']}
        backgroundColor={COLORS.TRANSPARENT}
        wantPaddingBottom={false}
      >
        <View style={[STYLES.CONTAINER, styles.content]}>
          <RowComponent style={styles.header}>
            <View style={styles.titleWrap}>
              <Typography translate={false} style={styles.titleTop}>
                Warranty
              </Typography>
              <Typography translate={false} style={styles.titleBottom}>
                Continuity Cases
              </Typography>
            </View>
            <TouchableOpacity
              onPress={() => navigate(SCREENS.INITIATE_CONTINUITY)}
              hitSlop={10}
            >
              <Icon
                componentName={VARIABLES.Ionicons}
                iconName='add'
                size={28}
                color={COLORS.STATUS_GREEN}
              />
            </TouchableOpacity>
          </RowComponent>

          {CASES.map(item => (
            <TouchableOpacity
              key={item.id}
              style={styles.card}
              activeOpacity={0.85}
              onPress={() =>
                navigate(SCREENS.CONTINUITY_CASE_DETAILS, {
                  caseId: item.id,
                  title: item.part,
                  vehicle: '2026 Maserati Ghibli',
                  status: item.statusText,
                  statusColor: item.statusColor,
                  date: item.date,
                  description: item.badge,
                })
              }
            >
              <RowComponent style={styles.cardHeader}>
                <View style={styles.cardLeft}>
                  <Typography translate={false} style={styles.caseId}>
                    {item.id}
                  </Typography>
                  <Typography translate={false} style={styles.part}>
                    {item.part}
                  </Typography>
                  <Typography translate={false} style={styles.statusText}>
                    {item.statusText}
                  </Typography>
                  <Typography translate={false} style={styles.date}>
                    {`Date: ${item.date}`}
                  </Typography>
                </View>
                <MotivaultStatusBadge label={item.badge} color={item.statusColor} />
              </RowComponent>
              <Typography
                translate={false}
                style={styles.timelineLink}
                onPress={() =>
                  navigate(SCREENS.OWNERSHIP_TIMELINE, {
                    vehicleName: 'Performance Battery',
                  })
                }
              >
                Ownership Timeline
              </Typography>
            </TouchableOpacity>
          ))}
        </View>
      </Wrapper>
    </MotivaultScreenBackground>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingTop: 8,
    paddingBottom: 24,
  },
  header: {
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  titleWrap: {
    flex: 1,
  },
  titleTop: {
    color: COLORS.WHITE,
    fontSize: FontSize.Large,
  },
  titleBottom: {
    color: COLORS.WHITE,
    fontSize: FontSize.Large,
    fontWeight: FontWeight.Bold,
  },
  card: {
    backgroundColor: COLORS.CARD_DARK,
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
  },
  cardHeader: {
    alignItems: 'flex-start',
  },
  cardLeft: {
    flex: 1,
    paddingRight: 10,
  },
  caseId: {
    color: COLORS.WHITE,
    fontSize: FontSize.Medium,
    fontWeight: FontWeight.Bold,
  },
  part: {
    color: COLORS.TEXT_SECONDARY,
    marginTop: 4,
  },
  statusText: {
    color: COLORS.TEXT_SECONDARY,
    fontSize: FontSize.Small,
    marginTop: 2,
  },
  date: {
    color: COLORS.TEXT_SECONDARY,
    fontSize: FontSize.Small,
    marginTop: 8,
  },
  timelineLink: {
    color: COLORS.TEXT_SECONDARY,
    textDecorationLine: 'underline',
    textAlign: 'right',
    marginTop: 10,
    fontSize: FontSize.Small,
  },
});
