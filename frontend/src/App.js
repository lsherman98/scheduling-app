import "./app.css";
import { useEffect, useState } from "react";
import { deleteAppointment, getAppointments, getDoctors } from "./utils";
import EditModal from "./editModal.js";
import CreateModal from "./createModal.js";

function App() {
    const [doctors, setDoctors] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [selectedAppt, setSelectedAppt] = useState();
    const [reload, setReload] = useState(false);
    const [filterDate, setFilterDate] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const fetchedDoctors = await getDoctors();
            setDoctors(fetchedDoctors);
            setSelectedDoctor(fetchedDoctors[0].id);
            const fetchedAppointments = await getAppointments(
                fetchedDoctors[0].id
            );
            setAppointments(fetchedAppointments);
            setReload(false);
        };
        fetchData();
    }, [reload]);

    async function selectDoctor(id) {
        setSelectedDoctor(id);
        const fetchedAppointments = await getAppointments(id);
        setAppointments(fetchedAppointments);
    }

    function handleDelete(id) {
        deleteAppointment(id);
        setReload(true);
    }

    function handleDateChange(event) {
        setFilterDate(event.target.value);
    }

    const filteredAppointments = appointments.filter((appointment) => {
        if (!filterDate) return true;
        return appointment.date.split("T")[0] === filterDate;
    });

    return (
        <div className="App">
            <div className="main-container">
                <div className="doctor-sidebar">
                    <h2>Doctors</h2>
                    <div>
                        {doctors &&
                            doctors.map((doctor) => {
                                return (
                                    <h3
                                        key={doctor.id}
                                        onClick={() => selectDoctor(doctor.id)}
                                        className={
                                            doctor.id === selectedDoctor
                                                ? "selectedDoctor"
                                                : ""
                                        }
                                    >{`${doctor.firstName} ${doctor.lastName}`}</h3>
                                );
                            })}
                    </div>
                    <div>
                        <button
                            onClick={() => {
                                setShowEditModal(false);
                                setShowCreateModal(true);
                            }}
                        >
                            schedule appointment
                        </button>
                    </div>
                </div>
                <div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">First Name</th>
                                <th scope="col">Last Name</th>
                                <th scope="col">Date</th>
                                <th scope="col">Time</th>
                                <th scope="col">Visit Type</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments &&
                                filteredAppointments.map((appointment) => {
                                    return (
                                        <tr key={appointment.id}>
                                            <td>
                                                {appointment.patientFirstName}
                                            </td>
                                            <td>
                                                {appointment.patientLastName}
                                            </td>
                                            <td>
                                                {appointment.date.split("T")[0]}
                                            </td>
                                            <td>{appointment.time}</td>
                                            <td>
                                                {appointment.visitType ===
                                                "follow_up"
                                                    ? "Follow Up"
                                                    : "New Patient"}
                                            </td>
                                            <button
                                                onClick={() => {
                                                    setSelectedAppt(
                                                        appointment
                                                    );
                                                    setShowEditModal(true);
                                                    setShowCreateModal(false);
                                                }}
                                            >
                                                edit
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleDelete(appointment.id)
                                                }
                                            >
                                                delete
                                            </button>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                    <label>
                        Filter by Day:
                        <input
                            type="date"
                            value={filterDate}
                            onChange={handleDateChange}
                        />
                    </label>
                </div>
                {showCreateModal && (
                    <CreateModal
                        doctorId={selectedDoctor}
                        setShowCreateModal={setShowCreateModal}
                        setReload={setReload}
                    />
                )}
                {showEditModal && (
                    <EditModal
                        doctorId={selectedDoctor}
                        setShowEditModal={setShowEditModal}
                        appointment={selectedAppt}
                        setReload={setReload}
                    />
                )}
            </div>
        </div>
    );
}

export default App;
