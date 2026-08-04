import { StyleSheet, View } from 'react-native';
import { Icon, RowComponent, Typography, Wrapper } from 'components/common';
import { MotivaultScreenBackground } from 'components/appComponents/motivault';
import { VARIABLES } from 'constants/index';
import { navigate } from 'navigation/index';
import { SCREENS } from 'constants/routes';
import { FontSize, FontWeight } from 'types/fontTypes';
import { COLORS } from 'utils/index';

type NotificationItem = {
  id: string;
  title: string;
  body: string;
  time: string;
  icon: string;
  read: boolean;
};

const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: '1',
    title: 'Warranty Expiring Soon',
    body: 'Brake pads warranty for your 2021 Porsche 911 expires in 14 days.',
    time: '2h ago',
    icon: 'alert-circle-outline',
    read: false,
  },
  {
    id: '2',
    title: 'Continuity Case Updated',
    body: 'Your ownership continuity request #CC-1042 moved to Under Review.',
    time: 'Yesterday',
    icon: 'git-branch-outline',
    read: false,
  },
  {
    id: '3',
    title: 'Part Verified',
    body: 'Turbocharger assembly has been verified and added to your vault.',
    time: 'Mar 12',
    icon: 'checkmark-circle-outline',
    read: true,
  },
  {
    id: '4',
    title: 'New Document Uploaded',
    body: 'Service record for 2021 Porsche 911 was successfully uploaded.',
    time: 'Mar 10',
    icon: 'document-text-outline',
    read: true,
  },
];

export const NotificationListing = () => {
  return (
    <MotivaultScreenBackground>
      <Wrapper headerTitle='Notifications' backgroundColor={COLORS.BLACK} useScrollView>
        <View style={styles.container}>
          {MOCK_NOTIFICATIONS.map(item => (
            <RowComponent
              key={item.id}
              style={[styles.card, !item.read && styles.unreadCard]}
              onPress={() => navigate(SCREENS.CONTINUITY_CASE_DETAILS, { caseId: item.id })}
            >
              <View style={styles.iconWrap}>
                <Icon
                  componentName={VARIABLES.Ionicons}
                  iconName={item.icon}
                  size={22}
                  color={COLORS.ACCENT_GREEN}
                />
              </View>
              <View style={styles.content}>
                <RowComponent style={styles.titleRow}>
                  <Typography translate={false} style={styles.title}>
                    {item.title}
                  </Typography>
                  <Typography translate={false} style={styles.time}>
                    {item.time}
                  </Typography>
                </RowComponent>
                <Typography translate={false} style={styles.body} numberOfLines={2}>
                  {item.body}
                </Typography>
              </View>
            </RowComponent>
          ))}
        </View>
      </Wrapper>
    </MotivaultScreenBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 30,
    gap: 12,
  },
  card: {
    backgroundColor: COLORS.CARD_DARK,
    borderRadius: 14,
    padding: 14,
    alignItems: 'flex-start',
    gap: 12,
  },
  unreadCard: {
    borderWidth: 1,
    borderColor: COLORS.ACCENT_GREEN,
  },
  iconWrap: {
    width: 42,
    height: 42,
    borderRadius: 10,
    backgroundColor: COLORS.INPUT_DARK,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    minWidth: 0,
  },
  titleRow: {
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  title: {
    color: COLORS.WHITE,
    fontSize: FontSize.Medium,
    fontWeight: FontWeight.Bold,
    flex: 1,
    paddingRight: 8,
  },
  time: {
    color: COLORS.TEXT_SECONDARY,
    fontSize: FontSize.Small,
  },
  body: {
    color: COLORS.TEXT_SECONDARY,
    fontSize: FontSize.MediumSmall,
    lineHeight: 20,
  },
});
