import { useState } from "react";
import { checkMinutes, createAppointment } from "./utils";

function CreateModal({ doctorId, setShowCreateModal, setReload }) {
    const [errors, setErrors] = useState("");

    const [formData, setFormData] = useState({
        date: "",
        time: "",
        patientFirstName: "",
        patientLastName: "",
        visitType: "New Patient",
        doctorId: doctorId,
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    async function handleSubmit(event) {
        event.preventDefault();
        const response = await createAppointment(doctorId, formData);
        if (response) {
            setErrors(response);
        } else {
            setShowCreateModal(false);
            setReload(true);
        }
    }

    const handleTimeChange = (event) => {
        setErrors("");
        const { name, value } = event.target;
        if (!checkMinutes(value)) {
            setErrors(
                "Appointments can only be scheduled at :00, :15, :30, or :45"
            );
            setFormData({ ...formData, [name]: "" });
            return;
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
                    value={formData.date}
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
            <button
                className="btn btn-secondary"
                onClick={() => setShowCreateModal(false)}
            >
                Cancel
            </button>
        </form>
    );
}

export default CreateModal;
