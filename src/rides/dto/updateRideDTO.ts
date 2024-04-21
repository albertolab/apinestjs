import { PartialType } from '@nestjs/mapped-types';
import { CreateRideDto } from './createRideDTO';
import { RIDE_STATUS } from '../entities/ride.entity';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateRideDto extends PartialType(CreateRideDto) {
  @ApiProperty({ description: 'Status ride.', enum: RIDE_STATUS })
  @IsString()
  @IsOptional()
  @IsEnum(RIDE_STATUS)
  status: RIDE_STATUS;
}
