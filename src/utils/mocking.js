import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';

faker.locale = 'es';

export const generateUser = () => {
    const hashedPassword = bcrypt.hashSync('coder123', 10);

    return {
        _id: faker.database.mongodbObjectId(),
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        password: hashedPassword,
        role: faker.helpers.arrayElement(['user', 'admin']),
        pets: []
    };
};

export const generatePet = () => {
    const petTypes = ['dog', 'cat', 'bird', 'rabbit', 'hamster', 'fish'];
    const petNames = [
        'Max', 'Bella', 'Charlie', 'Luna', 'Cooper', 'Lucy',
        'Rocky', 'Daisy', 'Buddy', 'Molly', 'Bear', 'Sadie'
    ];

    return {
        _id: faker.database.mongodbObjectId(),
        name: faker.helpers.arrayElement(petNames),
        specie: faker.helpers.arrayElement(petTypes),
        birthDate: faker.date.past({ years: 10 }),
        adopted: false,
        owner: null,
        image: `https://via.placeholder.com/300x300?text=${faker.helpers.arrayElement(petTypes)}`
    };
};

export const generateAdoption = () => {
    return {
        _id: faker.database.mongodbObjectId(),
        owner: faker.database.mongodbObjectId(),
        pet: faker.database.mongodbObjectId(),
        adoptionDate: faker.date.recent({ days: 30 })
    };
};

export const generateUsers = (num = 50) => {
    return Array.from({ length: num }, generateUser);
};

export const generatePets = (num = 50) => {
    return Array.from({ length: num }, generatePet);
};

export const generateAdoptions = (num = 20) => {
    return Array.from({ length: num }, generateAdoption);
};