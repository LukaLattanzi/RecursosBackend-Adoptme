import { adoptionsService, petsService, usersService } from "../services/index.js"
import { catchAsync, AppError } from "../utils/errorHandler.js"

const getAllAdoptions = catchAsync(async (req, res) => {
    const result = await adoptionsService.getAll();
    res.send({ status: "success", payload: result })
});

const getAdoption = catchAsync(async (req, res) => {
    const adoptionId = req.params.aid;
    const adoption = await adoptionsService.getBy({ _id: adoptionId })
    if (!adoption) {
        throw new AppError("Adoption not found", 404);
    }
    res.send({ status: "success", payload: adoption })
});

const createAdoption = catchAsync(async (req, res) => {
    const { uid, pid } = req.params;
    const user = await usersService.getUserById(uid);
    if (!user) {
        throw new AppError("user Not found", 404);
    }
    const pet = await petsService.getBy({ _id: pid });
    if (!pet) {
        throw new AppError("Pet not found", 404);
    }
    if (pet.adopted) {
        throw new AppError("Pet is already adopted", 400);
    }
    user.pets.push(pet._id);
    await usersService.update(user._id, { pets: user.pets })
    await petsService.update(pet._id, { adopted: true, owner: user._id })
    await adoptionsService.create({ owner: user._id, pet: pet._id })
    res.send({ status: "success", message: "Pet adopted" })
});

export default {
    createAdoption,
    getAllAdoptions,
    getAdoption
}