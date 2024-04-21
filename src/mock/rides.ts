import { RIDE_STATUS } from 'src/rides/entities/ride.entity';

export const dataRides = [
  {
    id: 1,
    busLicensePlate: 'HSI61DT',
    busDriver: {
      firstName: 'John',
      lastName: 'Doe',
    },
    origin: { lat: 10.4977177, long: -66.9389185, name: 'Origin' },
    destination: { lat: 10.4977177, long: -66.9389185, name: 'Destination' },
    price: 5,
    distance: 52,
    status: RIDE_STATUS.pending,
  },
];
