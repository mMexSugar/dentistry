const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize('postgres://default:Dsiu34CJPyHd@ep-weathered-art-a43j516l.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require');

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});

const Patient = sequelize.define('Patient', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        notNull: true,
    },
    first_name: {
        type: DataTypes.STRING,
        notNull: true,
    },
    last_name: {
        type: DataTypes.STRING,
        notNull: true,
    },
    middle_name: {
        type: DataTypes.STRING,
    },
    birth_date: {
        type: DataTypes.DATE,
        notNull: true,
    },
    gender: {
        type: DataTypes.STRING,
    },
    phone: {
        type: DataTypes.STRING,
    },
}, {timestamps: false})

const Dentist = sequelize.define('Dentist', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    first_name: {
        type: DataTypes.STRING,
        notNull: true,
    },
    last_name: {
        type: DataTypes.STRING,
        notNull: true,
    },
    middle_name: {
        type: DataTypes.STRING,
    },
    specialty: {
        type: DataTypes.STRING,
        notNull: true,
    },
    experience: {
        type: DataTypes.INTEGER,
    },
    work_schedule: {
        type: DataTypes.TEXT,
    },
}, {timestamps: false})

const Service = sequelize.define('Service', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        notNull: true,
    },
    description: {
        type: DataTypes.TEXT,
    },
    price: {
        type: DataTypes.FLOAT,
        notNull: true,
    },
    duration: {
        type: DataTypes.INTEGER,
        notNull: true,
    },
}, {timestamps: false})

const Appointment = sequelize.define('Appointment', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    patient_id: {
        type: DataTypes.INTEGER,
        notNull: true,
    },
    dentist_id: {
        type: DataTypes.INTEGER,
        notNull: true,
    },
    service_id: {
        type: DataTypes.INTEGER,
        notNull: true,
    },
    date: {
        type: DataTypes.DATE,
        notNull: true,
    },
    time: {
        type: DataTypes.TIME,
        notNull: true,
    },
    status: {
        type: DataTypes.STRING,
        notNull: true,
    },
    comment: {
        type: DataTypes.TEXT,
    },
}, {timestamps: false})

Patient.hasMany(Appointment, { foreignKey: 'patient_id' });
Appointment.belongsTo(Patient, { foreignKey: 'patient_id' });

Dentist.hasMany(Appointment, { foreignKey: 'dentist_id' });
Appointment.belongsTo(Dentist, { foreignKey: 'dentist_id' });

Service.hasMany(Appointment, { foreignKey: 'service_id' });
Appointment.belongsTo(Service, { foreignKey: 'service_id' });

// sequelize.sync({ force: true }).then(() => {
//     console.log('Database & tables created!');
// });
// INSERT INTO "Patients" (email, password, first_name, last_name, birth_date, gender, phone)
// VALUES ('john.doe@example.com', '1111', 'John', 'Doe', '2003-01-21', 'male', '+380999999999');

module.exports = { Patient, Dentist, Service, Appointment };