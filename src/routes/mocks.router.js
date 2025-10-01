import { Router } from 'express';
import { generateUsers, generatePets, generateAdoptions } from '../utils/mocking.js';
import { catchAsync, AppError } from '../utils/errorHandler.js';

const router = Router();

/**
 * GET /api/mocks/mockingpets
 * Genera 100 mascotas de prueba
 */
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

/**
 * GET /api/mocks/mockingusers
 * Genera 50 usuarios de prueba
 */
router.get('/mockingusers', catchAsync(async (req, res) => {
    const users = generateUsers(50);
    res.status(200).json({
        status: 'success',
        results: users.length,
        data: {
            users
        }
    });
}));

/**
 * GET /api/mocks/generateData
 * Inserta datos de prueba en la base de datos
 */
router.post('/generateData', catchAsync(async (req, res) => {
    const { users: userCount = 50, pets: petCount = 100 } = req.body;

    // Validación de parámetros
    if (userCount > 1000 || petCount > 1000) {
        throw new AppError('No se pueden generar más de 1000 registros por tipo', 400);
    }

    const users = generateUsers(userCount);
    const pets = generatePets(petCount);

    // Aquí normalmente insertarías en la base de datos
    // Por ahora solo devolvemos la confirmación

    res.status(201).json({
        status: 'success',
        message: `Se generaron ${userCount} usuarios y ${petCount} mascotas`,
        data: {
            usersGenerated: userCount,
            petsGenerated: petCount,
            sampleUsers: users.slice(0, 5), // Muestra de 5 usuarios
            samplePets: pets.slice(0, 5)    // Muestra de 5 mascotas
        }
    });
}));

/**
 * GET /api/mocks/adoptions
 * Genera adopciones de prueba
 */
router.get('/adoptions', catchAsync(async (req, res) => {
    const { count = 20 } = req.query;
    const numAdoptions = Math.min(parseInt(count), 100); // Máximo 100

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