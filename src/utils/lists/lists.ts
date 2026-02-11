import type { Car, List } from '@/types';

export const hydrateCarsForList = (
  list: List,
  carsById: Map<string, Car>
): Car[] =>
  list.cars.map(id => carsById.get(id)).filter((c): c is Car => Boolean(c));
