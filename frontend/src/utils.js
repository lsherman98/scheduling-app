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
    if (response.status === 501) {
        const json = await response.json();
        return json.message;
    }
    if (!response.ok) {
        return "Something went wrong";
    }
    const json = await response.json();
    console.log(json);
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
    if (response.status === 501) {
        const json = await response.json();
        return json.message;
    }
    if (!response.ok) {
        return "Something went wrong";
    }
    const json = await response.json();
    console.log(json);
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
    console.log(json);
}

module.exports = {
    getDoctors,
    getAppointments,
    createAppointment,
    updateAppointment,
    deleteAppointment,
};
