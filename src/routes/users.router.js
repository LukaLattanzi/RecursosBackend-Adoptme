import { Router } from 'express';
import usersController from '../controllers/users.controller.js';
import uploader from '../utils/uploader.js';

const router = Router();

router.get('/', usersController.getAllUsers);

router.get('/:uid', usersController.getUser);
router.put('/:uid', usersController.updateUser);
router.delete('/:uid', usersController.deleteUser);

// Subir uno o múltiples documentos para un usuario
router.post('/:uid/documents', uploader.array('documents', 10), usersController.uploadDocuments);

export default router;