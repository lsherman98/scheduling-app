async function getDoctors() {
    const response = await fetch("http://localhost:3001/doctors");
    const data = await response.json();
    if (response.ok) {
        return data;
    }
}

async function getAppointments(doctorId) {
    const response = await fetch(
        `http://localhost:3001/doctors/${doctorId}/appointments`
    );
    const data = await response.json();
    if (response.ok) {
        return data;
    }
}

async function createAppointment(doctorId, data) {
    await fetch(`http://localhost:3001/doctors/${doctorId}/appointments`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
}

async function updateAppointment(appointmentId, data) {
    await fetch(`http://localhost:3001/appointments/${appointmentId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
}

async function deleteAppointment(appointmentId) {
    await fetch(`http://localhost:3001/appointments/${appointmentId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
}

module.exports = {
    getDoctors,
    getAppointments,
    createAppointment,
    updateAppointment,
    deleteAppointment
};
