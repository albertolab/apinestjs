import { BadRequestException } from '@nestjs/common';

export const validateIdIsNumber = (id: number) => {
  if (isNaN(id)) throw new BadRequestException('id must be a number');
};
