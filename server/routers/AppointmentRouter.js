const Router = require('express');
const router = Router();
const authMiddleware = require('../middleware/authMiddleware');
const controller = require('../controllers/appointmentController');

router.get('/appointment', authMiddleware, controller.getAllForUser);
router.get('/appointment/:dentist_id', authMiddleware, controller.getTimeSlots);
router.post('/appointment', authMiddleware, controller.create);

module.exports = router;