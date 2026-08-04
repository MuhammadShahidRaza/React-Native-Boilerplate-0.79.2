import { StyleSheet, View } from 'react-native';
import { Checkbox, Input, Typography, Wrapper } from 'components/index';
import {
  MotivaultGradientButton,
  MotivaultScreenBackground,
} from 'components/appComponents/motivault';
import { VARIABLES } from 'constants/index';
import { FocusProvider, useFormikForm, useAsyncButton } from 'hooks/index';
import { FontSize } from 'types/fontTypes';
import { COLORS, initiateContinuitySchema, screenHeight } from 'utils/index';
import { onBack } from 'navigation/index';

interface InitiateContinuityFormValues {
  vehicle: string;
  case_type: string;
  new_owner_name: string;
  new_owner_email: string;
  new_owner_phone: string;
  relationship: string;
  description: string;
  confirmed: boolean;
}

export const InitiateContinuity = () => {
  const initialValues: InitiateContinuityFormValues = {
    vehicle: '',
    case_type: '',
    new_owner_name: '',
    new_owner_email: '',
    new_owner_phone: '',
    relationship: '',
    description: '',
    confirmed: false,
  };

  const handleSubmit = async (_values: InitiateContinuityFormValues) => {
    onBack();
  };

  const formik = useFormikForm<InitiateContinuityFormValues>({
    initialValues,
    validationSchema: initiateContinuitySchema,
    onSubmit: handleSubmit,
  });

  const { loading, onPress } = useAsyncButton(formik);

  const renderField = (
    name: keyof InitiateContinuityFormValues,
    title: string,
    placeholder: string,
    options?: { keyboardType?: 'default' | 'email-address' | 'phone-pad'; multiline?: boolean },
  ) => (
    <Input
      name={name}
      title={title}
      onChangeText={formik.handleChange(name)}
      onBlur={formik.handleBlur(name)}
      value={String(formik.values[name] ?? '')}
      placeholder={placeholder}
      keyboardType={options?.keyboardType}
      allowSpacing={options?.keyboardType !== 'email-address'}
      maxLines={options?.multiline ? 10 : undefined}
      style={options?.multiline ? { height: screenHeight(14) } : undefined}
      textAlignVertical={options?.multiline ? 'top' : undefined}
      error={formik.errors[name] as string}
      touched={Boolean(formik.touched[name] && formik.submitCount)}
      startIcon={{
        componentName: VARIABLES.Ionicons,
        iconName: 'document-text-outline',
        color: COLORS.WHITE,
        size: FontSize.MediumLarge,
      }}
      titleStyle={styles.inputTitle}
      secondContainerStyle={styles.inputBox}
    />
  );

  return (
    <MotivaultScreenBackground>
      <Wrapper useScrollView headerTitle='Initiate Continuity' backgroundColor={COLORS.BLACK}>
        <View style={styles.container}>
          <Typography translate={false} style={styles.intro}>
            Start an ownership continuity case to securely transfer vehicle records and verified
            documentation.
          </Typography>

          <FocusProvider>
            {renderField('vehicle', 'Select Vehicle', 'e.g. 2021 Porsche 911')}
            {renderField('case_type', 'Case Type', 'e.g. Sale, Estate, Gift')}
            {renderField('new_owner_name', 'New Owner Full Name', 'Enter full legal name')}
            {renderField('new_owner_email', 'New Owner Email', 'Enter email address', {
              keyboardType: 'email-address',
            })}
            {renderField('new_owner_phone', 'New Owner Phone', 'Enter phone number', {
              keyboardType: 'phone-pad',
            })}
            {renderField('relationship', 'Relationship to Current Owner', 'e.g. Buyer, Heir')}
            {renderField('description', 'Case Description', 'Describe the ownership transfer context', {
              multiline: true,
            })}

            <Checkbox
              label='I confirm the information provided is accurate'
              checked={formik.values.confirmed}
              onChange={checked => formik.setFieldValue('confirmed', checked)}
              color={COLORS.ACCENT_GREEN}
              labelStyle={styles.checkboxLabel}
              style={styles.checkbox}
            />
            {formik.touched.confirmed && formik.errors.confirmed ? (
              <Typography translate={false} style={styles.error}>
                {formik.errors.confirmed}
              </Typography>
            ) : null}
          </FocusProvider>

          <MotivaultGradientButton
            title='Submit Request'
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
  intro: {
    color: COLORS.TEXT_SECONDARY,
    fontSize: FontSize.MediumSmall,
    lineHeight: 22,
    marginBottom: 20,
  },
  inputTitle: {
    color: COLORS.WHITE,
  },
  inputBox: {
    backgroundColor: COLORS.INPUT_DARK,
    borderColor: 'transparent',
  },
  checkbox: {
    marginTop: 8,
    width: '100%',
  },
  checkboxLabel: {
    color: COLORS.WHITE,
    flex: 1,
  },
  error: {
    color: COLORS.ERROR,
    fontSize: FontSize.Small,
    marginTop: 4,
  },
  button: {
    marginTop: 28,
  },
});
