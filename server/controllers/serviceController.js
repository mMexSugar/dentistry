const Service = require('../db').Service;


class serviceController {
    async getAll(req, res) {
        try {
            const services = await Service.findAll();
            return res.json(services);
        }
        catch (e) {
            console.error(e.message);
            res.status(400).json({message: "Server error"});
        }
    }
}

module.exports = new serviceController();