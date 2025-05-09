import { useState, useEffect } from "react";
import api from "../api";
import WorkoutTable from "../components/WorkoutTable";
import Navbar from "../components/Navbar";
import WorkoutForm from "../components/WorkoutForm";
import { useNavigate } from "react-router-dom";

type Workout = {
    id: number;
    name: string;
};

function WorkoutPage(): JSX.Element {
    const [workouts, setWorkouts] = useState<Workout[]>([]);
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [modalMode, setModalMode] = useState<"add" | "edit">("add");
    const [currentWorkout, setCurrentWorkout] = useState<Workout | null>(null);

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

    const deleteWorkout = async (id: number) => {
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

    const updateWorkout = async (workout: Workout, id: number) => {
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

    const createWorkout = async (workout: Workout) => {
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

    const handleSubmit = async (workout: Workout, id?: number) => {
        if (modalMode === "add") {
            await createWorkout(workout);
        } else {
            if (id) {
                await updateWorkout(workout, id);
            } else {
                alert("Error. Please try again");
            }
        }
    };

    const logout = () => {
        localStorage.clear();
        navigate("/login");
    };

    const handleFormOpen = (mode: "add" | "edit", workout?: Workout) => {
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
                workoutName={null}
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

export default WorkoutPage;
