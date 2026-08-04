import { StyleSheet, View } from 'react-native';
import { getVersion, getBuildNumber } from 'react-native-device-info';
import { Icon, Typography, Wrapper } from 'components/common';
import { MotivaultScreenBackground } from 'components/appComponents/motivault';
import { VARIABLES } from 'constants/index';
import { FontSize, FontWeight } from 'types/fontTypes';
import { COLORS } from 'utils/index';

const SECTIONS = [
  {
    title: 'About Motivault',
    icon: 'car-sport-outline',
    body: 'Motivault is your digital garage — a secure vault for vehicle ownership records, verified parts, warranty documentation, and continuity of ownership across life events.',
  },
  {
    title: 'Our Mission',
    icon: 'flag-outline',
    body: 'We help collectors and enthusiasts preserve provenance, protect investments, and transfer ownership with confidence through verified documentation and continuity services.',
  },
  {
    title: 'How It Works',
    icon: 'layers-outline',
    body: 'Add your vehicles and parts, upload supporting documents, track warranties, and initiate continuity cases when ownership changes. Everything stays organized in one secure place.',
  },
  {
    title: 'Support',
    icon: 'headset-outline',
    body: 'Need help? Reach us at support@motivault.app or through Contact Us in your account settings. Our team typically responds within one business day.',
  },
];

export const AboutUs = () => {
  return (
    <MotivaultScreenBackground>
      <Wrapper useScrollView headerTitle='About' backgroundColor={COLORS.BLACK}>
        <View style={styles.container}>
          {SECTIONS.map(section => (
            <View key={section.title} style={styles.card}>
              <View style={styles.cardHeader}>
                <Icon
                  componentName={VARIABLES.Ionicons}
                  iconName={section.icon}
                  size={22}
                  color={COLORS.ACCENT_GREEN}
                />
                <Typography translate={false} style={styles.cardTitle}>
                  {section.title}
                </Typography>
              </View>
              <Typography translate={false} style={styles.cardBody}>
                {section.body}
              </Typography>
            </View>
          ))}

          <Typography translate={false} style={styles.version}>
            {`Version ${getVersion()} (${getBuildNumber()})`}
          </Typography>
        </View>
      </Wrapper>
    </MotivaultScreenBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: COLORS.CARD_DARK,
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  cardTitle: {
    color: COLORS.WHITE,
    fontSize: FontSize.Medium,
    fontWeight: FontWeight.Bold,
  },
  cardBody: {
    color: COLORS.TEXT_SECONDARY,
    fontSize: FontSize.MediumSmall,
    lineHeight: 22,
  },
  version: {
    color: COLORS.TEXT_SECONDARY,
    fontSize: FontSize.Small,
    textAlign: 'center',
    marginTop: 12,
  },
});
