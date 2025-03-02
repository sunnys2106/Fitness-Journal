import { useState, useEffect } from "react";
import api from "../api";
import ExerciseTable from "../components/ExerciseTable";
import Navbar from "../components/Navbar";
import ExerciseForm from "../components/ExerciseForm";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function ExercisePage() {
    const [exercises, setExercises] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState("add");
    const [currentExercise, setCurrentExercise] = useState("");

    const navigate = useNavigate();

    const location = useLocation();
    const [workoutId, setWorkoutId] = useState(location.state?.workoutId);
    const [workoutName, setWorkoutName] = useState(location.state?.workoutName);

    useEffect(() => {
        async function fetchData() {
            await getExercises();
        }
        fetchData();
    }, []);

    const getExercises = async () => {
        try {
            const res = await api.get(`/api/workouts/${workoutId}/exercises/`);
            setExercises(res.data);
        } catch (err) {
            alert(err);
        }
    };

    const deleteExercise = async (id) => {
        try {
            const res = api.delete(
                `/api/workouts/${workoutId}/exercises/delete/${id}/`
            );
            alert("Exercise deleted");
            setExercises((prevExercises) =>
                prevExercises.filter((exercise) => exercise.id !== id)
            );
            //await getExercises();
        } catch (err) {
            alert(err);
        }
    };

    const updateExercise = async (exercise, id) => {
        try {
            const res = api.put(
                `/api/workouts/${workoutId}/exercises/update/${id}/`,
                {
                    name: exercise.name,
                    weight: exercise.weight,
                    sets: exercise.sets,
                    reps: exercise.reps,
                    notes: exercise.notes,
                }
            );
            alert("Exercise updated");
            setExercises((prevExercises) =>
                prevExercises.map((item) =>
                    item.id === id
                        ? {
                              id,
                              name: exercise.name,
                              weight: exercise.weight,
                              sets: exercise.sets,
                              reps: exercise.reps,
                              notes: exercise.notes,
                          }
                        : item
                )
            );
        } catch (err) {
            alert(err);
        }
    };

    const createExercise = async (exercise) => {
        try {
            const res = api.post(
                `/api/workouts/${workoutId}/exercises/create/`,
                {
                    name: exercise.name,
                    weight: exercise.weight,
                    sets: exercise.sets,
                    reps: exercise.reps,
                    notes: exercise.notes,
                }
            );
            alert("Exercise created");
            setExercises((prevExercises) => [...prevExercises, exercise]);
        } catch (err) {
            alert(err);
        }
    };

    const handleSubmit = async (exercise, id) => {
        if (modalMode === "add") {
            await createExercise(exercise);
        } else {
            await updateExercise(exercise, id);
        }
    };

    const logout = () => {
        localStorage.clear();
        navigate("/login");
    };

    const handleFormOpen = (mode, exercise) => {
        setModalOpen(true);
        setModalMode(mode);
        if (exercise) {
            setCurrentExercise(exercise);
        }
    };

    return (
        <div>
            <Navbar
                logout={logout}
                handleOpen={handleFormOpen}
                workoutName={workoutName}
            />

            <div>
                <ExerciseTable
                    exercises={exercises}
                    onUpdate={updateExercise}
                    onDelete={deleteExercise}
                    handleOpen={handleFormOpen}
                />
            </div>

            <ExerciseForm
                exercise={currentExercise}
                mode={modalMode}
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onSubmit={handleSubmit}
            />
        </div>
    );
}

export default ExercisePage;
