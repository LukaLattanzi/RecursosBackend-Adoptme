import { Router } from 'express';
import { generateUsers, generatePets, generateAdoptions } from '../utils/mocking.js';
import { catchAsync, AppError } from '../utils/errorHandler.js';
import { usersService, petsService } from '../services/index.js';
import logger from '../utils/logger.js';

const router = Router();

router.get('/mockingpets', catchAsync(async (req, res) => {
    const pets = generatePets(100);
    res.status(200).json({
        status: 'success',
        results: pets.length,
        data: {
            pets
        }
    });
}));

router.get('/mockingusers', catchAsync(async (req, res) => {
    logger.info('Generando 50 usuarios mock');
    const users = generateUsers(50);

    res.status(200).json({
        status: 'success',
        results: users.length,
        data: {
            users
        }
    });
}));

router.post('/generateData', catchAsync(async (req, res) => {
    const { users: userCount = 50, pets: petCount = 100 } = req.body;

    if (userCount > 1000 || petCount > 1000) {
        throw new AppError('No se pueden generar más de 1000 registros por tipo', 400);
    }

    if (userCount < 0 || petCount < 0) {
        throw new AppError('Los parámetros deben ser números positivos', 400);
    }

    logger.info(`Iniciando generación de ${userCount} usuarios y ${petCount} mascotas`);

    const usersData = generateUsers(userCount);
    const petsData = generatePets(petCount);

    const insertedUsers = [];
    for (const userData of usersData) {
        try {
            const user = await usersService.create(userData);
            insertedUsers.push(user);
        } catch (error) {
            logger.warning(`Error insertando usuario ${userData.email}:`, error.message);
        }
    }

    const insertedPets = [];
    for (const petData of petsData) {
        try {
            const pet = await petsService.create(petData);
            insertedPets.push(pet);
        } catch (error) {
            logger.warning(`Error insertando mascota ${petData.name}:`, error.message);
        }
    }

    logger.info(`Inserción completada: ${insertedUsers.length} usuarios y ${insertedPets.length} mascotas`);

    res.status(201).json({
        status: 'success',
        message: `Se insertaron ${insertedUsers.length} usuarios y ${insertedPets.length} mascotas en la base de datos`,
        data: {
            usersRequested: userCount,
            usersInserted: insertedUsers.length,
            petsRequested: petCount,
            petsInserted: insertedPets.length,
            sampleUsers: insertedUsers.slice(0, 3).map(u => ({
                id: u._id,
                email: u.email,
                role: u.role
            })),
            samplePets: insertedPets.slice(0, 3).map(p => ({
                id: p._id,
                name: p.name,
                specie: p.specie
            }))
        }
    });
}));

router.get('/adoptions', catchAsync(async (req, res) => {
    const { count = 20 } = req.query;
    const numAdoptions = Math.min(parseInt(count), 100);

    const adoptions = generateAdoptions(numAdoptions);

    res.status(200).json({
        status: 'success',
        results: adoptions.length,
        data: {
            adoptions
        }
    });
}));

export default router;