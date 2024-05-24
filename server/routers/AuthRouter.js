const Router = require('express');
const router = Router();
const controller = require('../controllers/authController');
const {check} = require('express-validator');

router.post('/login', controller.login);
router.post('/register', [
    check("email", "Incorrect email").isEmail(),
    check("password", "Minimum password length is 6 characters").isLength({min: 6}),
    check("first_name", "Min name length 2").isLength({min: 2}),
    check("last_name", "Min name length 2").isLength({min: 2}),
    check("birth_date", "Incorrect date").isDate(),
], controller.register);
router.post('/verify', controller.verifyToken);

module.exports = router;