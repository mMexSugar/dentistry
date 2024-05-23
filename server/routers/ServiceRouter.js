const Router = require('express');
const router = Router();
const controller = require('../controllers/serviceController');

router.get('/service', controller.getAll);

module.exports = router;