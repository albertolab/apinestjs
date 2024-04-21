import { Ride, RIDE_STATUS } from './ride.entity';

describe('Ride Class', () => {
  it('should correctly initialize with all properties set, including nested objects and enums', () => {
    const ride = new Ride();
    ride.id = 1;
    ride.busLicensePlate = 'XYZ-1234';
    ride.busDriver = { firstName: 'John', lastName: 'Doe' };
    ride.origin = { lat: 34.0522, long: -118.2437, name: 'Los Angeles' };
    ride.destination = { lat: 40.7128, long: -74.006, name: 'New York' };
    ride.price = 299.99;
    ride.distance = 3940;
    ride.status = RIDE_STATUS.pending;

    expect(ride.id).toEqual(1);
    expect(ride.busLicensePlate).toEqual('XYZ-1234');
    expect(ride.busDriver.firstName).toEqual('John');
    expect(ride.busDriver.lastName).toEqual('Doe');
    expect(ride.origin.lat).toEqual(34.0522);
    expect(ride.origin.long).toEqual(-118.2437);
    expect(ride.origin.name).toEqual('Los Angeles');
    expect(ride.destination.lat).toEqual(40.7128);
    expect(ride.destination.long).toEqual(-74.006);
    expect(ride.destination.name).toEqual('New York');
    expect(ride.price).toEqual(299.99);
    expect(ride.distance).toEqual(3940);
    expect(ride.status).toEqual(RIDE_STATUS.pending);
  });

  it('should correctly handle edge cases for geographical coordinates, such as coordinates being on the boundary values of latitude and longitude', () => {
    const ride = new Ride();
    ride.origin = { lat: 90, long: 180, name: 'North-East Corner' };
    ride.destination = { lat: -90, long: -180, name: 'South-West Corner' };

    expect(ride.origin.lat).toEqual(90);
    expect(ride.origin.long).toEqual(180);
    expect(ride.origin.name).toEqual('North-East Corner');
    expect(ride.destination.lat).toEqual(-90);
    expect(ride.destination.long).toEqual(-180);
    expect(ride.destination.name).toEqual('South-West Corner');
  });
});
