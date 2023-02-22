/**
 * Example Controller
 */

const userService = require('../../services/users/user.service');

module.exports.getUsers = async (req, res) => {
  const users = await userService.getAllUsers();
  return gxSuccess(res, { users: users });
};

module.exports.getUser = async (req, res) => {
  const user = await userService.getUser(req.params.userId);
  return gxSuccess(res, { user: user });
};

module.exports.createUser = async (req, res) => {
  if (req.query.bulkCreate) {
    await userService.bulkSeed();
    return gxSuccess(res);
  }

  const newUser = await userService.createUser(req.body);
  return gxSuccess(res, { newUser: newUser });
};

module.exports.updateUser = async (req, res) => {
  const user = req.body;
  const updatedUser = await userService.updateUser(user, req.params.userId);
  return gxSuccess(res, { user: updatedUser });
};

module.exports.deleteUser = async (req, res) => {
  await userService.deleteUser(req.params.userId);
  return gxSuccess(res);
};
