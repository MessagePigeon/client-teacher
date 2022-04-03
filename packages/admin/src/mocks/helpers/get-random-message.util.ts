import faker from '@faker-js/faker';
import { getRandomInt } from '../utils/get-random-int.util';

export function getRandomMessage() {
  const sentences = new Array(getRandomInt(1, 10))
    .fill(null)
    .map(() => faker.random.words(getRandomInt(5, 10)));
  return sentences.join('\n');
}
