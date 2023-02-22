/**
 * Example of user routes
 */

const userController = require('../../controllers/users/user.controller');
const validate = require('../../middlewares/validate.middleware');
const userValidation = require('../../validations/user.validations');

const router = require('express').Router();

router
  .route('/')
  .get(userController.getUsers)
  .post(validate(userValidation.createUser), userController.createUser);

router
  .route('/:userId')
  .get(userController.getUser)
  .put(validate(userValidation.updateUser), userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
