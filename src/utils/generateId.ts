import { Ride } from 'src/rides/entities/ride.entity';

export const generateId = (array: Ride[]): number => {
  let maxValueId: number = Math.max(...array.map((ride) => ride.id));
  return maxValueId + 1;
};
