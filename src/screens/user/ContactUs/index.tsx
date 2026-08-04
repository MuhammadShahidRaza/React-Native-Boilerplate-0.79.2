import { StyleSheet, View } from 'react-native';
import { Input, Wrapper } from 'components/index';
import {
  MotivaultGradientButton,
  MotivaultScreenBackground,
} from 'components/appComponents/motivault';
import { VARIABLES } from 'constants/index';
import { FocusProvider, useFormikForm, useAsyncButton } from 'hooks/index';
import { FontSize } from 'types/fontTypes';
import { useAppSelector } from 'types/reduxTypes';
import { COLORS, motivaultContactSchema, screenHeight } from 'utils/index';
import { contactUs } from 'api/functions/app/settings';
import { onBack } from 'navigation/index';

export interface ContactUsFormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

type ContactUsFormState = Pick<ContactUsFormValues, 'name' | 'email' | 'message'>;

export const ContactUs = () => {
  const { userDetails } = useAppSelector(state => state.user);

  const initialValues: ContactUsFormState = {
    name: userDetails?.full_name ?? '',
    email: userDetails?.email ?? '',
    message: '',
  };

  const handleSubmit = async (values: ContactUsFormState) => {
    await contactUs({
      name: values.name,
      email: values.email,
      subject: `Contact from ${values.name}`,
      message: values.message,
    });
    onBack();
  };

  const formik = useFormikForm<ContactUsFormState>({
    initialValues,
    validationSchema: motivaultContactSchema,
    onSubmit: handleSubmit,
  });

  const { loading, onPress } = useAsyncButton(formik);

  return (
    <MotivaultScreenBackground>
      <Wrapper useScrollView headerTitle='Contact Us' backgroundColor={COLORS.BLACK}>
        <View style={styles.container}>
          <FocusProvider>
            <Input
              name='name'
              title='Name'
              onChangeText={formik.handleChange('name')}
              onBlur={formik.handleBlur('name')}
              value={formik.values.name}
              placeholder='Enter your name'
              error={formik.errors.name}
              touched={Boolean(formik.touched.name && formik.submitCount)}
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
              name='email'
              title='Email Address'
              onChangeText={formik.handleChange('email')}
              onBlur={formik.handleBlur('email')}
              value={formik.values.email}
              allowSpacing={false}
              keyboardType='email-address'
              placeholder='Enter your email'
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
            <Input
              name='message'
              title='Message'
              onChangeText={formik.handleChange('message')}
              onBlur={formik.handleBlur('message')}
              value={formik.values.message}
              placeholder='How can we help you?'
              maxLines={12}
              style={{ height: screenHeight(18) }}
              textAlignVertical='top'
              error={formik.errors.message}
              touched={Boolean(formik.touched.message && formik.submitCount)}
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
