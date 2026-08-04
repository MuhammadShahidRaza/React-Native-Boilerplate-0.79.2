import { StyleSheet } from 'react-native';
import { COMMON_TEXT, VARIABLES, SCREENS } from 'constants/index';
import { loginValidationSchema, COLORS, deviceDetails } from 'utils/index';
import { FocusProvider, useFormikForm, useAsyncButton } from 'hooks/index';
import { FontSize } from 'types/fontTypes';
import { Input, Typography } from 'components/index';
import {
  MotivaultAuthShell,
  MotivaultGradientButton,
} from 'components/appComponents/motivault';
import { navigate } from 'navigation/index';
import { loginUser } from 'api/functions/auth';
import { Login_SignUp } from 'types/auth';
import { RootState } from 'types/reduxTypes';
import { useSelector } from 'react-redux';

interface LoginFormValues {
  email: string;
  password: string;
  showPassword: boolean;
  user_type: 'user' | 'dentor';
}

export const Login = () => {
  const role = useSelector((state: RootState) => state.user.role);
  const initialValues: LoginFormValues = {
    email: '',
    password: '',
    showPassword: false,
    user_type: role || 'user',
  };

  const handleSubmit = async (values: LoginFormValues) => {
    const deviceInfo = await deviceDetails();
    const data: Login_SignUp = {
      email: values.email,
      password: values.password,
      user_type: values.user_type,
      ...deviceInfo,
    };
    await loginUser({ data, rememberMe: false });
  };

  const formik = useFormikForm<LoginFormValues>({
    initialValues,
    validationSchema: loginValidationSchema,
    onSubmit: handleSubmit,
  });

  const { loading, onPress } = useAsyncButton(formik);

  return (
    <MotivaultAuthShell
      heading='Hello, Welcome Back'
      description='Login to your account below'
      bottomText="Didn't have an account?"
      bottomButtonText='Signup'
      onBottomTextPress={() => navigate(SCREENS.SIGN_UP)}
    >
      <FocusProvider>
        <Input
          name={COMMON_TEXT.EMAIL}
          title='Email Address'
          onChangeText={formik.handleChange('email')}
          onBlur={formik.handleBlur('email')}
          value={formik.values.email}
          allowSpacing={false}
          keyboardType='email-address'
          autoCapitalize='none'
          autoCorrect={false}
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
          title={COMMON_TEXT.PASSWORD}
          onChangeText={formik.handleChange('password')}
          onBlur={formik.handleBlur('password')}
          value={formik.values.password}
          returnKeyType='done'
          allowSpacing={false}
          placeholder='Password'
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
          secureTextEntry={!formik.values.showPassword}
          error={formik.errors.password}
          touched={Boolean(formik.touched.password && formik.submitCount)}
          titleStyle={styles.title}
          secondContainerStyle={styles.inputBox}
        />
      </FocusProvider>

      <Typography
        translate={false}
        onPress={() => navigate(SCREENS.FORGOT_PASSWORD)}
        style={styles.forgot}
      >
        Forgot Password?
      </Typography>

      <MotivaultGradientButton
        title='Login'
        loading={loading}
        onPress={onPress}
        style={styles.button}
      />
    </MotivaultAuthShell>
  );
};

const styles = StyleSheet.create({
  title: {
    color: COLORS.WHITE,
  },
  inputBox: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderColor: 'transparent',
  },
  forgot: {
    color: COLORS.WHITE,
    textAlign: 'right',
    marginBottom: 24,
    marginTop: 4,
    fontSize: FontSize.Small,
  },
  button: {
    marginTop: 4,
  },
});
