const { Model, DataTypes } = require("sequelize");
const sequelize = require("./database");

class Appointment extends Model {}

Appointment.init(
    {
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        time: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        patientFirstName: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        patientLastName: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        visitType: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        doctorId: {
            type: DataTypes.NUMBER,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "appointment",
    }
);

module.exports = Appointment;
