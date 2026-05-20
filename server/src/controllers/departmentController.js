const departmentService = require('../services/departmentService');

const getDepartments = async (req, res, next) => {
  try {
    const departments = await departmentService.getDepartments();
    res.json(departments);
  } catch (err) {
    next(err);
  }
};

module.exports = { getDepartments };
