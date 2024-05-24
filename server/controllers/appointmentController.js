const Appointment = require('../db').Appointment;
const { Sequelize, Op, literal } = require('sequelize');
const allTimeSlots = ['09:00:00', '10:00:00', '11:00:00', '12:00:00', '13:00:00', '14:00:00', '15:00:00', '16:00:00', '17:00:00']
const jwt = require('jsonwebtoken');

class appointmentController {
    async getAllForUser(req, res) {
        try {
            const services = await Appointment.findAll({where: {patient_id: req.patient.id}});
            return res.json(services);
        }
        catch (e) {
            console.error(e.message);
            res.status(400).json({message: "Server error"});
        }
    }

    async create(req, res) {
        try {
            const {dentist_id, service_id, date, time, comment} = req.body;
            const patient_id = jwt.decode(req.headers.authorization.split(' ')[1]).id;
            const appointment = await Appointment.create({dentist_id, service_id, date, time, comment, patient_id, status: 'planned'});
            return res.json(appointment);
        }
        catch (e) {
            console.error(e.message);
            res.status(400).json({message: "Server error"});
        }
    }

    async getTimeSlots(req, res) {
        try {
            const { dentist_id } = req.params;
            let date = new Date(req.query.date);
            let startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            let endDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + 1);

            const appointments = await Appointment.findAll({
                where: {
                    dentist_id,
                    date: {
                        [Op.between]: [startDate, endDate]
                    }
                }
            });
            const timeSlots = appointments.map(appointment => appointment.time);
            const availableTimeSlots = allTimeSlots.filter(tS => !timeSlots.includes(tS));

            console.log(timeSlots);
            console.log(availableTimeSlots);
            return res.json(availableTimeSlots);
        } catch (e) {
            console.error(e.message);
            res.status(400).json({message: "Server error"});
        }
    }
}

module.exports = new appointmentController();