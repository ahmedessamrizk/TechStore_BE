import { Router } from 'express'
import * as productController from './controller/product.js'
import { auth } from './../../middleware/auth.js';
import { validation } from './../../middleware/validation.js';
import * as productValidators from './product.validation.js'
import { checkProfile } from './../../services/profile.js';

const router = Router();

router.post('/',validation(productValidators.addProduct) ,auth(),  productController.addProduct);
router.put('/:id',validation(productValidators.updateProduct), auth(), productController.updateProduct);
router.delete('/:id',validation(productValidators.deleteProduct), auth(), productController.deleteProduct);
router.get('/title',validation(productValidators.getProductsByTitle), productController.getProductByTitle)
router.get('/', productController.getProducts)


export default router;