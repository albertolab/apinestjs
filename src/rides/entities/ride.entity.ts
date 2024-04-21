export enum RIDE_STATUS {
  pending = 'pending',
  inProgress = 'inProgress',
  finished = 'finished',
  canceled = 'canceled',
}

export class Ride {
  id: number;
  busLicensePlate: string;
  busDriver: {
    firstName: string;
    lastName: string;
  };
  origin: {
    lat: number;
    long: number;
    name: string;
  };
  destination: {
    lat: number;
    long: number;
    name: string;
  };
  price: number;
  distance: number;
  status: RIDE_STATUS;
}
