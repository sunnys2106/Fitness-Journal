import { useState, useEffect } from "react";
import api from "../api";
import ExerciseTable from "../components/ExerciseTable";
import Navbar from "../components/Navbar";
import ExerciseForm from "../components/ExerciseForm";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Exercise, Workout } from "../types";

type LocationState = {
    workoutId: string;
    workoutName: string;
};

function ExercisePage(): JSX.Element {
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [modalMode, setModalMode] = useState<"add" | "edit">("add");
    const [currentExercise, setCurrentExercise] = useState<Exercise | null>(
        null
    );

    const navigate = useNavigate();

    const location = useLocation();
    const { workoutId, workoutName } = location.state as LocationState;

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

    const deleteExercise = async (id: number) => {
        try {
            const res = await api.delete(
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

    const updateExercise = async (exercise: Exercise, id: number) => {
        try {
            const res = await api.put(
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

    const createExercise = async (exercise: Exercise) => {
        try {
            const res = await api.post(
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

    const handleSubmit = async (exercise: Exercise, id: number) => {
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

    const handleFormOpen = (mode: "add" | "edit", exercise?: Exercise) => {
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
