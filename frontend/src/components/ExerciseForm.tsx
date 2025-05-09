import { useState, useEffect } from "react";
import { Exercise } from "../types";

type ExerciseFormProps = {
    exercise: Exercise | null;
    mode: "add" | "edit";
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (exercise: Exercise, id: number) => Promise<void>;
};

function ExerciseForm({
    exercise,
    mode,
    isOpen,
    onClose,
    onSubmit,
}: ExerciseFormProps): JSX.Element {
    const [id, setId] = useState<number>(-1);
    const [name, setName] = useState<string>("");
    const [weight, setWeight] = useState<number>(0);
    const [sets, setSets] = useState<number>(0);
    const [reps, setReps] = useState<number>(0);
    const [notes, setNotes] = useState<string>("");

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
            setWeight(0);
            setSets(0);
            setReps(0);
            setNotes("");
        }
    }, [mode, exercise]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const exercise = {
                name: name,
                weight: weight,
                sets: sets,
                reps: reps,
                notes: notes,
                id: -1, //dummy var for ts: needs fix
            };
            setName("");
            setWeight(0);
            setSets(0);
            setReps(0);
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
                                setWeight(Number(e.target.value));
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
                                setSets(Number(e.target.value));
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
                                setReps(Number(e.target.value));
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
