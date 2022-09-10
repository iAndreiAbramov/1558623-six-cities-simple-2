import { FIRST_WEEK_DAY, LAST_WEEK_DAY } from '../constants/common.constants';
import dayjs from 'dayjs';

export const getRandomInteger = (min: number, max: number): number => {
  let startValue = Math.ceil(Math.min(min, max));
  let endValue = Math.floor(Math.max(min, max));
  startValue -= 0.5;
  endValue += 0.5;
  const randomInteger = startValue + Math.random() * (endValue - startValue);
  return Math.round(randomInteger);
};

export const getRandomFloat = (min: number, max: number, decimals: number) => {
  const startValue = Math.min(min, max);
  const endValue = Math.max(min, max);
  const randomInteger = startValue + Math.random() * (endValue - startValue);
  return +randomInteger.toFixed(decimals);
};

export const getRandomBoolean = () => !!getRandomInteger(0, 1);

export const getRandomArrayItem = <T>(array: T[]): T =>
  array[getRandomInteger(0, array.length - 1)];

export const getRandomArrayItems = <T>(
  array: T[],
  itemsNumber: number,
): T[] => {
  if (itemsNumber >= array.length) {
    return array;
  }

  const arrayCopy = [...array];
  const result: T[] = [];

  for (let i = 1; i <= itemsNumber; i++) {
    const randomIndex = getRandomInteger(0, arrayCopy.length - 1);
    result.push(...arrayCopy.splice(randomIndex, 1));
  }

  return result;
};

export const getRandomDate = () =>
  dayjs()
    .subtract(getRandomInteger(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day')
    .toISOString();
