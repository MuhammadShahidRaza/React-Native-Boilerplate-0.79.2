import { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Icon, Photo, RowComponent, Typography, Wrapper } from 'components/index';
import {
  MotivaultInfoRow,
  MotivaultScreenBackground,
  MotivaultStatusBadge,
} from 'components/appComponents/motivault';
import { IMAGES } from 'constants/assets';
import { VARIABLES } from 'constants/common';
import { SCREENS } from 'constants/routes';
import { navigate } from 'navigation/index';
import { useRoute } from '@react-navigation/native';
import { FontSize, FontWeight } from 'types/fontTypes';
import { COLORS, STYLES } from 'utils/index';

type TabKey = 'overview' | 'parts' | 'documents';

const TABS: { key: TabKey; label: string }[] = [
  { key: 'overview', label: 'Overview' },
  { key: 'parts', label: 'Parts' },
  { key: 'documents', label: 'Documents' },
];

const PARTS = [
  { id: 'part-1', name: 'Performance Battery', serial: 'Installed: May 10, 2023', verified: true, status: 'Verified by Motivault' },
  { id: 'part-2', name: 'Brake System Kit', serial: 'Installed: May 10, 2023', verified: true, status: 'Pending Verification' },
  { id: 'part-3', name: 'Exhaust System', serial: 'Installed: May 10, 2023', verified: true, status: 'Verification Required' },
  { id: 'part-4', name: 'Tires (Set of 4)', serial: 'Installed: May 10, 2023', verified: false, status: 'Expired' },
];

const DOCUMENTS = [
  { id: 'doc-1', name: 'Title Certificate', date: 'Mar 12, 2024' },
  { id: 'doc-2', name: 'Restoration Invoice', date: 'Jan 05, 2025' },
  { id: 'doc-3', name: 'Appraisal Report', date: 'Jun 18, 2026' },
];

