const Dentist = require('../db').Dentist;


class dentistController {

    async getAll(req, res) {
        try {
            const dentists = await Dentist.findAll();
            return res.json(dentists);
        }
        catch (e) {
            console.error(e.message);
            res.status(400).json({message: "Server error"});
        }
    }

    async getOne(req, res) {
        try {
            const id = req.params.id;
            const dentist = await Dentist.findOne({where: {id}});
            if (!dentist) {
                return res.status(400).json({message: "Dentist not found"});
            }
            return res.json(dentist);
        }
        catch (e) {
            console.error(e.message);
            res.status(400).json({message: "Server error"});
        }
    }

}

module.exports = new dentistController();