import { useState, useEffect } from "react";
import { Workout } from "../types";

type WorkoutFormProps = {
    workout: Workout | null;
    mode: "add" | "edit";
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (workout: Workout, id: number) => Promise<void>;
};

function WorkoutForm({
    workout,
    mode,
    isOpen,
    onClose,
    onSubmit,
}: WorkoutFormProps): JSX.Element {
    const [id, setId] = useState<number>(-1); //-1 probably needs change
    const [name, setName] = useState<string>("");

    useEffect(() => {
        if (mode === "edit" && workout) {
            if (workout.id) {
                setId(workout.id);
            }
            setName(workout.name);
        } else {
            setName("");
        }
    }, [mode, workout]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            if (!showNameError) {
                setNameTouched(false);
                const workout = {
                    name: name,
                    id: -1, //dummy var for ts: needs fix
                };
                setName("");
                await onSubmit(workout, id);
            }
        } catch (err) {
            console.error("Error submitting data", err);
        }
        onClose();
    };

    const [nameTouched, setNameTouched] = useState(false);
    const isValidName = /^[A-Za-z0-9 -]{1,30}$/.test(name);
    const showNameError = nameTouched && !isValidName;

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
                    <label
                        className={`my-4 input input-bordered flex items-center gap-2 ${
                            showNameError ? "border-2 border-red-500" : ""
                        }`}
                    >
                        <div className="label">
                            <span className="label-text">Name</span>
                        </div>
                        <input
                            type="text"
                            className="grow"
                            required
                            onBlur={() => setNameTouched(true)}
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                        />
                    </label>
                    {showNameError && (
                        <span className="text-red-500 text-sm ml-2">
                            Must contain only letters, numbers, spaces, or
                            dashes. 1-30 characters
                        </span>
                    )}
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
