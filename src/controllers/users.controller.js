import { usersService } from "../services/index.js";
import { catchAsync, AppError } from "../utils/errorHandler.js";

const getAllUsers = catchAsync(async (req, res) => {
    const users = await usersService.getAll();
    res.status(200).json({
        status: "success",
        results: users.length,
        payload: users
    });
});

const getUser = catchAsync(async (req, res) => {
    const userId = req.params.uid;
    const user = await usersService.getUserById(userId);

    if (!user) {
        throw new AppError("Usuario no encontrado", 404);
    }

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

export default {
    deleteUser,
    getAllUsers,
    getUser,
    updateUser
}