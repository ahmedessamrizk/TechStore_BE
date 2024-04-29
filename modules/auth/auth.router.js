import { Router } from 'express'
import * as authController from './controller/auth.js';
import { validation } from './../../middleware/validation.js';
import * as authValidators from './auth.validation.js';

const router = Router();

router.post('/signup', validation(authValidators.SignUp), authController.SignUp)
router.post('/signin', validation(authValidators.SignIn), authController.SignIn);

export default router;