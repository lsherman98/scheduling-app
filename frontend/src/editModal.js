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

    const [errors, setErrors] = useState("");

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    async function handleSubmit(event) {
        event.preventDefault();
        const response = await updateAppointment(appointment.id, formData);
        if (response) {
            setErrors(response)
        } else {
            setShowEditModal(false);
            setReload(true);
        }
    }

    const handleTimeChange = (event) => {
        setErrors('')
        const { name, value } = event.target;
        let minutes = value.split(":")[1];
        if (
            minutes !== "00" &&
            minutes !== "15" &&
            minutes !== "30" &&
            minutes !== "45"
        ) {
            setErrors(
                "Appointments can only be scheduled at :00, :15, :30, or :45"
            );
            setFormData({ ...formData, [name]: appointment.time });
            return
        }
        setFormData({ ...formData, [name]: value });
    };

    return (
        <form onSubmit={handleSubmit}>
            <p>{errors}</p>
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
                    onChange={handleTimeChange}
                    required
                />
                <input
                    type="text"
                    className="form-control"
                    name="patientFirstName"
                    placeholder="First Name"
                    value={formData.patientFirstName}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="text"
                    className="form-control"
                    name="patientLastName"
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
