import { Test, TestingModule } from '@nestjs/testing';
import { RidesController } from './rides.controller';
import { RidesService } from './rides.service';
import { BadRequestException } from '@nestjs/common';
import { CreateRideDto } from './dto/createRideDTO';
import { RIDE_STATUS } from './entities/ride.entity';

describe('RidesController Default Tests', () => {
  let controller: RidesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RidesController],
      providers: [RidesService],
    }).compile();

    controller = module.get<RidesController>(RidesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

describe('RidesController', () => {
  let controller: RidesController;
  let service: RidesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RidesController],
      providers: [
        {
          provide: RidesService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            findAllByStatus: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<RidesController>(RidesController);
    service = module.get<RidesService>(RidesService);
  });

  it('test_create_ride_with_valid_data', async () => {
    const createRideDto: CreateRideDto = {
      busLicensePlate: 'ABC123',
      price: 100,
      origin: { lat: 34.0522, long: -118.2437, name: 'Los Angeles' },
      destination: { lat: 40.7128, long: -74.006, name: 'Los Angeles' },
    };
    const result = {
      id: 1,
      ...createRideDto,
      status: RIDE_STATUS.pending,
      distance: 5,
      busDriver: {
        firstName: 'test',
        lastName: 'test',
      },
    };
    jest.spyOn(service, 'create').mockImplementation(() => result);

    expect(await controller.createRide(createRideDto)).toBe(result);
  });

  it('test_find_one_ride_by_id_with_non_numeric', () => {
    const invalidId: any = 'abc';
    expect(() => controller.findOneRideById(invalidId)).toThrow(
      BadRequestException,
    );
  });

  it('test_find_rides_by_status_with_invalid_status', () => {
    const invalidStatus = 'unknown';
    expect(() => controller.findRidesByStatus(invalidStatus as any)).toThrow(
      BadRequestException,
    );
  });
});
