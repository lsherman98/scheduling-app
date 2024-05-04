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

//DOCTORS
app.get("/doctors", async (req, res) => {
    const doctors = await Doctor.findAll();
    res.send(doctors);
});

//APPOINTMENTS
app.get("/doctors/:doctorID/appointments", async (req, res) => {
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
    res.send(appointments);
});

app.post("/doctors/:doctorID/appointments", async (req, res) => {
    const doctorId = req.params.doctorID;
    const appointments = await Appointment.findAndCountAll({
        where: {
            doctorId: doctorId,
            date: new Date(req.body.date),
            time: req.body.time,
        },
    });
    if (appointments.count === 3) {
        res.json({ message: "This time slot is all booked up" });
        return;
    }
    await Appointment.create(req.body);
    res.status(200).json({
        message: "Appointment has been added",
       
    });
});

app.put("/appointments/:appointmentId", async (req, res) => {
    const {
        date,
        time,
        patientFirstName,
        patientLastName,
        visitType,
        doctorId,
    } = req.body;
    const appointmentId = req.params.appointmentId;
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
    res.json({ message: "Appointment Updated" });
});

app.delete("/appointments/:appointmentId", async (req, res) => {
    const appointmentId = req.params.appointmentId;
    await Appointment.destroy({ where: { id: appointmentId } });
    res.json({ message: "Appointment Deleted" });
});

app.listen(3001, () => {
    console.log("app is listening on port 3001");
});
