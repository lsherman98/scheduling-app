const express = require("express");
const sequelize = require("./database");
const Doctor = require("./Doctor");
const Appointment = require("./Appointment");
const { seed } = require("./seed");
const cors = require("cors");

sequelize
    .sync({ force: true })
    .then(() => console.log("database is ready"))
    .then(() => seed());

const app = express();
app.use(cors());

app.use(express.json());

app.get("/doctors", async (req, res) => {
    try {
        const doctors = await Doctor.findAll();
        res.status(200).send(doctors);
    } catch (err) {
        res.status(500).send("Server Error");
    }
});

app.get("/doctors/:doctorID/appointments", async (req, res) => {
    try {
        const doctorId = req.params.doctorID;
        const doctor = await Doctor.findOne({
            where: { id: doctorId },
            include: [
                {
                    model: Appointment,
                    as: "appointments",
                },
            ],
        });
        const appointments = doctor.appointments;
        res.status(200).send(appointments);
    } catch (err) {
        res.status(500).send("Server Error");
    }
});

app.post("/doctors/:doctorID/appointments", async (req, res) => {
    try {
        const doctorId = req.params.doctorID;
        const appointments = await Appointment.findAndCountAll({
            where: {
                doctorId: doctorId,
                date: new Date(req.body.date),
                time: req.body.time,
            },
        });
        if (appointments.count === 3) {
            res.status(501).json({
                message: "This time slot is all booked up",
            });
            return;
        }
        await Appointment.create(req.body);
        res.status(200).json({
            message: "Appointment has been added",
        });
    } catch (err) {
        res.status(500).send("Server Error");
    }
});

app.put("/appointments/:appointmentId", async (req, res) => {
    try {
        const {
            date,
            time,
            patientFirstName,
            patientLastName,
            visitType,
            doctorId,
        } = req.body;
        const appointmentId = req.params.appointmentId;
        const appointments = await Appointment.findAndCountAll({
            where: {
                doctorId: doctorId,
                date: new Date(req.body.date),
                time: req.body.time,
            },
        });
        if (appointments.count === 3) {
            res.status(501).json({
                message: "This time slot is all booked up",
            });
            return;
        }
        await Appointment.update(
            {
                date,
                time,
                patientFirstName,
                patientLastName,
                visitType,
            },
            { where: { id: appointmentId } }
        );
        res.status(200).json({ message: "Appointment Updated" });
    } catch (err) {
        res.status(500).send("Server Error");
    }
});

app.delete("/appointments/:appointmentId", async (req, res) => {
    try {
        const appointmentId = req.params.appointmentId;
        await Appointment.destroy({ where: { id: appointmentId } });
        res.status(200).json({ message: "Appointment Deleted" });
    } catch (err) {
        res.status(500).send("Server Error");
    }
});

app.listen(3001, () => {
    console.log("app is listening on port 3001");
});
