import { StyleSheet, View } from 'react-native';
import { Input, Wrapper } from 'components/index';
import {
  MotivaultGradientButton,
  MotivaultScreenBackground,
} from 'components/appComponents/motivault';
import { VARIABLES } from 'constants/index';
import { FocusProvider, useFormikForm, useAsyncButton } from 'hooks/index';
import { FontSize } from 'types/fontTypes';
import { COLORS, changePasswordValidationSchema } from 'utils/index';
import { updatePassword } from 'api/functions/app/user';
import { onBack } from 'navigation/index';

interface ChangePasswordFormValues {
  current_password: string;
  new_password: string;
  confirm_password: string;
  showConfirmPassword: boolean;
  showNewPassword: boolean;
  showCurrentPassword: boolean;
}

export const ChangePassword = () => {
  const initialValues: ChangePasswordFormValues = {
    current_password: '',
    new_password: '',
    confirm_password: '',
    showConfirmPassword: false,
    showNewPassword: false,
    showCurrentPassword: false,
  };

  const handleSubmit = async (values: ChangePasswordFormValues) => {
    await updatePassword({
      current_password: values.current_password,
      password: values.new_password,
      password_confirmation: values.confirm_password,
    });
    onBack();
  };

  const formik = useFormikForm<ChangePasswordFormValues>({
    initialValues,
    validationSchema: changePasswordValidationSchema,
    onSubmit: handleSubmit,
  });

  const { loading, onPress } = useAsyncButton(formik);

  return (
    <MotivaultScreenBackground>
      <Wrapper useScrollView headerTitle='Change Password' backgroundColor={COLORS.BLACK}>
        <View style={styles.container}>
          <FocusProvider>
            <Input
              name='current_password'
              title='Current Password'
              onChangeText={formik.handleChange('current_password')}
              onBlur={formik.handleBlur('current_password')}
              value={formik.values.current_password}
              allowSpacing={false}
              placeholder='Enter current password'
              startIcon={{
                componentName: VARIABLES.Ionicons,
                iconName: 'lock-closed-outline',
                color: COLORS.WHITE,
                size: FontSize.MediumLarge,
              }}
              endIcon={{
                componentName: VARIABLES.Ionicons,
                iconName: formik.values.showCurrentPassword ? 'eye-outline' : 'eye-off-outline',
                color: COLORS.WHITE,
                size: FontSize.MediumLarge,
                onPress: () =>
                  formik.setFieldValue('showCurrentPassword', !formik.values.showCurrentPassword),
              }}
              secureTextEntry={!formik.values.showCurrentPassword}
              error={formik.errors.current_password}
              touched={Boolean(formik.touched.current_password && formik.submitCount)}
              titleStyle={styles.inputTitle}
              secondContainerStyle={styles.inputBox}
            />
            <Input
              name='new_password'
              title='New Password'
              onChangeText={formik.handleChange('new_password')}
              onBlur={formik.handleBlur('new_password')}
              value={formik.values.new_password}
              allowSpacing={false}
              placeholder='Enter new password'
              startIcon={{
                componentName: VARIABLES.Ionicons,
                iconName: 'lock-closed-outline',
                color: COLORS.WHITE,
                size: FontSize.MediumLarge,
              }}
              endIcon={{
                componentName: VARIABLES.Ionicons,
                iconName: formik.values.showNewPassword ? 'eye-outline' : 'eye-off-outline',
                color: COLORS.WHITE,
                size: FontSize.MediumLarge,
                onPress: () =>
                  formik.setFieldValue('showNewPassword', !formik.values.showNewPassword),
              }}
              secureTextEntry={!formik.values.showNewPassword}
              error={formik.errors.new_password}
              touched={Boolean(formik.touched.new_password && formik.submitCount)}
              titleStyle={styles.inputTitle}
              secondContainerStyle={styles.inputBox}
            />
            <Input
              name='confirm_password'
              title='Confirm Password'
              onChangeText={formik.handleChange('confirm_password')}
              onBlur={formik.handleBlur('confirm_password')}
              value={formik.values.confirm_password}
              allowSpacing={false}
              returnKeyType='done'
              placeholder='Confirm new password'
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
              secureTextEntry={!formik.values.showConfirmPassword}
              error={formik.errors.confirm_password}
              touched={Boolean(formik.touched.confirm_password && formik.submitCount)}
              titleStyle={styles.inputTitle}
              secondContainerStyle={styles.inputBox}
            />
          </FocusProvider>

          <MotivaultGradientButton
            title='Save'
            variant='green'
            loading={loading}
            onPress={onPress}
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
  inputTitle: {
    color: COLORS.WHITE,
  },
  inputBox: {
    backgroundColor: COLORS.INPUT_DARK,
    borderColor: 'transparent',
  },
  button: {
    marginTop: 32,
  },
});
