import { generateUser, generatePet, generateAdoption, generateUsers, generatePets } from './src/utils/mocking.js';

/**
 * Archivo de pruebas para validar el módulo de mocking
 */

console.log('🧪 Pruebas del Módulo de Mocking\n');

// Prueba 1: Generar un usuario
console.log('1. Generando un usuario de prueba:');
const sampleUser = generateUser();
console.log(JSON.stringify(sampleUser, null, 2));

console.log('\n' + '='.repeat(50) + '\n');

// Prueba 2: Generar una mascota
console.log('2. Generando una mascota de prueba:');
const samplePet = generatePet();
console.log(JSON.stringify(samplePet, null, 2));

console.log('\n' + '='.repeat(50) + '\n');

// Prueba 3: Generar una adopción
console.log('3. Generando una adopción de prueba:');
const sampleAdoption = generateAdoption();
console.log(JSON.stringify(sampleAdoption, null, 2));

console.log('\n' + '='.repeat(50) + '\n');

// Prueba 4: Generar múltiples registros
console.log('4. Generando 5 usuarios:');
const multipleUsers = generateUsers(5);
console.log(`Total de usuarios generados: ${multipleUsers.length}`);
console.log('Primeros 2 usuarios:');
console.log(JSON.stringify(multipleUsers.slice(0, 2), null, 2));

console.log('\n' + '='.repeat(50) + '\n');

// Prueba 5: Generar múltiples mascotas
console.log('5. Generando 10 mascotas:');
const multiplePets = generatePets(10);
console.log(`Total de mascotas generadas: ${multiplePets.length}`);
console.log('Especies encontradas:', [...new Set(multiplePets.map(pet => pet.specie))]);

console.log('\n✅ Todas las pruebas del módulo de mocking completadas!');