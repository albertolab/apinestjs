import { Test, TestingModule } from '@nestjs/testing';
import { RidesService } from './rides.service';
import { CreateRideDto } from './dto/createRideDTO';
import { RIDE_STATUS, Ride } from './entities/ride.entity';
import { NotFoundException } from '@nestjs/common';

describe('RidesService Default', () => {
  let service: RidesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RidesService],
    }).compile();

    service = module.get<RidesService>(RidesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

describe('RidesService', () => {
  let service: RidesService;

  beforeEach(() => {
    service = new RidesService();
  });

  it('test_create_ride_success', () => {
    const createRideDto: CreateRideDto = {
      busLicensePlate: 'XYZ123',
      price: 100,
      origin: { lat: 34.0522, long: -118.2437, name: 'Los Angeles' },
      destination: { lat: 40.7128, long: -74.006, name: 'New York' },
    };
    const newRide = service.create(createRideDto);
    expect(newRide).toBeDefined();
    expect(newRide.id).toBeGreaterThan(0);
    expect(newRide.status).toEqual(RIDE_STATUS.pending);
    expect(newRide.busLicensePlate).toEqual(createRideDto.busLicensePlate);
  });

  it('test_find_one_ride_non_existent_id', () => {
    const nonExistentId = 9999;
    expect(() => service.findOne(nonExistentId)).toThrow(NotFoundException);
  });

  it('test_remove_ride_success', () => {
    const ride: Ride = {
      id: 2,
      busLicensePlate: 'XYZ123',
      busDriver: { firstName: 'John', lastName: 'Doe' },
      origin: { lat: 34.0522, long: -118.2437, name: 'Los Angeles' },
      destination: { lat: 40.7128, long: -74.006, name: 'New York' },
      price: 100,
      distance: 3000,
      status: RIDE_STATUS.pending,
    };
    service.create(ride); // Adding a ride to be removed
    const result = service.remove(2);
    expect(result).toEqual({ message: 'Ride deleted successfully.' });
  });
});
