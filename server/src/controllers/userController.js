const userService = require('../services/userService');
const { createUserSchema, updateUserSchema, queryParamsSchema } = require('../schemas/userSchemas');

const getUsers = async (req, res, next) => {
  try {
    const params = queryParamsSchema.parse(req.query);
    const result = await userService.getUsers(params);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const user = await userService.getUserById(Number(req.params.id));
    res.json(user);
  } catch (err) {
    next(err);
  }
};

const createUser = async (req, res, next) => {
  try {
    const data = createUserSchema.parse(req.body);
    const user = await userService.createUser(data);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const data = updateUserSchema.parse(req.body);
    const user = await userService.updateUser(Number(req.params.id), data);
    res.json(user);
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    await userService.deleteUser(Number(req.params.id));
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

module.exports = { getUsers, getUserById, createUser, updateUser, deleteUser };
