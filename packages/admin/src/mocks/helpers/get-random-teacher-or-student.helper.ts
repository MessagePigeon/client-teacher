import faker from '@faker-js/faker';

const baseTeachers = new Array(25)
  .fill(null)
  .map(() => ({ id: faker.datatype.uuid(), name: faker.name.firstName() }));
const baseStudents = new Array(25).fill(null).map(() => ({
  id: faker.datatype.uuid(),
  defaultRemark: faker.name.firstName(),
}));

export function getRandomTeacher() {
  return baseTeachers[faker.datatype.number({ min: 0, max: 20 })];
}

export function getRandomTeachers() {
  return new Array(faker.datatype.number({ min: 1, max: 20 }))
    .fill(null)
    .map((_, index) => baseTeachers[index]);
}

export function getRandomStudents() {
  return new Array(faker.datatype.number({ min: 1, max: 20 }))
    .fill(null)
    .map((_, index) => baseStudents[index]);
}
