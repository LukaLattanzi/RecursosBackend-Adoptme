import { faker } from '@faker-js/faker';

// Configurar faker en español (versión actualizada)
faker.locale = 'es';

/**
 * Generador de usuarios mock
 */
export const generateUser = () => {
    const numOfPets = faker.number.int({ min: 0, max: 5 });

    return {
        _id: faker.database.mongodbObjectId(),
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        role: faker.helpers.arrayElement(['user', 'admin']),
        pets: Array.from({ length: numOfPets }, () => faker.database.mongodbObjectId())
    };
};

/**
 * Generador de mascotas mock
 */
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
        birthDate: faker.date.past({ years: 10 }), // Mascotas de hasta 10 años
        adopted: false,
        owner: null,
        image: `https://via.placeholder.com/300x300?text=${faker.helpers.arrayElement(petTypes)}`
    };
};

/**
 * Generador de adopciones mock
 */
export const generateAdoption = () => {
    return {
        _id: faker.database.mongodbObjectId(),
        owner: faker.database.mongodbObjectId(),
        pet: faker.database.mongodbObjectId(),
        adoptionDate: faker.date.recent({ days: 30 }) // Adopciones de los últimos 30 días
    };
};

/**
 * Generador de múltiples usuarios
 */
export const generateUsers = (num = 50) => {
    return Array.from({ length: num }, generateUser);
};

/**
 * Generador de múltiples mascotas
 */
export const generatePets = (num = 50) => {
    return Array.from({ length: num }, generatePet);
};

/**
 * Generador de múltiples adopciones
 */
export const generateAdoptions = (num = 20) => {
    return Array.from({ length: num }, generateAdoption);
};