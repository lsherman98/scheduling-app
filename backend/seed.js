const Doctor = require("./Doctor");
const Appointment = require("./Appointment");
const sequelize = require("./database");

async function seed() {
    const appointments = [
        {
            date: "2024-05-24",
            time: "08:00",
            patientFirstName: "Alice",
            patientLastName: "Johnson",
            visitType: "new_patient",
            doctorId: 2,
        },
        {
            date: "2024-05-15",
            time: "12:15",
            patientFirstName: "Michael",
            patientLastName: "Smith",
            visitType: "follow_up",
            doctorId: 1,
        },
        {
            date: "2024-05-15",
            time: "12:15",
            patientFirstName: "Michael",
            patientLastName: "Smith",
            visitType: "follow_up",
            doctorId: 1,
        },
        {
            date: "2024-05-15",
            time: "12:15",
            patientFirstName: "Michael",
            patientLastName: "Smith",
            visitType: "follow_up",
            doctorId: 1,
        },
        {
            date: "2024-05-28",
            time: "16:30",
            patientFirstName: "Sarah",
            patientLastName: "Williams",
            visitType: "new_patient",
            doctorId: 3,
        },
        {
            date: "2024-05-19",
            time: "9:30",
            patientFirstName: "David",
            patientLastName: "Brown",
            visitType: "follow_up",
            doctorId: 2,
        },
        {
            date: "2024-05-07",
            time: "15:00",
            patientFirstName: "Emily",
            patientLastName: "Anderson",
            visitType: "new_patient",
            doctorId: 1,
        },
        {
            date: "2024-05-31",
            time: "10:30",
            patientFirstName: "James",
            patientLastName: "Wilson",
            visitType: "new_patient",
            doctorId: 3,
        },
        {
            date: "2024-05-11",
            time: "10:30",
            patientFirstName: "Sophia",
            patientLastName: "Martinez",
            visitType: "follow_up",
            doctorId: 2,
        },
        {
            date: "2024-05-22",
            time: "10:30",
            patientFirstName: "Benjamin",
            patientLastName: "Garcia",
            visitType: "new_patient",
            doctorId: 1,
        },
        {
            date: "2024-05-25",
            time: "14:30",
            patientFirstName: "Olivia",
            patientLastName: "Lopez",
            visitType: "follow_up",
            doctorId: 3,
        },
        {
            date: "2024-05-16",
            time: "13:30",
            patientFirstName: "Noah",
            patientLastName: "Rodriguez",
            visitType: "new_patient",
            doctorId: 2,
        },
        {
            date: "2024-05-09",
            time: "10:15",
            patientFirstName: "Emma",
            patientLastName: "Hernandez",
            visitType: "follow_up",
            doctorId: 1,
        },
        {
            date: "2024-05-29",
            time: "10:30",
            patientFirstName: "William",
            patientLastName: "Gonzalez",
            visitType: "new_patient",
            doctorId: 3,
        },
        {
            date: "2024-05-20",
            time: "10:30",
            patientFirstName: "Ava",
            patientLastName: "Martinez",
            visitType: "follow_up",
            doctorId: 2,
        },
        {
            date: "2024-05-14",
            time: "10:30",
            patientFirstName: "Alexander",
            patientLastName: "Taylor",
            visitType: "new_patient",
            doctorId: 1,
        },
        {
            date: "2024-05-18",
            time: "10:30",
            patientFirstName: "Mia",
            patientLastName: "Robinson",
            visitType: "follow_up",
            doctorId: 3,
        },
        {
            date: "2024-05-23",
            time: "10:30",
            patientFirstName: "Liam",
            patientLastName: "Clark",
            visitType: "new_patient",
            doctorId: 2,
        },
        {
            date: "2024-05-17",
            time: "10:30",
            patientFirstName: "Isabella",
            patientLastName: "Lewis",
            visitType: "follow_up",
            doctorId: 1,
        },
        {
            date: "2024-05-30",
            time: "10:30",
            patientFirstName: "Lucas",
            patientLastName: "Walker",
            visitType: "new_patient",
            doctorId: 3,
        },
    ];

    console.log("seeding data...");

    await Doctor.bulkCreate([
        { firstName: "Sophia", lastName: "Ramirez" },
        { firstName: "Ethan", lastName: "Johnson" },
        { firstName: "Olivia", lastName: "Patel" },
    ]);

    await Appointment.bulkCreate(appointments);

    console.log("seeding complete");
}

module.exports = {
    seed,
};
