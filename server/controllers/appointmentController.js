const Appointment = require('../db').Appointment;

const allTimeSlots = ['09:00:00', '10:00:00', '11:00:00', '12:00:00', '13:00:00', '14:00:00', '15:00:00', '16:00:00', '17:00:00']

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
            const appointment = await Appointment.create({dentist_id, service_id, date, time, comment, patient_id: req.patient.id});
            return res.json(appointment);
        }
        catch (e) {
            console.error(e.message);
            res.status(400).json({message: "Server error"});
        }
    }

    async getTimeSlots(req, res) {
        try {
            const {dentist_id} = req.params;
            const appointments = await Appointment.findAll({where: {dentist_id, date: req.query.date}});
            const timeSlots = appointments.map(appointment => appointment.time);
            const availableTimeSlots = allTimeSlots.filter(tS => !timeSlots.includes(tS));
            return res.json(availableTimeSlots);
        }
        catch (e) {
            console.error(e.message);
            res.status(400).json({message: "Server error"});
        }
    }
}

module.exports = new appointmentController();