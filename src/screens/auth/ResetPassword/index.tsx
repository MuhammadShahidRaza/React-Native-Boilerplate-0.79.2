import { Image, StyleSheet, View } from 'react-native';
import { COMMON_TEXT, ENV_CONSTANTS, SCREENS, VARIABLES, IMAGES } from 'constants/index';
import { COLORS, removeKeychainItem, resetPasswordValidationSchema } from 'utils/index';
import { FocusProvider, useFormikForm, useAsyncButton } from 'hooks/index';
import { FontSize, FontWeight, AppScreenProps } from 'types/index';
import { Input, Typography, ModalComponent } from 'components/index';
import {
  MotivaultAuthShell,
  MotivaultGradientButton,
} from 'components/appComponents/motivault';
import { resetUserPassword } from 'api/functions/auth';
import { useState } from 'react';
import { reset } from 'navigation/index';

interface ResetPasswordFormValues {
  new_password: string;
  confirm_password: string;
  showConfirmPassword: boolean;
  showNewPassword: boolean;
}

export const ResetPassword = ({
  route,
}: AppScreenProps<typeof SCREENS.RESET_PASSWORD>) => {
  const data = route?.params?.data;
  const initialValues: ResetPasswordFormValues = {
    new_password: '',
    confirm_password: '',
    showConfirmPassword: false,
    showNewPassword: false,
  };

  const [isVisible, setIsVisible] = useState(false);

  const handleSubmit = async (values: ResetPasswordFormValues) => {
    const payload = {
      password: values.new_password,
      ...data,
    };

    if (ENV_CONSTANTS.IS_ALPHA_PHASE) {
      setIsVisible(true);
      return;
    }

    const response = await resetUserPassword({ data: payload });
    if (response) setIsVisible(true);
  };

  const formik = useFormikForm<ResetPasswordFormValues>({
    initialValues,
    validationSchema: resetPasswordValidationSchema,
    onSubmit: handleSubmit,
  });

  const { loading, onPress } = useAsyncButton(formik);

  return (
    <>
      <MotivaultAuthShell
        showBack
        heading='Enter New Password'
        description='Enter your new password'
      >
        <FocusProvider>
          <Input
            name={COMMON_TEXT.NEW_PASSWORD}
            title='Password'
            onChangeText={formik.handleChange('new_password')}
            onBlur={formik.handleBlur('new_password')}
            value={formik.values.new_password}
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
              iconName: formik.values.showNewPassword ? 'eye-outline' : 'eye-off-outline',
              color: COLORS.WHITE,
              size: FontSize.MediumLarge,
              onPress: () =>
                formik.setFieldValue('showNewPassword', !formik.values.showNewPassword),
            }}
            secureTextEntry={!formik.values.showNewPassword}
            error={formik.errors.new_password}
            touched={Boolean(formik.touched.new_password && formik.submitCount)}
            titleStyle={styles.title}
            secondContainerStyle={styles.inputBox}
          />
          <Input
            name={COMMON_TEXT.CONFIRM_PASSWORD}
            title='Confirm Password'
            onChangeText={formik.handleChange('confirm_password')}
            onBlur={formik.handleBlur('confirm_password')}
            value={formik.values.confirm_password}
            allowSpacing={false}
            returnKeyType='done'
            placeholder='Password'
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
            titleStyle={styles.title}
            secondContainerStyle={styles.inputBox}
          />
        </FocusProvider>
        <MotivaultGradientButton
          title='Save'
          loading={loading}
          onPress={onPress}
          style={styles.button}
          textStyle={styles.buttonText}
        />
      </MotivaultAuthShell>

      <ModalComponent
        modalVisible={isVisible}
        setModalVisible={setIsVisible}
        position='center'
        wantToCloseOnTop={false}
        wantToCloseOnBack={false}
      >
        <View style={styles.modalCard}>
          <Image source={IMAGES.SUCCESS_CHECK} style={styles.successIcon} resizeMode='contain' />
          <Typography translate={false} style={styles.modalTitle}>
            Password Update Successfully
          </Typography>
          <Typography translate={false} style={styles.modalDesc}>
            Your password has been updated successfully
          </Typography>
          <MotivaultGradientButton
            title='Back to login'
            onPress={() => {
              setIsVisible(false);
              removeKeychainItem(VARIABLES.USER_TOKEN);
              reset(SCREENS.LOGIN);
            }}
            textStyle={styles.buttonText}
            style={styles.modalBtn}
          />
        </View>
      </ModalComponent>
    </>
  );
};

const styles = StyleSheet.create({
  title: { color: COLORS.WHITE },
  inputBox: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderColor: 'transparent',
  },
  button: { marginTop: 28 },
  buttonText: { color: COLORS.WHITE },
  modalCard: {
    backgroundColor: COLORS.CARD_DARK,
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: COLORS.BORDER,
  },
  successIcon: {
    width: 90,
    height: 90,
    marginBottom: 16,
  },
  modalTitle: {
    color: COLORS.WHITE,
    fontSize: FontSize.Large,
    fontWeight: FontWeight.Bold,
    textAlign: 'center',
    marginBottom: 8,
  },
  modalDesc: {
    color: COLORS.TEXT_SECONDARY,
    textAlign: 'center',
    marginBottom: 22,
  },
  modalBtn: { width: '100%' },
});
