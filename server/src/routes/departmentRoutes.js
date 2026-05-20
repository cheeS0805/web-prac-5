const { Router } = require('express');
const { getDepartments } = require('../controllers/departmentController');

const router = Router();

router.get('/', getDepartments);

module.exports = router;
