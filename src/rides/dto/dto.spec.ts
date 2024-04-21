import { plainToInstance, instanceToPlain } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { CreateRideDto, LocationDto } from './createRideDTO';

describe('LocationDto Class', () => {
  it('should correctly initialize and store latitude, longitude, and name properties with valid types', async () => {
    const location = new LocationDto();
    location.lat = 34.0522;
    location.long = -118.2437;
    location.name = 'Los Angeles';

    expect(location.lat).toEqual(34.0522);
    expect(location.long).toEqual(-118.2437);
    expect(location.name).toEqual('Los Angeles');
  });

  it('should throw or handle errors when invalid data types are provided for its properties', async () => {
    const location = new LocationDto();
    location.lat = 'not-a-number' as any;
    location.long = 'not-a-number' as any;
    location.name = 123 as any;

    const errors: ValidationError[] = await validate(location);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should serialize and deserialize correctly using class-transformer', () => {
    const location = new LocationDto();
    location.lat = 34.0522;
    location.long = -118.2437;
    location.name = 'Los Angeles';

    const json = instanceToPlain(location);
    const newLocation = plainToInstance(LocationDto, json);

    expect(newLocation.lat).toEqual(34.0522);
    expect(newLocation.long).toEqual(-118.2437);
    expect(newLocation.name).toEqual('Los Angeles');
  });
});

describe('CreateRideDto', () => {
  it('test_create_ride_dto_with_valid_data', async () => {
    const origin = new LocationDto();
    origin.lat = 34.0522;
    origin.long = -118.2437;
    origin.name = 'Los Angeles';

    const destination = new LocationDto();
    destination.lat = 40.7128;
    destination.long = -74.006;
    destination.name = 'New York';

    const dto = new CreateRideDto();
    dto.busLicensePlate = 'ABC123';
    dto.price = 150;
    dto.origin = origin;
    dto.destination = destination;

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('test_create_ride_dto_with_invalid_types', async () => {
    const dto = new CreateRideDto();
    dto.busLicensePlate = 123 as any; // Invalid type
    dto.price = '150' as any; // Invalid type

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('test_create_ride_dto_with_nested_location_dto', async () => {
    const origin = new LocationDto();
    origin.lat = '34.0522' as any; // Invalid type
    origin.long = -118.2437;
    origin.name = 123 as any; // Invalid type

    const destination = new LocationDto();
    destination.lat = 40.7128;
    destination.long = '74.0060' as any; // Invalid type
    destination.name = 'New York';

    const dto = new CreateRideDto();
    dto.busLicensePlate = 'XYZ789';
    dto.price = 200;
    dto.origin = origin;
    dto.destination = destination;

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });
});
