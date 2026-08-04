import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Icon,
  ModalComponent,
  Photo,
  RowComponent,
  Typography,
  Wrapper,
} from 'components/common';
import {
  MotivaultGradientButton,
  MotivaultScreenBackground,
} from 'components/appComponents/motivault';
import { SCREENS, VARIABLES } from 'constants/index';
import { navigate } from 'navigation/Navigators';
import { reset } from 'navigation/index';
import store from 'store/store';
import { resetAppState } from 'store/slices/appSettings';
import { useAppSelector } from 'types/reduxTypes';
import { FontSize, FontWeight } from 'types/fontTypes';
import { COLORS, removeKeychainItem, screenWidth } from 'utils/index';

const STATS = [
  { label: 'Vehicles', value: '3' },
  { label: 'Parts', value: '12' },
  { label: 'Docs', value: '8' },
  { label: 'Cases', value: '2' },
];

const MENU_ITEMS = [
  { title: 'Edit Profile', icon: 'person-outline', screen: SCREENS.EDIT_PROFILE },
  { title: 'Membership', icon: 'diamond-outline', screen: SCREENS.MEMBERSHIP },
  { title: 'Change Password', icon: 'lock-closed-outline', screen: SCREENS.CHANGE_PASSWORD },
  { title: 'Notifications', icon: 'notifications-outline', screen: SCREENS.NOTIFICATIONS },
  { title: 'Contact Us', icon: 'mail-outline', screen: SCREENS.CONTACT_US },
  { title: 'About', icon: 'information-circle-outline', screen: SCREENS.ABOUT },
  { title: 'Privacy Policy', icon: 'shield-checkmark-outline', screen: SCREENS.PRIVACY_POLICY },
  {
    title: 'Terms & Conditions',
    icon: 'document-text-outline',
    screen: SCREENS.TERMS_AND_CONDITIONS,
  },
];

