import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Icon, Photo, RowComponent, Typography, Wrapper } from 'components/index';
import { MotivaultScreenBackground } from 'components/appComponents/motivault';
import { IMAGES } from 'constants/assets';
import { VARIABLES } from 'constants/common';
import { SCREENS } from 'constants/routes';
import { navigate } from 'navigation/index';
import { FontSize, FontWeight } from 'types/fontTypes';
import { COLORS, STYLES } from 'utils/index';

const STATS = [
  { label: 'Registered Vehicles', value: '3', icon: 'car-sport-outline' as const },
  { label: 'Registered Parts', value: '9', icon: 'construct-outline' as const },
  { label: 'Warranty Documents', value: '14', icon: 'document-text-outline' as const },
  { label: 'Active Continuity Cases', value: '2', icon: 'shield-checkmark-outline' as const },
];

const RECENT_ACTIVITY = [
  {
    id: 'MV-2024-00042',
    subtitle: 'Submitted to Motivault',
    time: '2h ago',
  },
  {
    id: 'MV-2024-00041',
    subtitle: 'Submitted to Motivault',
    time: '2h ago',
  },
];

export const Home = () => {
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
            <View style={styles.profileRow}>
              <Photo source={IMAGES.USER} size={48} borderRadius={24} />
              <View style={styles.welcomeText}>
                <Typography translate={false} style={styles.greeting}>
                  Welcome back,
                </Typography>
                <Typography translate={false} style={styles.name}>
                  Alex Morgan
                </Typography>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => navigate(SCREENS.NOTIFICATIONS)}
              style={styles.bellButton}
              hitSlop={12}
            >
              <Icon
                componentName={VARIABLES.Ionicons}
                iconName='notifications-outline'
                size={22}
                color={COLORS.WHITE}
              />
              <View style={styles.badge} />
            </TouchableOpacity>
          </RowComponent>

          {STATS.map(stat => (
            <View key={stat.label} style={styles.statCard}>
              <View style={styles.statIcon}>
                <Icon
                  componentName={VARIABLES.Ionicons}
                  iconName={stat.icon}
                  size={22}
                  color={COLORS.WHITE}
                />
              </View>
              <View>
                <Typography translate={false} style={styles.statValue}>
                  {stat.value}
                </Typography>
                <Typography translate={false} style={styles.statLabel}>
                  {stat.label}
                </Typography>
              </View>
            </View>
          ))}

          <Typography translate={false} style={styles.sectionTitle}>
            Recent Activity
          </Typography>

          {RECENT_ACTIVITY.map(item => (
            <TouchableOpacity
              key={item.id}
              style={styles.activityCard}
              activeOpacity={0.85}
              onPress={() =>
                navigate(SCREENS.CONTINUITY_CASE_DETAILS, {
                  caseId: item.id,
                  title: 'Performance Battery',
                  status: item.subtitle,
                  date: item.time,
                })
              }
            >
              <View style={styles.activityIcon}>
                <Icon
                  componentName={VARIABLES.Ionicons}
                  iconName='sparkles'
                  size={18}
                  color={COLORS.STATUS_GREEN}
                />
              </View>
              <View style={styles.activityText}>
                <Typography translate={false} style={styles.activityId}>
                  {item.id}
                </Typography>
                <Typography translate={false} style={styles.activitySub}>
                  {item.subtitle}
                </Typography>
              </View>
              <Typography translate={false} style={styles.activityTime}>
                {item.time}
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
    paddingBottom: 28,
  },
  header: {
    marginBottom: 20,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  welcomeText: {
    flex: 1,
  },
  greeting: {
    color: COLORS.TEXT_SECONDARY,
    fontSize: FontSize.Small,
  },
  name: {
    color: COLORS.WHITE,
    fontSize: FontSize.Large,
    fontWeight: FontWeight.Bold,
  },
  bellButton: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: COLORS.CARD_DARK,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.STATUS_RED,
  },
  statCard: {
    backgroundColor: COLORS.CARD_DARK,
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#121214',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statValue: {
    color: COLORS.WHITE,
    fontSize: FontSize.ExtraLarge,
    fontWeight: FontWeight.Bold,
  },
  statLabel: {
    color: COLORS.WHITE,
    fontSize: FontSize.Small,
    marginTop: 2,
  },
  sectionTitle: {
    color: COLORS.WHITE,
    fontSize: FontSize.Large,
    fontWeight: FontWeight.Bold,
    marginTop: 12,
    marginBottom: 12,
  },
  activityCard: {
    backgroundColor: COLORS.CARD_DARK,
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  activityText: {
    flex: 1,
  },
  activityId: {
    color: COLORS.WHITE,
    fontWeight: FontWeight.Bold,
  },
  activitySub: {
    color: '#7EB8FF',
    fontSize: FontSize.Small,
    marginTop: 2,
  },
  activityTime: {
    color: COLORS.TEXT_SECONDARY,
    fontSize: FontSize.Small,
  },
});
