import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  BadRequestException,
} from '@nestjs/common';
import { RidesService } from './rides.service';
import { CreateRideDto } from './dto/createRideDTO';
import { UpdateRideDto } from './dto/updateRideDTO';
import { validateIdIsNumber } from 'src/utils/validateId';
import { RIDE_STATUS } from './entities/ride.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('rides')
@Controller('rides')
export class RidesController {
  constructor(private readonly ridesService: RidesService) {}

  @Post()
  createRide(@Body() createRideDto: CreateRideDto) {
    return this.ridesService.create(createRideDto);
  }

  @Get()
  findAllRides() {
    return this.ridesService.findAll();
  }

  @Get(':id')
  findOneRideById(@Param('id') id: number) {
    validateIdIsNumber(id);
    return this.ridesService.findOne(+id);
  }

  @Get('/status/:status')
  findRidesByStatus(@Param('status') status: RIDE_STATUS) {
    const status_values = Object.values(RIDE_STATUS);
    if (!status_values.includes(status))
      throw new BadRequestException(
        `Please specify a valid status: ${status_values} `,
      );
    return this.ridesService.findAllByStatus(status);
  }

  @Patch(':id')
  updateRide(@Param('id') id: number, @Body() updateRideDto: UpdateRideDto) {
    validateIdIsNumber(id);
    return this.ridesService.update(+id, updateRideDto);
  }

  @Delete(':id')
  removeRide(@Param('id') id: number) {
    validateIdIsNumber(id);
    return this.ridesService.remove(+id);
  }
}
