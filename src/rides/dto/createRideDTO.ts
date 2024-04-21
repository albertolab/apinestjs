import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsString, ValidateNested } from 'class-validator';

export class LocationDto {
  @ApiProperty({ description: 'Location latitude.' })
  @IsNumber()
  lat: number;

  @ApiProperty({ description: 'Location longitude.' })
  @IsNumber()
  long: number;

  @ApiProperty({ description: 'A name for the location.' })
  @IsString()
  name: string;
}

export class CreateRideDto {
  @ApiProperty({
    description:
      'The bus license plate, in order to know the bus and driver in db.',
  })
  @IsString()
  busLicensePlate: string;

  @ApiProperty({ description: 'The price for this ride.' })
  @IsNumber()
  price: number;

  @ApiProperty({ description: 'Origin point.' })
  @ValidateNested({ each: true })
  @Type(() => LocationDto)
  origin: LocationDto;

  @ApiProperty({ description: 'Destination point.' })
  @ValidateNested({ each: true })
  @Type(() => LocationDto)
  destination: LocationDto;
}
