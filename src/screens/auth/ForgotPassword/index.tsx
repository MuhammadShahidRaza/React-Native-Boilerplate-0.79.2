import { StyleSheet } from 'react-native';
import { COMMON_TEXT, VARIABLES } from 'constants/index';
import { COLORS, forgotPasswordValidationSchema } from 'utils/index';
import { FocusProvider, useFormikForm, useAsyncButton } from 'hooks/index';
import { FontSize } from 'types/fontTypes';
import { Input } from 'components/index';
import {
  MotivaultAuthShell,
  MotivaultGradientButton,
} from 'components/appComponents/motivault';
import { forgotPassword } from 'api/functions/auth';

interface ForgotPasswordFormValues {
  email: string;
}

export const ForgotPassword = () => {
  const initialValues: ForgotPasswordFormValues = { email: '' };

  const handleSubmit = async (values: ForgotPasswordFormValues) => {
    await forgotPassword({ data: { email: values.email } });
  };

  const formik = useFormikForm<ForgotPasswordFormValues>({
    initialValues,
    validationSchema: forgotPasswordValidationSchema,
    onSubmit: handleSubmit,
  });

  const { loading, onPress } = useAsyncButton(formik);

  return (
    <MotivaultAuthShell
      showBack
      heading='Forgot Password'
      description='Enter your email address to reset your password'
    >
      <FocusProvider>
        <Input
          name={COMMON_TEXT.EMAIL}
          title='Email Address'
          onChangeText={formik.handleChange('email')}
          onBlur={formik.handleBlur('email')}
          value={formik.values.email}
          allowSpacing={false}
          autoCapitalize='none'
          autoCorrect={false}
          returnKeyType='go'
          keyboardType='email-address'
          placeholder='abc@abc.com'
          error={formik.errors.email}
          touched={Boolean(formik.touched.email && formik.submitCount)}
          startIcon={{
            componentName: VARIABLES.Ionicons,
            iconName: 'mail-outline',
            color: COLORS.WHITE,
            size: FontSize.MediumLarge,
          }}
          titleStyle={styles.title}
          secondContainerStyle={styles.inputBox}
        />
      </FocusProvider>
      <MotivaultGradientButton
        title='Send OTP'
        loading={loading}
        onPress={onPress}
        style={styles.button}
        textStyle={styles.buttonText}
      />
    </MotivaultAuthShell>
  );
};

const styles = StyleSheet.create({
  title: { color: COLORS.WHITE },
  inputBox: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderColor: 'transparent',
  },
  button: { marginTop: 28 },
  buttonText: { color: COLORS.WHITE },
});
