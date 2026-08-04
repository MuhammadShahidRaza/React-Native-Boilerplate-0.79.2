import { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Icon, Typography, Wrapper } from 'components/common';
import {
  MotivaultGradientButton,
  MotivaultScreenBackground,
} from 'components/appComponents/motivault';
import { VARIABLES } from 'constants/index';
import { FontSize, FontWeight } from 'types/fontTypes';
import { COLORS } from 'utils/index';

type BillingCycle = 'monthly' | 'yearly';

const FEATURES = [
  'Unlimited vehicles & parts',
  'Verified warranty tracking',
  'Document vault storage',
  'Continuity case support',
  'Priority notifications',
];

const PLANS = {
  monthly: { price: '$9.99', period: '/month', savings: null },
  yearly: { price: '$89.99', period: '/year', savings: 'Save 25%' },
};

export const Membership = () => {
  const [billing, setBilling] = useState<BillingCycle>('monthly');
  const plan = PLANS[billing];

  return (
    <MotivaultScreenBackground>
      <Wrapper useScrollView headerTitle='Membership' backgroundColor={COLORS.BLACK}>
        <View style={styles.container}>
          <Typography translate={false} style={styles.subtitle}>
            Unlock the full Motivault experience
          </Typography>

          <View style={styles.toggleRow}>
            {(['monthly', 'yearly'] as BillingCycle[]).map(option => (
              <TouchableOpacity
                key={option}
                activeOpacity={0.85}
                style={[styles.toggleBtn, billing === option && styles.toggleBtnActive]}
                onPress={() => setBilling(option)}
              >
                <Typography
                  translate={false}
                  style={[styles.toggleText, billing === option && styles.toggleTextActive]}
                >
                  {option === 'monthly' ? 'Monthly' : 'Yearly'}
                </Typography>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.planCard}>
            <View style={styles.planHeader}>
              <Icon
                componentName={VARIABLES.Ionicons}
                iconName='diamond'
                size={28}
                color={COLORS.ACCENT_GREEN}
              />
              <Typography translate={false} style={styles.planName}>
                Premium
              </Typography>
            </View>

            <View style={styles.priceRow}>
              <Typography translate={false} style={styles.price}>
                {plan.price}
              </Typography>
              <Typography translate={false} style={styles.period}>
                {plan.period}
              </Typography>
            </View>

            {plan.savings ? (
              <Typography translate={false} style={styles.savings}>
                {plan.savings}
              </Typography>
            ) : null}

            <View style={styles.divider} />

            {FEATURES.map(feature => (
              <View key={feature} style={styles.featureRow}>
                <Icon
                  componentName={VARIABLES.Ionicons}
                  iconName='checkmark-circle'
                  size={18}
                  color={COLORS.ACCENT_GREEN}
                />
                <Typography translate={false} style={styles.featureText}>
                  {feature}
                </Typography>
              </View>
            ))}
          </View>

          <MotivaultGradientButton
            title='Start Premium'
            variant='green'
            onPress={() => {}}
            style={styles.button}
          />
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
  subtitle: {
    color: COLORS.TEXT_SECONDARY,
    fontSize: FontSize.MediumSmall,
    marginBottom: 20,
    textAlign: 'center',
  },
  toggleRow: {
    flexDirection: 'row',
    backgroundColor: COLORS.CARD_DARK,
    borderRadius: 50,
    padding: 4,
    marginBottom: 24,
  },
  toggleBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 50,
    alignItems: 'center',
  },
  toggleBtnActive: {
    backgroundColor: COLORS.ACCENT_GREEN,
  },
  toggleText: {
    color: COLORS.TEXT_SECONDARY,
    fontSize: FontSize.MediumSmall,
    fontWeight: FontWeight.SemiBold,
  },
  toggleTextActive: {
    color: COLORS.WHITE,
  },
  planCard: {
    backgroundColor: COLORS.CARD_DARK,
    borderRadius: 16,
    padding: 20,
    marginBottom: 28,
  },
  planHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  planName: {
    color: COLORS.WHITE,
    fontSize: FontSize.Large,
    fontWeight: FontWeight.Bold,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 4,
  },
  price: {
    color: COLORS.WHITE,
    fontSize: FontSize.Huge,
    fontWeight: FontWeight.Bold,
  },
  period: {
    color: COLORS.TEXT_SECONDARY,
    fontSize: FontSize.MediumSmall,
    marginBottom: 6,
  },
  savings: {
    color: COLORS.STATUS_GREEN,
    fontSize: FontSize.Small,
    fontWeight: FontWeight.SemiBold,
    marginTop: 6,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.DIVIDER,
    marginVertical: 16,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  featureText: {
    color: COLORS.WHITE,
    fontSize: FontSize.MediumSmall,
    flex: 1,
  },
  button: {
    marginTop: 4,
  },
});
