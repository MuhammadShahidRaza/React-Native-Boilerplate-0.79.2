import { StyleSheet } from 'react-native';
import { COMMON_TEXT, SCREENS, VARIABLES } from 'constants/index';
import { COLORS, deviceDetails, signUpValidationSchema } from 'utils/index';
import { FocusProvider, useFormikForm, useAsyncButton } from 'hooks/index';
import { FontSize } from 'types/fontTypes';
import { Input, Checkbox, ProfilePictureUpload, Typography } from 'components/index';
import {
  MotivaultAuthShell,
  MotivaultGradientButton,
} from 'components/appComponents/motivault';
import { signUpUser } from 'api/functions/auth';
import { navigate } from 'navigation/index';
import { Login_SignUp } from 'types/auth';
import { RootState } from 'types/reduxTypes';
import { useSelector } from 'react-redux';
import { SelectedMedia } from 'hooks/useMediaPicker';

interface SignUpFormValues {
  email: string;
  full_name: string;
  user_name: string;
  password: string;
  confirmPassword: string;
  user_type: 'user' | 'dentor';
  profile_image?: SelectedMedia | null;
  showPassword: boolean;
  agreeToTerms: boolean;
  showConfirmPassword: boolean;
}

export const SignUp = () => {
  const role = useSelector((state: RootState) => state.user.role);

  const initialValues: SignUpFormValues = {
    email: '',
    password: '',
    full_name: '',
    user_name: '',
    user_type: role || 'user',
    profile_image: null,
    confirmPassword: '',
    showPassword: false,
    agreeToTerms: false,
    showConfirmPassword: false,
  };

  const handleSubmit = async (values: SignUpFormValues) => {
    const deviceInfo = await deviceDetails();
    const data: Login_SignUp = {
      email: values.email,
      password: values.password,
      full_name: values.full_name,
      user_type: role || 'user',
      ...(values.profile_image && { profile_image: values.profile_image }),
      ...deviceInfo,
    };
    await signUpUser({ data });
  };

  const formik = useFormikForm<SignUpFormValues>({
    initialValues,
    validationSchema: signUpValidationSchema,
    onSubmit: handleSubmit,
  });

  const { loading, onPress } = useAsyncButton(formik);

  return (
    <MotivaultAuthShell
      heading='Signup'
      description='Enter your details below to create your account.'
      bottomText='Already have an account?'
      bottomButtonText='Login'
      onBottomTextPress={() => navigate(SCREENS.LOGIN)}
    >
      <Typography translate={false} style={styles.optional}>
        Profile Picture (optional)
      </Typography>
      <ProfilePictureUpload
        source={formik.values.profile_image?.uri}
        onImageSelected={(media: SelectedMedia) =>
          formik.setFieldValue('profile_image', media)
        }
      />

      <FocusProvider>
        <Input
          name='full_name'
          title='Full Name'
          onChangeText={formik.handleChange('full_name')}
          onBlur={formik.handleBlur('full_name')}
          value={formik.values.full_name}
          placeholder='John Doe'
          error={formik.errors.full_name}
          touched={Boolean(formik.touched.full_name && formik.submitCount)}
          startIcon={{
            componentName: VARIABLES.Ionicons,
            iconName: 'person-outline',
            color: COLORS.WHITE,
            size: FontSize.MediumLarge,
          }}
          titleStyle={styles.title}
          secondContainerStyle={styles.inputBox}
        />
        <Input
          name={COMMON_TEXT.EMAIL}
          title='Email Address'
          onChangeText={formik.handleChange('email')}
          onBlur={formik.handleBlur('email')}
          value={formik.values.email}
          allowSpacing={false}
          keyboardType='email-address'
          autoCapitalize='none'
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
        <Input
          name={COMMON_TEXT.PASSWORD}
          title='Password'
          onChangeText={formik.handleChange('password')}
          onBlur={formik.handleBlur('password')}
          value={formik.values.password}
          allowSpacing={false}
          placeholder='Password'
          secureTextEntry={!formik.values.showPassword}
          error={formik.errors.password}
          touched={Boolean(formik.touched.password && formik.submitCount)}
          startIcon={{
            componentName: VARIABLES.Ionicons,
            iconName: 'lock-closed-outline',
            color: COLORS.WHITE,
            size: FontSize.MediumLarge,
          }}
          endIcon={{
            componentName: VARIABLES.Ionicons,
            iconName: formik.values.showPassword ? 'eye-outline' : 'eye-off-outline',
            color: COLORS.WHITE,
            size: FontSize.MediumLarge,
            onPress: () => formik.setFieldValue('showPassword', !formik.values.showPassword),
          }}
          titleStyle={styles.title}
          secondContainerStyle={styles.inputBox}
        />
        <Input
          name={COMMON_TEXT.CONFIRM_PASSWORD}
          title='Confirm Password'
          onChangeText={formik.handleChange('confirmPassword')}
          onBlur={formik.handleBlur('confirmPassword')}
          value={formik.values.confirmPassword}
          allowSpacing={false}
          placeholder='Password'
          secureTextEntry={!formik.values.showConfirmPassword}
          error={formik.errors.confirmPassword}
          touched={Boolean(formik.touched.confirmPassword && formik.submitCount)}
          startIcon={{
            componentName: VARIABLES.Ionicons,
            iconName: 'lock-closed-outline',
            color: COLORS.WHITE,
            size: FontSize.MediumLarge,
          }}
          endIcon={{
            componentName: VARIABLES.Ionicons,
            iconName: formik.values.showConfirmPassword ? 'eye-outline' : 'eye-off-outline',
            color: COLORS.WHITE,
            size: FontSize.MediumLarge,
            onPress: () =>
              formik.setFieldValue('showConfirmPassword', !formik.values.showConfirmPassword),
          }}
          titleStyle={styles.title}
          secondContainerStyle={styles.inputBox}
        />
        <Input
          name='user_name'
          title='User Name'
          onChangeText={formik.handleChange('user_name')}
          onBlur={formik.handleBlur('user_name')}
          value={formik.values.user_name}
          allowSpacing={false}
          autoCapitalize='none'
          placeholder='johndoe'
          titleStyle={styles.title}
          secondContainerStyle={styles.inputBox}
          startIcon={{
            componentName: VARIABLES.Ionicons,
            iconName: 'person-outline',
            color: COLORS.WHITE,
            size: FontSize.MediumLarge,
          }}
        />
      </FocusProvider>

      <Checkbox
        checked={formik.values.agreeToTerms}
        onChange={checked => formik.setFieldValue('agreeToTerms', checked)}
        label='I Accept the Terms & Conditions & Privacy Policy'
        color={COLORS.WHITE}
        labelStyle={styles.checkLabel}
        style={styles.checkbox}
      />

      <MotivaultGradientButton
        title='Signup'
        loading={loading}
        onPress={onPress}
        disabled={!formik.values.agreeToTerms}
        style={styles.button}
      />
    </MotivaultAuthShell>
  );
};

const styles = StyleSheet.create({
  optional: {
    color: COLORS.WHITE,
    marginBottom: 8,
    fontSize: FontSize.Small,
  },
  title: { color: COLORS.WHITE },
  inputBox: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderColor: 'transparent',
  },
  checkbox: { marginVertical: 12 },
  checkLabel: { color: COLORS.WHITE },
  button: { marginTop: 8 },
});
