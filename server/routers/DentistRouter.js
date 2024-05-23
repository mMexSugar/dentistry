const Router = require('express');
const router = Router();
const controller = require('../controllers/dentistController');

router.get('/dentist', controller.getAll);
router.get('/dentist/:id', controller.getOne);

module.exports = router;