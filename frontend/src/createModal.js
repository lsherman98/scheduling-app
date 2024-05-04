import { useState } from "react";
import { createAppointment } from "./utils";

function CreateModal({ doctorId, setShowCreateModal, setReload }) {
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

    function handleSubmit(event) {
        event.preventDefault();
        createAppointment(doctorId, formData);
        setShowCreateModal(false);
        setReload(true);
    }

    

    return (
        <form onSubmit={handleSubmit}>
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
                    onChange={handleInputChange}
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
                    <option>New Patient</option>
                    <option>Follow Up</option>
                </select>
            </div>
            <button type="submit" className="btn btn-primary">
                Submit
            </button>
        </form>
    );
}

export default CreateModal;