export const MyAccount = () => {
  const { userDetails } = useAppSelector(state => state.user);
  const [signOutVisible, setSignOutVisible] = useState(false);

  const handleSignOut = async () => {
    setSignOutVisible(false);
    store.dispatch(resetAppState());
    await removeKeychainItem(VARIABLES.USER_TOKEN);
    reset(SCREENS.LOGIN);
  };

  return (
    <MotivaultScreenBackground>
      <Wrapper
        showBackButton={false}
        useScrollView
        safeAreaEdges={['top', 'bottom']}
        backgroundColor={COLORS.BLACK}
      >
        <View style={styles.container}>
          <View style={styles.profileCard}>
            <Photo
              source={userDetails?.profile_image}
              size={72}
              borderRadius={36}
              containerStyle={styles.avatar}
            />
            <Typography translate={false} style={styles.name}>
              {userDetails?.full_name || 'Alex Morgan'}
            </Typography>
            <Typography translate={false} style={styles.email}>
              {userDetails?.email || 'alex.morgan@email.com'}
            </Typography>
          </View>

          <View style={styles.statsRow}>
            {STATS.map(stat => (
              <View key={stat.label} style={styles.statCard}>
                <Typography translate={false} style={styles.statValue}>
                  {stat.value}
                </Typography>
                <Typography translate={false} style={styles.statLabel}>
                  {stat.label}
                </Typography>
              </View>
            ))}
          </View>

          <Typography translate={false} style={styles.sectionTitle}>
            Account
          </Typography>

          <View style={styles.menuCard}>
            {MENU_ITEMS.map((item, index) => (
              <RowComponent
                key={item.title}
                style={[styles.menuRow, index === MENU_ITEMS.length - 1 && styles.menuRowLast]}
                onPress={() => {
                  if (item.screen === SCREENS.PRIVACY_POLICY || item.screen === SCREENS.TERMS_AND_CONDITIONS) {
                    navigate(SCREENS.PRIVACY_POLICY, { title: item.title });
                    return;
                  }
                  navigate(item.screen);
                }}
              >
                <View style={styles.menuLeft}>
                  <Icon
                    componentName={VARIABLES.Ionicons}
                    iconName={item.icon}
                    size={FontSize.Large}
                    color={COLORS.ACCENT_GREEN}
                  />
                  <Typography translate={false} style={styles.menuTitle}>
                    {item.title}
                  </Typography>
                </View>
                <Icon
                  componentName={VARIABLES.Entypo}
                  iconName='chevron-small-right'
                  size={FontSize.Large}
                  color={COLORS.TEXT_SECONDARY}
                />
              </RowComponent>
            ))}
          </View>

          <RowComponent style={styles.signOutRow} onPress={() => setSignOutVisible(true)}>
            <Icon
              componentName={VARIABLES.Ionicons}
              iconName='log-out-outline'
              size={FontSize.Large}
              color={COLORS.STATUS_RED}
            />
            <Typography translate={false} style={styles.signOutText}>
              Sign Out
            </Typography>
          </RowComponent>
        </View>
      </Wrapper>

      <ModalComponent
        modalVisible={signOutVisible}
        setModalVisible={setSignOutVisible}
        position='center'
        wantToCloseOnBack
        wantToCloseOnTop
        modalSecondaryContainerStyle={styles.modalCard}
      >
        <Typography translate={false} style={styles.modalTitle}>
          Sign Out
        </Typography>
        <Typography translate={false} style={styles.modalMessage}>
          Are you sure you want to sign out?
        </Typography>
        <RowComponent style={styles.modalActions}>
          <MotivaultGradientButton
            title='No'
            variant='silver'
            onPress={() => setSignOutVisible(false)}
            style={styles.modalBtn}
          />
          <MotivaultGradientButton
            title='Yes'
            variant='green'
            onPress={handleSignOut}
            style={styles.modalBtn}
          />
        </RowComponent>
      </ModalComponent>
    </MotivaultScreenBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  profileCard: {
    backgroundColor: COLORS.CARD_DARK,
    borderRadius: 16,
    alignItems: 'center',
    paddingVertical: 24,
    marginTop: 8,
    marginBottom: 16,
  },
  avatar: {
    marginBottom: 12,
    borderWidth: 2,
    borderColor: COLORS.ACCENT_GREEN,
  },
  name: {
    color: COLORS.WHITE,
    fontSize: FontSize.Large,
    fontWeight: FontWeight.Bold,
    textTransform: 'capitalize',
  },
  email: {
    color: COLORS.TEXT_SECONDARY,
    fontSize: FontSize.MediumSmall,
    marginTop: 4,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.CARD_DARK,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  statValue: {
    color: COLORS.WHITE,
    fontSize: FontSize.Large,
    fontWeight: FontWeight.Bold,
  },
  statLabel: {
    color: COLORS.TEXT_SECONDARY,
    fontSize: FontSize.Small,
    marginTop: 4,
  },
  sectionTitle: {
    color: COLORS.WHITE,
    fontSize: FontSize.MediumLarge,
    fontWeight: FontWeight.Bold,
    marginBottom: 12,
  },
  menuCard: {
    backgroundColor: COLORS.CARD_DARK,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 20,
  },
  menuRow: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.DIVIDER,
    justifyContent: 'space-between',
  },
  menuRowLast: {
    borderBottomWidth: 0,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuTitle: {
    color: COLORS.WHITE,
    fontSize: FontSize.MediumSmall,
    fontWeight: FontWeight.Medium,
  },
  signOutRow: {
    backgroundColor: COLORS.CARD_DARK,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 12,
    justifyContent: 'flex-start',
  },
  signOutText: {
    color: COLORS.STATUS_RED,
    fontSize: FontSize.MediumSmall,
    fontWeight: FontWeight.SemiBold,
  },
  modalCard: {
    width: screenWidth(85),
    backgroundColor: COLORS.CARD_DARK,
    borderRadius: 16,
    padding: 24,
  },
  modalTitle: {
    color: COLORS.WHITE,
    fontSize: FontSize.Large,
    fontWeight: FontWeight.Bold,
    textAlign: 'center',
    marginBottom: 8,
  },
  modalMessage: {
    color: COLORS.TEXT_SECONDARY,
    fontSize: FontSize.MediumSmall,
    textAlign: 'center',
    marginBottom: 20,
  },
  modalActions: {
    gap: 12,
  },
  modalBtn: {
    flex: 1,
  },
});