export const VehicleDetails = () => {
  const route = useRoute<any>();
  const name = route.params?.name ?? '2026 Maserati Ghibli';
  const vin = route.params?.vin ?? 'ZAMSTYSABOCOXT1';
  const miles = route.params?.miles ?? '16,400';
  const [activeTab, setActiveTab] = useState<TabKey>('overview');

  return (
    <MotivaultScreenBackground>
      <Wrapper
        headerTitle='Vehicle Details'
        useScrollView
        safeAreaEdges={['top', 'bottom']}
        backgroundColor={COLORS.TRANSPARENT}
      >
        <View style={[STYLES.CONTAINER, styles.content]}>
          <Photo source={IMAGES.CAR_ONE} imageStyle={styles.heroImage} borderRadius={16} />

          <Typography translate={false} style={styles.title}>
            {name}
          </Typography>
          <Typography translate={false} style={styles.subtitle}>
            {`VIN ${vin}`}
          </Typography>
          <Typography translate={false} style={styles.miles}>
            {`${miles} miles`}
          </Typography>

          <View style={styles.tabs}>
            {TABS.map(tab => {
              const isActive = activeTab === tab.key;
              return (
                <TouchableOpacity
                  key={tab.key}
                  style={[styles.tab, isActive && styles.tabActive]}
                  onPress={() => setActiveTab(tab.key)}
                >
                  <Typography
                    translate={false}
                    style={[styles.tabText, isActive && styles.tabTextActive]}
                  >
                    {tab.label}
                  </Typography>
                </TouchableOpacity>
              );
            })}
          </View>

          {activeTab === 'overview' && (
            <View>
              <View style={styles.overviewCard}>
                <Typography translate={false} style={styles.sectionLabel}>
                  Vehicle Info
                </Typography>
                <MotivaultInfoRow label='Year' value='2026' />
                <MotivaultInfoRow label='Make' value='Maserati' />
                <MotivaultInfoRow label='Model' value='Ghibli' />
                <MotivaultInfoRow label='Vehicle Verification Status' value='Verified' />
                <MotivaultInfoRow label='Last Updated' value='5/10/2030' />
                <MotivaultInfoRow label='Total Verified Parts' value='Battery' />
                <MotivaultInfoRow label='Total Warranty Value' value='$4,000' />
                <MotivaultInfoRow label='Total Active Warranties' value='4' />
              </View>
              <View style={styles.overviewCard}>
                <Typography translate={false} style={styles.sectionLabel}>
                  Warranty Health
                </Typography>
                <MotivaultInfoRow label='Verified Warranties' value='6' />
                <MotivaultInfoRow label='Expiring Soon' value='2' />
                <MotivaultInfoRow label='Lifetime Warranty' value='1' />
                <MotivaultInfoRow label='Last Verification' value='May 10, 2023' />
                <MotivaultInfoRow label='Continuity Score' value='36%' />
              </View>
              <TouchableOpacity
                style={styles.timelineLink}
                onPress={() => navigate(SCREENS.OWNERSHIP_TIMELINE, { vehicleName: name })}
              >
                <Typography translate={false} style={[styles.timelineText, { marginLeft: 0, textAlign: 'center' }]}>
                  View Continuity History
                </Typography>
              </TouchableOpacity>
            </View>
          )}

          {activeTab === 'parts' && (
            <>
              <Typography
                translate={false}
                style={styles.uploadLink}
                onPress={() => navigate(SCREENS.ADD_PARTS)}
              >
                + Upload
              </Typography>
              {PARTS.map(part => (
                <TouchableOpacity
                  key={part.id}
                  style={styles.listCard}
                  activeOpacity={0.85}
                  onPress={() =>
                    navigate(SCREENS.PART_DETAILS, {
                      partId: part.id,
                      name: part.name,
                      serial: part.serial,
                      verified: part.verified,
                    })
                  }
                >
                  <RowComponent>
                    <View style={styles.listBody}>
                      <Typography translate={false} style={styles.listTitle}>
                        {part.name}
                      </Typography>
                      <Typography translate={false} style={styles.listMeta}>
                        {part.serial}
                      </Typography>
                      <Typography translate={false} style={styles.listMeta}>
                        {`• ${part.status}`}
                      </Typography>
                    </View>
                    <MotivaultStatusBadge
                      label={part.verified ? 'Verified' : 'Pending'}
                      color={part.verified ? COLORS.STATUS_GREEN : COLORS.STATUS_YELLOW}
                    />
                  </RowComponent>
                </TouchableOpacity>
              ))}
            </>
          )}

          {activeTab === 'documents' && (
            <>
              <Typography
                translate={false}
                style={styles.uploadLink}
                onPress={() => navigate(SCREENS.ADD_PARTS)}
              >
                + Upload
              </Typography>
              {DOCUMENTS.map(doc => (
                <View key={doc.id} style={styles.listCard}>
                  <RowComponent>
                    <Icon
                      componentName={VARIABLES.Ionicons}
                      iconName='document-text-outline'
                      size={22}
                      color={COLORS.WHITE}
                    />
                    <View style={[styles.listBody, styles.docBody]}>
                      <Typography translate={false} style={styles.listTitle}>
                        {doc.name}
                      </Typography>
                      <Typography translate={false} style={styles.listMeta}>
                        {doc.date}
                      </Typography>
                    </View>
                    <MotivaultStatusBadge label='Verified' />
                  </RowComponent>
                </View>
              ))}
            </>
          )}
        </View>
      </Wrapper>
    </MotivaultScreenBackground>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingBottom: 24,
  },
  heroImage: {
    width: '100%',
    height: 180,
    marginBottom: 16,
  },
  title: {
    color: COLORS.WHITE,
    fontSize: FontSize.ExtraLarge,
    fontWeight: FontWeight.Bold,
  },
  subtitle: {
    color: COLORS.TEXT_SECONDARY,
    fontSize: FontSize.Small,
    marginTop: 4,
  },
  miles: {
    color: COLORS.STATUS_GREEN,
    fontSize: FontSize.Medium,
    marginTop: 6,
    marginBottom: 20,
    fontWeight: FontWeight.Medium,
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: COLORS.CARD_DARK,
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  tabActive: {
    backgroundColor: COLORS.ACCENT_GREEN,
  },
  tabText: {
    color: COLORS.TEXT_SECONDARY,
    fontSize: FontSize.Small,
    fontWeight: FontWeight.Medium,
  },
  tabTextActive: {
    color: COLORS.WHITE,
    fontWeight: FontWeight.Bold,
  },
  overviewCard: {
    backgroundColor: COLORS.CARD_DARK,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  sectionLabel: {
    color: COLORS.WHITE,
    fontSize: FontSize.Medium,
    fontWeight: FontWeight.Bold,
    marginBottom: 10,
  },
  uploadLink: {
    color: COLORS.STATUS_GREEN,
    textAlign: 'right',
    marginBottom: 10,
    fontWeight: FontWeight.SemiBold,
  },
  timelineLink: {
    backgroundColor: COLORS.TRANSPARENT,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: COLORS.WHITE,
    borderStyle: 'dashed',
    padding: 16,
    marginBottom: 16,
    marginTop: 8,
  },
  timelineText: {
    color: COLORS.WHITE,
    fontSize: FontSize.Medium,
    fontWeight: FontWeight.Medium,
    flex: 1,
    marginLeft: 10,
  },
  listCard: {
    backgroundColor: COLORS.CARD_DARK,
    borderRadius: 16,
    padding: 16,
    marginBottom: 10,
  },
  listBody: {
    flex: 1,
    paddingRight: 8,
  },
  docBody: {
    marginLeft: 12,
  },
  listTitle: {
    color: COLORS.WHITE,
    fontSize: FontSize.Medium,
    fontWeight: FontWeight.SemiBold,
  },
  listMeta: {
    color: COLORS.TEXT_SECONDARY,
    fontSize: FontSize.Small,
    marginTop: 4,
  },
});
