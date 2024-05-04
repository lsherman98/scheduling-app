import { useState } from "react";
import { updateAppointment } from "./utils";

function EditModal({ doctorId, setShowEditModal, appointment, setReload }) {
    const [formData, setFormData] = useState({
        date: appointment.date,
        time: appointment.time,
        patientFirstName: appointment.patientFirstName,
        patientLastName: appointment.patientLastName,
        visitType: appointment.visitType,
        doctorId: doctorId,
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    function handleSubmit(event) {
        event.preventDefault();
        updateAppointment(appointment.id, formData);
        setShowEditModal(false);
        setReload(true);
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <input
                    type="date"
                    className="form-control"
                    name="date"
                    value={formData.date.split("T")[0]}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="time"
                    className="form-control"
                    step="900"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="text"
                    className="form-control"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.patientFirstName}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="text"
                    className="form-control"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.patientLastName}
                    onChange={handleInputChange}
                    required
                />
                <select
                    name="visitType"
                    value={formData.visitType}
                    onChange={handleInputChange}
                >
                    <option value="new_patient">New Patient</option>
                    <option value="follow_up">Follow Up</option>
                </select>
            </div>
            <button type="submit" className="btn btn-primary">
                Submit
            </button>
        </form>
    );
}

export default EditModal;
