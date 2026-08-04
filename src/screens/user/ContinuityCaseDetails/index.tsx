import { StyleSheet, View } from 'react-native';
import { Icon, RowComponent, Typography, Wrapper } from 'components/index';
import {
  MotivaultInfoRow,
  MotivaultLabelValue,
  MotivaultScreenBackground,
  MotivaultStatusBadge,
  MotivaultTimeline,
} from 'components/appComponents/motivault';
import { VARIABLES } from 'constants/common';
import { useRoute } from '@react-navigation/native';
import { FontSize, FontWeight } from 'types/fontTypes';
import { COLORS, STYLES } from 'utils/index';

const CASE_TIMELINE = [
  { date: 'Jul 28, 2026', description: 'Case submitted for review' },
  { date: 'Jul 27, 2026', description: 'Supporting documents uploaded' },
  { date: 'Jul 26, 2026', description: 'Part photos and serial numbers recorded' },
  { date: 'Jul 25, 2026', description: 'Continuity case initiated' },
];

export const ContinuityCaseDetails = () => {
  const route = useRoute<any>();
  const title = route.params?.title ?? 'Engine Block Verification';
  const vehicle = route.params?.vehicle ?? '1967 Ford Mustang';
  const status = route.params?.status ?? 'In Review';
  const statusColor = route.params?.statusColor ?? COLORS.STATUS_YELLOW;
  const date = route.params?.date ?? 'Jul 28, 2026';
  const description =
    route.params?.description ??
    'Verifying matching numbers for 351 Windsor engine block. All documentation has been submitted and is awaiting expert review.';

  return (
    <MotivaultScreenBackground>
      <Wrapper
        headerTitle='Case Details'
        useScrollView
        safeAreaEdges={['top', 'bottom']}
        backgroundColor={COLORS.TRANSPARENT}
      >
        <View style={[STYLES.CONTAINER, styles.content]}>
          <View style={styles.headerCard}>
            <RowComponent style={styles.headerRow}>
              <Typography translate={false} style={styles.title}>
                {title}
              </Typography>
              <MotivaultStatusBadge label={status} color={statusColor} />
            </RowComponent>
            <Typography translate={false} style={styles.vehicle}>
              {vehicle}
            </Typography>
            <Typography translate={false} style={styles.date}>
              {`Submitted ${date}`}
            </Typography>
          </View>

          <View style={styles.summaryCard}>
            <MotivaultLabelValue label='Case ID' value={route.params?.caseId ?? 'case-1'} />
            <MotivaultLabelValue label='Part' value='351 Windsor Engine Block' />
            <MotivaultLabelValue label='Serial Number' value='WB-1967-0042' />
          </View>

          <Typography translate={false} style={styles.sectionTitle}>
            Description
          </Typography>
          <View style={styles.descriptionCard}>
            <Typography translate={false} style={styles.description}>
              {description}
            </Typography>
          </View>

          <Typography translate={false} style={styles.sectionTitle}>
            Case Information
          </Typography>
          <MotivaultInfoRow label='Assigned Reviewer' value='Motivault Expert Team' />
          <MotivaultInfoRow label='Priority' value='Standard' />
          <MotivaultInfoRow label='Estimated Completion' value='Aug 5, 2026' />
          <MotivaultInfoRow label='Documents Attached' value='4 files' />

          <Typography translate={false} style={styles.sectionTitle}>
            Attached Documents
          </Typography>
          {['Verification Form', 'Serial Number Photos', 'Purchase Receipt', 'Appraisal Report'].map(
            doc => (
              <View key={doc} style={styles.docRow}>
                <RowComponent>
                  <Icon
                    componentName={VARIABLES.Ionicons}
                    iconName='document-outline'
                    size={20}
                    color={COLORS.ACCENT_GREEN}
                  />
                  <Typography translate={false} style={styles.docName}>
                    {doc}
                  </Typography>
                  <Icon
                    componentName={VARIABLES.Ionicons}
                    iconName='download-outline'
                    size={18}
                    color={COLORS.TEXT_SECONDARY}
                  />
                </RowComponent>
              </View>
            ),
          )}

          <Typography translate={false} style={styles.sectionTitle}>
            Case Timeline
          </Typography>
          <View style={styles.timelineCard}>
            <MotivaultTimeline items={CASE_TIMELINE} />
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
  headerCard: {
    backgroundColor: COLORS.CARD_DARK,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  headerRow: {
    alignItems: 'flex-start',
    marginBottom: 8,
    gap: 12,
  },
  title: {
    color: COLORS.WHITE,
    fontSize: FontSize.Large,
    fontWeight: FontWeight.Bold,
    flex: 1,
  },
  vehicle: {
    color: COLORS.ACCENT_GREEN,
    fontSize: FontSize.Medium,
    fontWeight: FontWeight.Medium,
    marginBottom: 4,
  },
  date: {
    color: COLORS.TEXT_SECONDARY,
    fontSize: FontSize.Small,
  },
  summaryCard: {
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
  descriptionCard: {
    backgroundColor: COLORS.CARD_DARK,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  description: {
    color: COLORS.TEXT_SECONDARY,
    fontSize: FontSize.MediumSmall,
    lineHeight: 22,
  },
  docRow: {
    backgroundColor: COLORS.CARD_DARK,
    borderRadius: 12,
    padding: 14,
    marginBottom: 8,
  },
  docName: {
    color: COLORS.WHITE,
    fontSize: FontSize.Medium,
    flex: 1,
    marginLeft: 10,
  },
  timelineCard: {
    backgroundColor: COLORS.CARD_DARK,
    borderRadius: 16,
    padding: 16,
  },
});
