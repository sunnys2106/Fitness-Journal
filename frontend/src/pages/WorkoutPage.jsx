import { useState, useEffect } from "react";
import api from "../api";
import WorkoutTable from "../components/WorkoutTable";
import Navbar from "../components/Navbar";
import WorkoutForm from "../components/WorkoutForm";
import { useNavigate } from "react-router-dom";

function Home() {
    const [workouts, setWorkouts] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState("add");
    const [currentWorkout, setCurrentWorkout] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            await getWorkouts();
        }
        fetchData();
    }, []);

    const getWorkouts = async () => {
        try {
            const res = await api.get("/api/workouts/");
            setWorkouts(res.data);
        } catch (err) {
            alert(err);
        }
    };

    const deleteWorkout = async (id) => {
        try {
            const res = api.delete(`/api/workouts/delete/${id}/`);
            alert("Workout deleted");
            setWorkouts((prevWorkouts) =>
                prevWorkouts.filter((workout) => workout.id !== id)
            );
        } catch (err) {
            alert(err);
        }
    };

    const updateWorkout = async (workout, id) => {
        try {
            const res = api.put(`/api/workouts/update/${id}/`, {
                name: workout.name,
            });
            alert("Workout updated");
            setWorkouts((prevWorkouts) =>
                prevWorkouts.map((item) =>
                    item.id === id
                        ? {
                              id,
                              name: workout.name,
                          }
                        : item
                )
            );
        } catch (err) {
            alert(err);
        }
    };

    const createWorkout = async (workout) => {
        try {
            const res = api.post("/api/workouts/create/", {
                name: workout.name,
            });
            alert("Workout created");
            setWorkouts((prevWorkouts) => [...prevWorkouts, workout]);
        } catch (err) {
            alert(err);
        }
    };

    const handleSubmit = async (workout, id) => {
        if (modalMode === "add") {
            await createWorkout(workout);
        } else {
            await updateWorkout(workout, id);
        }
    };

    const logout = () => {
        localStorage.clear();
        navigate("/login");
    };

    const handleFormOpen = (mode, workout) => {
        setModalOpen(true);
        setModalMode(mode);
        if (workout) {
            setCurrentWorkout(workout);
        }
    };

    return (
        <div>
            <Navbar
                logout={logout}
                handleOpen={handleFormOpen}
                workoutMode={true}
            />

            <div>
                <WorkoutTable
                    workouts={workouts}
                    onUpdate={updateWorkout}
                    onDelete={deleteWorkout}
                    handleOpen={handleFormOpen}
                />
            </div>

            <WorkoutForm
                workout={currentWorkout}
                mode={modalMode}
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onSubmit={handleSubmit}
            />
        </div>
    );
}

export default Home;
