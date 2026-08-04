import { useRef, useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Typography, RowComponent } from 'components/common';
import {
  MotivaultAuthShell,
  MotivaultGradientButton,
} from 'components/appComponents/motivault';
import { COLORS } from 'utils/colors';
import { FontSize, FontWeight } from 'types/fontTypes';
import { AppScreenProps } from 'types/navigation';
import { SCREENS } from 'constants/routes';
import { resendEmailCode, verifyEmailCode, verifyOtpCode } from 'api/functions/auth';
import { useSelector } from 'react-redux';
import { RootState } from 'types/reduxTypes';
import { useMultipleAsyncButtons } from 'hooks/index';

const CODE_LENGTH = 5;

export const Verification = ({
  route,
}: AppScreenProps<typeof SCREENS.VERIFICATION>) => {
  const isFromForgot = route.params?.isFromForgot;
  const email = route.params?.email;
  const [code, setCode] = useState('');
  const inputRef = useRef<TextInput>(null);
  const role = useSelector((state: RootState) => state.user.role);
  const buttons = useMultipleAsyncButtons();

  const handleChange = (text: string) => {
    setCode(text.replace(/[^0-9]/g, '').slice(0, CODE_LENGTH));
  };

  const handleVerify = buttons.wrap('verify', async () => {
    if (isFromForgot) {
      await verifyOtpCode({ data: { email, otp_code: code } });
    } else {
      await verifyEmailCode({
        data: { email, otp: code, user_type: role },
      });
    }
  });

  const handleResend = buttons.wrap('resend', async () => {
    setCode('');
    inputRef.current?.focus();
    await resendEmailCode({ data: { email } });
  });

  const displayCode = Array(CODE_LENGTH)
    .fill('')
    .map((_, idx) => code[idx] || '');

  return (
    <MotivaultAuthShell
      showBack
      heading='Enter Verification Code'
      description='We have sent a code verification to your email address'
    >
      <View style={styles.codeContainer}>
        <TextInput
          ref={inputRef}
          style={styles.hiddenInput}
          value={code}
          onChangeText={handleChange}
          keyboardType='number-pad'
          maxLength={CODE_LENGTH}
          autoFocus
          textContentType='oneTimeCode'
        />
        <RowComponent style={styles.codeRow}>
          {displayCode.map((digit, idx) => (
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => inputRef.current?.focus()}
              key={idx}
              style={styles.codeInput}
            >
              <Typography translate={false} style={styles.codeText}>
                {digit}
              </Typography>
              <View style={[styles.underline, digit ? styles.underlineFilled : null]} />
            </TouchableOpacity>
          ))}
        </RowComponent>
      </View>

      <MotivaultGradientButton
        title='Send OTP'
        onPress={handleVerify}
        loading={buttons.isLoading('verify')}
        disabled={code.length !== CODE_LENGTH || buttons.isLoading('verify')}
        textStyle={styles.buttonText}
        style={styles.button}
      />

      <Typography
        translate={false}
        style={styles.resend}
        onPress={handleResend}
      >
        {buttons.isLoading('resend') ? 'Sending...' : 'Resend Code'}
      </Typography>
    </MotivaultAuthShell>
  );
};

const styles = StyleSheet.create({
  codeContainer: {
    position: 'relative',
    marginVertical: 28,
  },
  hiddenInput: {
    position: 'absolute',
    width: '100%',
    height: 56,
    opacity: 0,
  },
  codeRow: {
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  codeInput: {
    width: 44,
    alignItems: 'center',
  },
  codeText: {
    fontSize: FontSize.ExtraLarge,
    color: COLORS.WHITE,
    fontWeight: FontWeight.Bold,
    minHeight: 36,
  },
  underline: {
    marginTop: 6,
    height: 2,
    width: '100%',
    backgroundColor: COLORS.WHITE,
    opacity: 0.5,
  },
  underlineFilled: {
    opacity: 1,
  },
  button: { marginTop: 10 },
  buttonText: { color: COLORS.WHITE },
  resend: {
    color: COLORS.TEXT_SECONDARY,
    textAlign: 'center',
    marginTop: 18,
    textDecorationLine: 'underline',
  },
});
