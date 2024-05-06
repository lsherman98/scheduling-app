async function getDoctors() {
    const response = await fetch("http://localhost:3001/doctors");
    const doctors = await response.json();
    if (!response.ok) {
        return "Something went wrong";
    }
    return doctors;
}

async function getAppointments(doctorId) {
    const response = await fetch(
        `http://localhost:3001/doctors/${doctorId}/appointments`
    );
    const appointments = await response.json();
    if (!response.ok) {
        return "Something went wrong";
    }
    return appointments;
}

async function createAppointment(doctorId, data) {
    const response = await fetch(
        `http://localhost:3001/doctors/${doctorId}/appointments`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }
    );
    const json = await response.json();
    if (response.status === 501) {
        return json.message;
    }
    if (!response.ok) {
        return "Something went wrong";
    }
    console.log(json.message);
}

async function updateAppointment(appointmentId, data) {
    const response = await fetch(
        `http://localhost:3001/appointments/${appointmentId}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }
    );
    const json = await response.json();
    if (response.status === 501) {
        return json.message;
    }
    if (!response.ok) {
        return "Something went wrong";
    }
    console.log(json.message);
}

async function deleteAppointment(appointmentId) {
    const response = await fetch(
        `http://localhost:3001/appointments/${appointmentId}`,
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
    if (!response.ok) {
        return "Something went wrong";
    }
    const json = await response.json();
    console.log(json.message);
}

function checkMinutes(value) {
    let minutes = value.split(":")[1];
    if (
        minutes !== "00" &&
        minutes !== "15" &&
        minutes !== "30" &&
        minutes !== "45"
    ) {
        return false;
    } else {
        return true;
    }
}

function filterAppointments(appointments, filterDate) {
    return appointments.filter((appointment) => {
        if (!filterDate) return true;
        return appointment.date.split("T")[0] === filterDate;
    });
}

module.exports = {
    getDoctors,
    getAppointments,
    createAppointment,
    updateAppointment,
    deleteAppointment,
    checkMinutes,
    filterAppointments,
};
