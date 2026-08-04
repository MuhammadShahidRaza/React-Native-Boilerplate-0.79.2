import { StyleSheet, View } from 'react-native';
import { Icon, Photo, RowComponent, Typography, Wrapper } from 'components/index';
import {
  MotivaultInfoRow,
  MotivaultLabelValue,
  MotivaultScreenBackground,
  MotivaultStatusBadge,
  MotivaultTimeline,
} from 'components/appComponents/motivault';
import { IMAGES } from 'constants/assets';
import { VARIABLES } from 'constants/common';
import { useRoute } from '@react-navigation/native';
import { FontSize, FontWeight } from 'types/fontTypes';
import { COLORS, STYLES } from 'utils/index';

const TIMELINE = [
  { date: 'Jul 28, 2026', description: 'Continuity verification submitted' },
  { date: 'Jun 15, 2026', description: 'Part registered to 1967 Ford Mustang' },
  { date: 'Mar 12, 2024', description: 'Initial documentation uploaded' },
  { date: 'Jan 08, 2020', description: 'Part acquired from restoration shop' },
];

const DOCUMENTS = [
  { name: 'Verification Certificate', date: 'Jul 28, 2026' },
  { name: 'Matching Numbers Report', date: 'Jun 15, 2026' },
  { name: 'Purchase Receipt', date: 'Jan 08, 2020' },
];

export const PartDetails = () => {
  const route = useRoute<any>();
  const name = route.params?.name ?? '351 Windsor Engine Block';
  const serial = route.params?.serial ?? 'WB-1967-0042';
  const verified = route.params?.verified ?? true;

  return (
    <MotivaultScreenBackground>
      <Wrapper
        headerTitle='Part Details'
        useScrollView
        safeAreaEdges={['top', 'bottom']}
        backgroundColor={COLORS.TRANSPARENT}
      >
        <View style={[STYLES.CONTAINER, styles.content]}>
          <View style={styles.verifiedCard}>
            <Photo source={IMAGES.SUCCESS_CHECK} size={56} imageStyle={styles.checkIcon} />
            <Typography translate={false} style={styles.verifiedTitle}>
              {verified ? 'Verified Part' : 'Pending Verification'}
            </Typography>
            <MotivaultStatusBadge
              label={verified ? 'Continuity Verified' : 'Awaiting Review'}
              color={verified ? COLORS.STATUS_GREEN : COLORS.STATUS_YELLOW}
            />
          </View>

          <View style={styles.detailCard}>
            <MotivaultLabelValue label='Part Name' value={name} />
            <MotivaultLabelValue label='Serial Number' value={serial} />
            <MotivaultLabelValue label='Vehicle' value='1967 Ford Mustang' />
            <MotivaultLabelValue label='Category' value='Engine / Powertrain' />
          </View>

          <Typography translate={false} style={styles.sectionTitle}>
            Part Information
          </Typography>
          <MotivaultInfoRow label='Manufacturer' value='Ford Motor Company' />
          <MotivaultInfoRow label='Production Year' value='1967' />
          <MotivaultInfoRow label='Casting Number' value='C5AE-6015-E' />
          <MotivaultInfoRow
            label='Verification Status'
            value={verified ? 'Verified' : 'Pending'}
            valueColor={verified ? COLORS.STATUS_GREEN : COLORS.STATUS_YELLOW}
          />

          <Typography translate={false} style={styles.sectionTitle}>
            Documents
          </Typography>
          {DOCUMENTS.map(doc => (
            <View key={doc.name} style={styles.docCard}>
              <RowComponent>
                <Icon
                  componentName={VARIABLES.Ionicons}
                  iconName='document-attach-outline'
                  size={22}
                  color={COLORS.ACCENT_GREEN}
                />
                <View style={styles.docBody}>
                  <Typography translate={false} style={styles.docName}>
                    {doc.name}
                  </Typography>
                  <Typography translate={false} style={styles.docDate}>
                    {doc.date}
                  </Typography>
                </View>
                <Icon
                  componentName={VARIABLES.Ionicons}
                  iconName='download-outline'
                  size={20}
                  color={COLORS.TEXT_SECONDARY}
                />
              </RowComponent>
            </View>
          ))}

          <Typography translate={false} style={styles.sectionTitle}>
            Ownership Timeline
          </Typography>
          <View style={styles.timelineCard}>
            <MotivaultTimeline items={TIMELINE} />
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
  verifiedCard: {
    backgroundColor: COLORS.CARD_DARK,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
    gap: 10,
  },
  checkIcon: {
    width: 56,
    height: 56,
  },
  verifiedTitle: {
    color: COLORS.WHITE,
    fontSize: FontSize.Large,
    fontWeight: FontWeight.Bold,
  },
  detailCard: {
    backgroundColor: COLORS.CARD_DARK,
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    color: COLORS.WHITE,
    fontSize: FontSize.Large,
    fontWeight: FontWeight.Bold,
    marginBottom: 12,
    marginTop: 8,
  },
  docCard: {
    backgroundColor: COLORS.CARD_DARK,
    borderRadius: 12,
    padding: 14,
    marginBottom: 8,
  },
  docBody: {
    flex: 1,
    marginLeft: 12,
  },
  docName: {
    color: COLORS.WHITE,
    fontSize: FontSize.Medium,
    fontWeight: FontWeight.Medium,
  },
  docDate: {
    color: COLORS.TEXT_SECONDARY,
    fontSize: FontSize.Small,
    marginTop: 2,
  },
  timelineCard: {
    backgroundColor: COLORS.CARD_DARK,
    borderRadius: 16,
    padding: 16,
  },
});
