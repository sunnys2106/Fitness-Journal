import { useState, useEffect } from "react";
import api from "../api";
import Table from "../components/Table";
import Navbar from "../components/Navbar";
import ExerciseForm from "../components/ExerciseForm";
import { useNavigate } from "react-router-dom";

function Home() {
    const [exercises, setExercises] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState("add");
    const [currentExercise, setCurrentExercise] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            await getExercises();
        }
        fetchData();
    }, []);

    const getExercises = async () => {
        try {
            const res = await api.get("/api/exercises/");
            setExercises(res.data);
        } catch (err) {
            alert(err);
        }
    };

    const deleteExercise = async (id) => {
        try {
            const res = api.delete(`/api/exercise/delete/${id}/`);
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
            const res = api.put(`/api/exercise/update/${id}/`, {
                name: exercise.name,
                weight: exercise.weight,
                sets: exercise.sets,
                reps: exercise.reps,
                notes: exercise.notes,
            });
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
            //await getExercises();
        } catch (err) {
            alert(err);
        }
    };

    const createExercise = async (exercise) => {
        try {
            const res = api.post("/api/exercises/", {
                name: exercise.name,
                weight: exercise.weight,
                sets: exercise.sets,
                reps: exercise.reps,
                notes: exercise.notes,
            });
            alert("Exercise created");
            setExercises((prevExercises) => [...prevExercises, exercise]);
            //await getExercises();
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
            <Navbar logout={logout} handleOpen={handleFormOpen} />

            <div>
                <Table
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

export default Home;
