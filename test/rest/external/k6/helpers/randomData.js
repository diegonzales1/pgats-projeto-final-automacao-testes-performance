import faker from 'k6/x/faker';

export function randomAluno() {
  return {
    nome: `${faker.person.firstName()} ${faker.person.lastName()}`,
    idade: faker.numbers.number(12, 62),
    telefone: `${faker.numbers.number(10, 99)}-${faker.numbers.number(
      100000000,
      999999999,
    )}`,
    endereco: `${faker.address.city()}, ${faker.address.streetNumber()}`,
  };
}
