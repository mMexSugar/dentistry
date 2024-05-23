const express = require('express');
const pool = require('./db');
const port =  3000;
const cors = require('cors');
const AuthRouter = require('./routers/AuthRouter');
const DentistRouter = require('./routers/DentistRouter');
const ServiceRouter = require('./routers/ServiceRouter');
const AppointmentRouter = require('./routers/AppointmentRouter');
const app = express();

app.use(express.json());
app.use(cors());
app.use('/auth', AuthRouter);
app.use(DentistRouter);
app.use(ServiceRouter);
app.use(AppointmentRouter);

const start = async () => {
    try {
        app.listen(port, () => {console.log(`Server is running on port ${port}`);});
    }
    catch (err) {
        console.error(err);
    }
}

start();