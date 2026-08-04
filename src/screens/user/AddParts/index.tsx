import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Input, Photo, Typography, Wrapper } from 'components/index';
import {
  MotivaultGradientButton,
  MotivaultScreenBackground,
} from 'components/appComponents/motivault';
import { FocusProvider, useFormikForm, useAsyncButton } from 'hooks/index';
import { FontSize } from 'types/fontTypes';
import { COLORS, addPartsSchema, screenHeight, screenWidth } from 'utils/index';
import { onBack } from 'navigation/index';
import { useMediaPicker } from 'hooks/useMediaPicker';

interface AddPartsFormValues {
  part_name: string;
  part_number: string;
  manufacturer: string;
  category: string;
  vehicle: string;
  install_date: string;
  warranty_months: string;
  warranty_expiry: string;
  purchase_price: string;
  vendor: string;
  notes: string;
}

export const AddParts = () => {
  const { pickMedia } = useMediaPicker();
  const [receiptUri, setReceiptUri] = useState<string | null>(null);

  const initialValues: AddPartsFormValues = {
    part_name: '',
    part_number: '',
    manufacturer: '',
    category: '',
    vehicle: '',
    install_date: '',
    warranty_months: '',
    warranty_expiry: '',
    purchase_price: '',
    vendor: '',
    notes: '',
  };

  const handleSubmit = async (_values: AddPartsFormValues) => {
    onBack();
  };

  const formik = useFormikForm<AddPartsFormValues>({
    initialValues,
    validationSchema: addPartsSchema,
    onSubmit: handleSubmit,
  });

  const { loading, onPress } = useAsyncButton(formik);

  const renderField = (
    name: keyof AddPartsFormValues,
    title: string,
    placeholder: string,
    options?: { keyboardType?: 'default' | 'numeric'; multiline?: boolean },
  ) => (
    <Input
      name={name}
      title={title}
      onChangeText={formik.handleChange(name)}
      onBlur={formik.handleBlur(name)}
      value={formik.values[name]}
      placeholder={placeholder}
      keyboardType={options?.keyboardType}
      maxLines={options?.multiline ? 8 : undefined}
      style={options?.multiline ? { height: screenHeight(12) } : undefined}
      textAlignVertical={options?.multiline ? 'top' : undefined}
      error={formik.errors[name]}
      touched={Boolean(formik.touched[name] && formik.submitCount)}
      titleStyle={styles.inputTitle}
      secondContainerStyle={styles.inputBox}
    />
  );

  const handleReceiptPick = async () => {
    const media = await pickMedia({ mediaType: 'image', cropping: false });
    if (media?.[0]?.uri) setReceiptUri(media[0].uri);
  };

  return (
    <MotivaultScreenBackground>
      <Wrapper useScrollView headerTitle='Add Parts / Warranty' backgroundColor={COLORS.BLACK}>
        <View style={styles.container}>
          <FocusProvider>
            {renderField('part_name', 'Part Name', 'e.g. Ceramic Brake Pads')}
            {renderField('part_number', 'Part Number', 'Manufacturer part number')}
            {renderField('manufacturer', 'Manufacturer', 'e.g. Brembo')}
            {renderField('category', 'Category', 'e.g. Brakes, Engine, Suspension')}
            {renderField('vehicle', 'Linked Vehicle', 'e.g. 2021 Porsche 911')}
            {renderField('install_date', 'Install Date', 'MM/DD/YYYY')}
            {renderField('warranty_months', 'Warranty Period (months)', 'e.g. 24', {
              keyboardType: 'numeric',
            })}
            {renderField('warranty_expiry', 'Warranty Expiry Date', 'MM/DD/YYYY')}
            {renderField('purchase_price', 'Purchase Price', 'e.g. 1299.00', {
              keyboardType: 'numeric',
            })}
            {renderField('vendor', 'Vendor / Shop', 'Where the part was purchased')}
            {renderField('notes', 'Notes', 'Additional warranty or install details', {
              multiline: true,
            })}

            <Typography translate={false} style={styles.uploadLabel}>
              Receipt / Invoice
            </Typography>
            <Photo
              source={receiptUri}
              size={screenWidth(88)}
              borderRadius={12}
              onPress={handleReceiptPick}
              containerStyle={styles.receiptBox}
              resizeMode='cover'
            />
          </FocusProvider>

          <MotivaultGradientButton
            title='Save Warranty'
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
  uploadLabel: {
    color: COLORS.WHITE,
    fontSize: FontSize.MediumSmall,
    marginBottom: 8,
    marginTop: 4,
  },
  receiptBox: {
    backgroundColor: COLORS.INPUT_DARK,
    alignSelf: 'center',
    marginBottom: 8,
    minHeight: 140,
    overflow: 'hidden',
  },
  button: {
    marginTop: 28,
  },
});
