import { useState, useEffect } from "react";

function WorkoutForm({ workout, mode, isOpen, onClose, onSubmit }) {
    const [id, setId] = useState("");
    const [name, setName] = useState("");

    useEffect(() => {
        if (mode === "edit" && workout) {
            setId(workout.id);
            setName(workout.name);
        } else {
            setName("");
        }
    }, [mode, workout]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const workout = {
                name: name,
            };
            setName("");
            await onSubmit(workout, id);
        } catch (err) {
            console.error("Error submitting data", err);
        }
        onClose();
    };

    return (
        <dialog id="my_modal_3" className="modal" open={isOpen}>
            <div className="modal-box">
                <h3 className="font-bold text-lg py-4">
                    {mode === "edit" ? "Edit Workout" : "Add Workout"}
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
                    <div className="mt-4 w-full flex justify-center">
                        <button className="btn btn-wide btn-outline btn-success">
                            {mode === "edit" ? "Save Changes" : "Add Workout"}
                        </button>
                    </div>
                </form>
            </div>
        </dialog>
    );
}

export default WorkoutForm;
