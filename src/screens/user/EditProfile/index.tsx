import { StyleSheet, View } from 'react-native';
import { Input, ProfilePictureUpload, Wrapper } from 'components/index';
import {
  MotivaultGradientButton,
  MotivaultScreenBackground,
} from 'components/appComponents/motivault';
import { VARIABLES } from 'constants/index';
import { FocusProvider, useFormikForm, useAsyncButton } from 'hooks/index';
import { EditProfileFormTypes, FontSize, useAppSelector } from 'types/index';
import {
  COLORS,
  safeString,
  hasUri,
  screenWidth,
  editProfileWithPhoneSchema,
} from 'utils/index';
import { updateUserDetails } from 'api/functions/app/user';
import { SelectedMedia } from 'hooks/useMediaPicker';
import { onBack } from 'navigation/index';

export const EditProfile = () => {
  const { userDetails } = useAppSelector(state => state.user);

  const initialValues = {
    full_name: safeString(userDetails?.full_name),
    phone_number: safeString((userDetails as { phone_number?: string })?.phone_number),
    email: safeString(userDetails?.email),
    profile_image: userDetails?.profile_image || '',
  };

  const handleSubmit = async (values: EditProfileFormTypes & { phone_number?: string }) => {
    const { profile_image, ...rest } = values;
    await updateUserDetails({
      ...rest,
      ...(hasUri(profile_image) ? { profile_image } : {}),
    });
    onBack();
  };

  const formik = useFormikForm({
    initialValues,
    enableReinitialize: true,
    validationSchema: editProfileWithPhoneSchema,
    onSubmit: handleSubmit,
  });

  const { loading, onPress } = useAsyncButton(formik);

  const handleProfileImageSelected = (image: SelectedMedia) => {
    formik.setFieldValue('profile_image', image ?? '');
    formik.setFieldTouched('profile_image', true);
  };

  return (
    <MotivaultScreenBackground>
      <Wrapper useScrollView headerTitle='Edit Profile' backgroundColor={COLORS.BLACK}>
        <View style={styles.container}>
          <FocusProvider>
            <ProfilePictureUpload
              source={formik.values.profile_image || userDetails?.profile_image}
              onImageSelected={handleProfileImageSelected}
              showEditIcon
              size={screenWidth(28)}
              borderColor={COLORS.ACCENT_GREEN}
              containerStyle={styles.profileHeader}
            />

            <Input
              name='full_name'
              title='Full Name'
              onChangeText={formik.handleChange('full_name')}
              onBlur={formik.handleBlur('full_name')}
              value={formik.values.full_name}
              placeholder='Enter full name'
              error={formik.errors.full_name}
              touched={Boolean(formik.touched.full_name && formik.submitCount)}
              startIcon={{
                componentName: VARIABLES.Ionicons,
                iconName: 'person-outline',
                color: COLORS.WHITE,
                size: FontSize.MediumLarge,
              }}
              titleStyle={styles.inputTitle}
              secondContainerStyle={styles.inputBox}
            />

            <Input
              name='phone_number'
              title='Phone'
              onChangeText={formik.handleChange('phone_number')}
              onBlur={formik.handleBlur('phone_number')}
              value={formik.values.phone_number}
              keyboardType='phone-pad'
              placeholder='Enter phone number'
              error={formik.errors.phone_number}
              touched={Boolean(formik.touched.phone_number && formik.submitCount)}
              startIcon={{
                componentName: VARIABLES.Ionicons,
                iconName: 'call-outline',
                color: COLORS.WHITE,
                size: FontSize.MediumLarge,
              }}
              titleStyle={styles.inputTitle}
              secondContainerStyle={styles.inputBox}
            />

            <Input
              name='email'
              title='Email Address'
              onChangeText={formik.handleChange('email')}
              onBlur={formik.handleBlur('email')}
              value={formik.values.email}
              allowSpacing={false}
              editable={false}
              keyboardType='email-address'
              placeholder='Enter email address'
              error={formik.errors.email}
              touched={Boolean(formik.touched.email && formik.submitCount)}
              startIcon={{
                componentName: VARIABLES.Ionicons,
                iconName: 'mail-outline',
                color: COLORS.WHITE,
                size: FontSize.MediumLarge,
              }}
              titleStyle={styles.inputTitle}
              secondContainerStyle={styles.inputBox}
            />
          </FocusProvider>

          <MotivaultGradientButton
            title='Save Profile'
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
  profileHeader: {
    alignSelf: 'center',
    marginVertical: 20,
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
