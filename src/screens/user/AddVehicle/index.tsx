import { StyleSheet, View } from 'react-native';
import { Input, Wrapper } from 'components/index';
import {
  MotivaultGradientButton,
  MotivaultScreenBackground,
} from 'components/appComponents/motivault';
import { VARIABLES } from 'constants/index';
import { FocusProvider, useFormikForm, useAsyncButton } from 'hooks/index';
import { FontSize } from 'types/fontTypes';
import { COLORS, addVehicleSchema } from 'utils/index';
import { onBack } from 'navigation/index';

interface AddVehicleFormValues {
  nickname: string;
  make: string;
  model: string;
  year: string;
  vin: string;
  mileage: string;
  color: string;
  license_plate: string;
}

export const AddVehicle = () => {
  const initialValues: AddVehicleFormValues = {
    nickname: '',
    make: '',
    model: '',
    year: '',
    vin: '',
    mileage: '',
    color: '',
    license_plate: '',
  };

  const handleSubmit = async (_values: AddVehicleFormValues) => {
    onBack();
  };

  const formik = useFormikForm<AddVehicleFormValues>({
    initialValues,
    validationSchema: addVehicleSchema,
    onSubmit: handleSubmit,
  });

  const { loading, onPress } = useAsyncButton(formik);

  const renderField = (
    name: keyof AddVehicleFormValues,
    title: string,
    placeholder: string,
    options?: { keyboardType?: 'default' | 'numeric'; icon?: string },
  ) => (
    <Input
      name={name}
      title={title}
      onChangeText={formik.handleChange(name)}
      onBlur={formik.handleBlur(name)}
      value={formik.values[name]}
      placeholder={placeholder}
      keyboardType={options?.keyboardType}
      error={formik.errors[name]}
      touched={Boolean(formik.touched[name] && formik.submitCount)}
      startIcon={{
        componentName: VARIABLES.Ionicons,
        iconName: options?.icon ?? 'car-outline',
        color: COLORS.WHITE,
        size: FontSize.MediumLarge,
      }}
      titleStyle={styles.inputTitle}
      secondContainerStyle={styles.inputBox}
    />
  );

  return (
    <MotivaultScreenBackground>
      <Wrapper useScrollView headerTitle='Add Vehicle' backgroundColor={COLORS.BLACK}>
        <View style={styles.container}>
          <FocusProvider>
            {renderField('nickname', 'Vehicle Nickname', 'e.g. Daily Driver')}
            {renderField('make', 'Make', 'e.g. Porsche')}
            {renderField('model', 'Model', 'e.g. 911 Carrera')}
            {renderField('year', 'Year', 'e.g. 2021', { keyboardType: 'numeric', icon: 'calendar-outline' })}
            {renderField('vin', 'VIN', 'Enter 17-character VIN', { icon: 'barcode-outline' })}
            {renderField('mileage', 'Mileage', 'Current odometer reading', {
              keyboardType: 'numeric',
              icon: 'speedometer-outline',
            })}
            {renderField('color', 'Color', 'e.g. Guards Red', { icon: 'color-palette-outline' })}
            {renderField('license_plate', 'License Plate', 'Enter plate number', {
              icon: 'card-outline',
            })}
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
