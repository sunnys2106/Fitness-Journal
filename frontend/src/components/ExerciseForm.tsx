import { useState, useEffect } from "react";

function ExerciseForm({ exercise, mode, isOpen, onClose, onSubmit }) {
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [weight, setWeight] = useState("");
    const [sets, setSets] = useState("");
    const [reps, setReps] = useState("");
    const [notes, setNotes] = useState("");

    useEffect(() => {
        if (mode === "edit" && exercise) {
            setId(exercise.id);
            setName(exercise.name);
            setWeight(exercise.weight);
            setSets(exercise.sets);
            setReps(exercise.reps);
            setNotes(exercise.notes);
        } else {
            setName("");
            setWeight("");
            setSets("");
            setReps("");
            setNotes("");
        }
    }, [mode, exercise]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const exercise = {
                name: name,
                weight: weight,
                sets: sets,
                reps: reps,
                notes: notes,
            };
            setName("");
            setWeight("");
            setSets("");
            setReps("");
            setNotes("");
            await onSubmit(exercise, id);
        } catch (err) {
            console.error("Error submitting data", err);
        }
        onClose();
    };

    return (
        <dialog id="my_modal_3" className="modal" open={isOpen}>
            <div className="modal-box">
                <h3 className="font-bold text-lg py-4">
                    {mode === "edit" ? "Edit Exercise" : "Add Exercise"}
                </h3>
                <form method="dialog" onSubmit={handleSubmit}>
                    <button
                        type="button"
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                        onClick={onClose}
                    >
                        ✕
                    </button>
                    <label className="my-4 input input-bordered flex items-center gap-2">
                        <div className="label">
                            <span className="label-text">Name</span>
                        </div>
                        <input
                            type="text"
                            className="grow"
                            required
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                        />
                    </label>
                    <label className="my-4 input input-bordered flex items-center gap-2">
                        <div className="label">
                            <span className="label-text">Weight</span>
                        </div>
                        <input
                            type="number"
                            className="grow"
                            required
                            value={weight}
                            onChange={(e) => {
                                setWeight(e.target.value);
                            }}
                        />
                    </label>
                    <label className="my-4 input input-bordered flex items-center gap-2">
                        <div className="label">
                            <span className="label-text">Sets</span>
                        </div>
                        <input
                            type="number"
                            className="grow"
                            required
                            value={sets}
                            onChange={(e) => {
                                setSets(e.target.value);
                            }}
                        />
                    </label>
                    <label className="my-4 input input-bordered flex items-center gap-2">
                        <div className="label">
                            <span className="label-text">Reps</span>
                        </div>
                        <input
                            type="number"
                            className="grow"
                            required
                            value={reps}
                            onChange={(e) => {
                                setReps(e.target.value);
                            }}
                        />
                    </label>
                    <label className="form-control">
                        <div className="label">
                            <span className="label-text">Notes</span>
                        </div>
                        <textarea
                            className="textarea textarea-bordered h-12"
                            value={notes}
                            onChange={(e) => {
                                setNotes(e.target.value);
                            }}
                        ></textarea>
                    </label>
                    <div className="mt-4 w-full flex justify-center">
                        <button className="btn btn-wide btn-outline btn-success">
                            {mode === "edit" ? "Save Changes" : "Add Exercise"}
                        </button>
                    </div>
                </form>
            </div>
        </dialog>
    );
}

export default ExerciseForm;
