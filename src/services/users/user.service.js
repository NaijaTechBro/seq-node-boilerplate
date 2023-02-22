/**
 * Example Service File
 */

let mockUserData = [
  {
    firstName: 'Dwight',
    lastName: 'Schrute',
    email: 'dschrute@dundermifflinpaperco.com',
  },
  {
    firstName: 'Michael',
    lastName: 'Scott',
    email: 'mscott@dundermifflinpaperco.com',
  },
];

const { User } = require('../../models');

module.exports.bulkSeed = async () => {
  await User.bulkCreate(mockUserData);
};

module.exports.getAllUsers = async () => {
  return User.findAll();
};

module.exports.getUser = async (userId) => {
  const user = await User.findByPk(userId);
  if (!user) gxApiErrorNotFound('There was no user found by that id!');
  return User.findByPk(userId);
};

module.exports.createUser = async (user) => {
  return User.create(user);
};

module.exports.updateUser = async (user, userId) => {
  const getUser = await User.findByPk(userId);
  if (!getUser) gxApiErrorNotFound('There was no user found by that id!');
  return getUser.update(user);
};

module.exports.deleteUser = async (userId) => {
  const user = await User.findByPk(userId);
  if (!user) gxApiErrorNotFound('There was no user found by that id!');
  return await User.destroy({ where: { id: userId } });
};
