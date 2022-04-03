import { faker } from '@faker-js/faker';

export function getRandomMessage() {
  const sentences = new Array(faker.datatype.number({ min: 1, max: 10 }))
    .fill(null)
    .map(() => faker.random.words(faker.datatype.number({ min: 5, max: 10 })));
  return sentences.join('\n');
}
