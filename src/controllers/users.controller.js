import { usersService } from "../services/index.js";
import { catchAsync, AppError } from "../utils/errorHandler.js";
import logger from "../utils/logger.js";
import __dirname from '../utils/index.js';
import path from 'path';


const getAllUsers = catchAsync(async (req, res) => {
    logger.info('Obteniendo todos los usuarios');
    const users = await usersService.getAll();

    logger.info(`Se obtuvieron ${users.length} usuarios exitosamente`);
    res.status(200).json({
        status: "success",
        results: users.length,
        payload: users
    });
});

const getUser = catchAsync(async (req, res) => {
    const userId = req.params.uid;
    logger.debug(`Buscando usuario con ID: ${userId}`);

    const user = await usersService.getUserById(userId);

    if (!user) {
        logger.warning(`Usuario no encontrado con ID: ${userId}`);
        throw new AppError("Usuario no encontrado", 404);
    }

    logger.info(`Usuario encontrado exitosamente: ${user.email}`);
    res.status(200).json({
        status: "success",
        payload: user
    });
});

const updateUser = catchAsync(async (req, res) => {
    const updateBody = req.body;
    const userId = req.params.uid;

    const user = await usersService.getUserById(userId);
    if (!user) {
        throw new AppError("Usuario no encontrado", 404);
    }

    const result = await usersService.update(userId, updateBody);
    res.status(200).json({
        status: "success",
        message: "Usuario actualizado exitosamente"
    });
});

const deleteUser = catchAsync(async (req, res) => {
    const userId = req.params.uid;

    const user = await usersService.getUserById(userId);
    if (!user) {
        throw new AppError("Usuario no encontrado", 404);
    }

    await usersService.delete(userId);
    res.status(200).json({
        status: "success",
        message: "Usuario eliminado exitosamente"
    });
});

const uploadDocuments = catchAsync(async (req, res) => {
    const userId = req.params.uid;
    const files = req.files;

    if (!files || files.length === 0) return res.status(400).send({ status: 'error', error: 'No files uploaded' });

    const user = await usersService.getUserById(userId);
    if (!user) throw new AppError('Usuario no encontrado', 404);

    const newDocs = files.map(f => ({
        name: f.originalname,
        reference: path.join(__dirname, '..', 'public', 'documents', f.filename)
    }));

    const updatedDocs = Array.isArray(user.documents) ? user.documents.concat(newDocs) : newDocs;

    await usersService.update(userId, { documents: updatedDocs });

    res.status(200).json({ status: 'success', payload: newDocs });
});

export default {
    deleteUser,
    getAllUsers,
    getUser,
    updateUser,
    uploadDocuments
}



