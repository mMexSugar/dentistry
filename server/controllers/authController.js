Patient = require('../db').Patient;
const validationResult = require('express-validator').validationResult;
const jwt = require('jsonwebtoken');

const generateAccessToken = (id, email) => {
    const payload = {id, email};
    return jwt.sign(payload, "secret", {expiresIn: "24h"});
}

class authController {
    async login(req, res) {
        try {
            const {email, password} = req.body;
            const patient = await Patient.findOne({where: {email}});
            if (!patient) {
                return res.status(400).json({message: "Patient not found"});
            }
            if (password !== patient.password) {
                return res.status(400).json({message: "Incorrect password"});
            }
            const token = generateAccessToken(patient.id, patient.email);
            return res.json({token});
        }
        catch (e) {
            console.error(e.message);
            res.status(400).json({message: "Login error"});
        }
    }

    async register(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({message: "Login error", errors});
            }
            const {email, password, first_name, last_name, middle_name, birth_date, gender, phone} = req.body;
            const candidate = await Patient.findOne({where: {email: req.body.email}});
            if (candidate) {
                return res.status(400).json({message: "User with this email already exists"});
            }
            const patient = await Patient.create({
                    email: email,
                    password: password,
                    first_name: first_name,
                    last_name: last_name,
                    middle_name:middle_name,
                    birth_date: birth_date,
                    gender: gender,
                    phone:phone});
            return res.json({message: "Registration success"});
        }
        catch (e) {
            console.error(e.message);
            res.status(400).json({message: "Registration error"});
        }
    }

    async verifyToken(req, res) {
        try {
            const token = req.headers.authorization.split(' ')[1];
            if (!token) {
                return res.status(400).json({message: "Token not provided"});
            }
            jwt.verify(token, "secret", (err, user) => {
                if (err) {
                    return res.status(400).json({message: "Invalid token"});
                }
                return res.json({valid: true});
            });
        }
        catch (e) {
            console.error(e.message);
            res.status(400).json({message: "Token verification error"});
        }
    }
}

module.exports = new authController();