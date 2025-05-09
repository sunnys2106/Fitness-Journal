import { Exercise } from "../types";

type ExerciseTable = {
    exercises: Exercise[];
    onDelete: (id: number) => Promise<void>;
    handleOpen: (mode: "add" | "edit", exercise?: Exercise) => void;
};

function ExerciseTable({
    exercises,
    onDelete,
    handleOpen,
}: ExerciseTable): JSX.Element {
    return (
        <div className="overflow-x-auto mt-10">
            <table className="table table-zebra">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Weight</th>
                        <th scope="col">Sets</th>
                        <th scope="col">Reps</th>
                        <th scope="col">Additional Notes</th>
                        <th scope="col">Update Exercise</th>
                        <th scope="col">Remove Exercise</th>
                    </tr>
                </thead>
                <tbody>
                    {exercises.map((exercise) => (
                        <tr key={exercise.id} className="hover">
                            <td>{exercise.name}</td>
                            <td>{exercise.weight}</td>
                            <td>{exercise.sets}</td>
                            <td>{exercise.reps}</td>
                            <td>{exercise.notes}</td>
                            <td>
                                <button
                                    className="btn btn-outline btn-warning"
                                    onClick={() => handleOpen("edit", exercise)}
                                >
                                    Update
                                </button>
                            </td>
                            <td>
                                <button
                                    className="btn btn-outline btn-error"
                                    onClick={() => onDelete(exercise.id)}
                                >
                                    Remove
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ExerciseTable;
