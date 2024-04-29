import { Router } from 'express'
import * as userController from './controller/user.js';
import * as userValidators from './user.validation.js'
import { auth } from './../../middleware/auth.js';
import { validation } from './../../middleware/validation.js';

const router = Router();

router.patch('/delete/:id', validation(userValidators.softDeleteProfile), auth(), userController.softDeleteProfile);
router.get('/logout', validation(userValidators.SignOut), auth(), userController.SignOut)
router.get('/profile', auth(), userController.getProfile);
router.get('/:id', validation(userValidators.getUserByID), auth(), userController.getUserByID);
router.get('/', auth(), userController.getUsers);
router.patch('/block', validation(userValidators.blockUser), auth(), userController.blockUser);
router.patch('/:id', validation(userValidators.makeAdmin), auth(), userController.makeAdmin);

export default router;