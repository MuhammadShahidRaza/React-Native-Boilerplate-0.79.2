import { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Icon, Input, Photo, RowComponent, Typography, Wrapper } from 'components/index';
import {
  MotivaultGradientButton,
  MotivaultScreenBackground,
} from 'components/appComponents/motivault';
import { IMAGES } from 'constants/assets';
import { VARIABLES } from 'constants/common';
import { SCREENS } from 'constants/routes';
import { navigate } from 'navigation/index';
import { FontSize, FontWeight } from 'types/fontTypes';
import { COLORS, STYLES } from 'utils/index';

const VEHICLES = [
  {
    vehicleId: '1',
    name: '2026 Maserati Ghibli',
    vin: 'ZNAM57DS3600001',
    miles: '10,450',
    image: IMAGES.CAR_ONE,
  },
  {
    vehicleId: '2',
    name: '2026 Ferrari',
    vin: 'ZNAM57DS3600001',
    miles: '19,450',
    image: IMAGES.CAR_TWO,
  },
  {
    vehicleId: '3',
    name: '2026 Lamborghini',
    vin: 'ZNAM57DS3600001',
    miles: '50,450',
    image: IMAGES.CAR_THREE,
  },
];

export const Vehicles = () => {
  const [search, setSearch] = useState('');

  const filtered = VEHICLES.filter(
    v =>
      v.name.toLowerCase().includes(search.toLowerCase()) ||
      v.vin.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <MotivaultScreenBackground>
      <Wrapper
        headerTitle='My Vehicles'
        showBackButton={false}
        useScrollView
        safeAreaEdges={['top', 'bottom']}
        backgroundColor={COLORS.TRANSPARENT}
        headerEndIcon={() => (
          <TouchableOpacity onPress={() => navigate(SCREENS.ADD_VEHICLE)} hitSlop={8}>
            <Icon
              componentName={VARIABLES.Ionicons}
              iconName='add-circle-outline'
              size={26}
              color={COLORS.ACCENT_GREEN}
            />
          </TouchableOpacity>
        )}
      >
        <View style={[STYLES.CONTAINER, styles.content]}>
          <Input
            name='vehicleSearch'
            value={search}
            onChangeText={setSearch}
            placeholder='Search by name or VIN'
            startIcon={{
              componentName: VARIABLES.Ionicons,
              iconName: 'search-outline',
              color: COLORS.TEXT_SECONDARY,
              size: FontSize.MediumLarge,
            }}
            secondContainerStyle={styles.searchInput}
            titleStyle={styles.hiddenTitle}
          />

          <MotivaultGradientButton
            title='+ Add Vehicle'
            variant='green'
            onPress={() => navigate(SCREENS.ADD_VEHICLE)}
            style={styles.addButton}
          />

          {filtered.map(vehicle => (
            <TouchableOpacity
              key={vehicle.vehicleId}
              style={styles.card}
              activeOpacity={0.85}
              onPress={() =>
                navigate(SCREENS.VEHICLE_DETAILS, {
                  vehicleId: vehicle.vehicleId,
                  name: vehicle.name,
                  vin: vehicle.vin,
                  miles: vehicle.miles,
                })
              }
            >
              <Photo
                source={vehicle.image}
                imageStyle={styles.vehicleImage}
                borderRadius={12}
              />
              <View style={styles.cardBody}>
                <Typography translate={false} style={styles.vehicleName}>
                  {vehicle.name}
                </Typography>
                <Typography translate={false} style={styles.meta}>
                  {`VIN: ${vehicle.vin}`}
                </Typography>
                <RowComponent style={styles.milesRow}>
                  <Typography translate={false} style={styles.meta}>
                    {`${vehicle.miles} mi`}
                  </Typography>
                  <Icon
                    componentName={VARIABLES.Ionicons}
                    iconName='chevron-forward'
                    size={18}
                    color={COLORS.TEXT_SECONDARY}
                  />
                </RowComponent>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </Wrapper>
    </MotivaultScreenBackground>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingBottom: 24,
  },
  searchInput: {
    backgroundColor: COLORS.INPUT_DARK,
    borderColor: COLORS.TRANSPARENT,
    marginBottom: 16,
  },
  hiddenTitle: {
    display: 'none',
  },
  addButton: {
    marginBottom: 20,
  },
  card: {
    backgroundColor: COLORS.CARD_DARK,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 14,
  },
  vehicleImage: {
    width: '100%',
    height: 140,
  },
  cardBody: {
    padding: 16,
  },
  vehicleName: {
    color: COLORS.WHITE,
    fontSize: FontSize.MediumLarge,
    fontWeight: FontWeight.Bold,
    marginBottom: 6,
  },
  meta: {
    color: COLORS.TEXT_SECONDARY,
    fontSize: FontSize.Small,
  },
  milesRow: {
    marginTop: 8,
  },
});
