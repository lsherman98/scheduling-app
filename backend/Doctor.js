const { Model, DataTypes } = require("sequelize");
const sequelize = require("./database");
const Appointment = require("./Appointment");

class Doctor extends Model {}

Doctor.init(
    {
        firstName: {
            type: DataTypes.STRING,
        },
        lastName: {
            type: DataTypes.STRING,
        },
    },
    {
        sequelize,
        modelName: "doctor",
        timestamps: false,
    }
);

Doctor.hasMany(Appointment, { foreignKey: "doctorId" });
Appointment.belongsTo(Doctor, { foreignKey: "doctorId" });

module.exports = Doctor;
