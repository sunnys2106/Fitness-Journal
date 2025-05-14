import { Exercise } from "../types";
import ExerciseForm from "./ExerciseForm";
import duckSvg from "../assets/duck.svg";

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
        <div className="overflow-x-auto mt-10 rounded-2xl">
            {exercises.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-60 space-y-4">
                    <p className="text-2xl font-semibold text-gray-600">
                        Add an Exercise!
                    </p>
                    <img src={duckSvg} alt="My icon" className="w-16 h-16" />
                </div>
            ) : (
                <table className="table table-zebra rounded-2xl">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Weight</th>
                            <th scope="col">Sets</th>
                            <th scope="col">Reps</th>
                            <th scope="col">Additional Notes</th>
                            <th scope="col" className="text-right">
                                Update Exercise
                            </th>
                            <th scope="col" className="text-right">
                                Remove Exercise
                            </th>
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
                                <td className="text-right">
                                    <button
                                        className="btn btn-outline btn-warning"
                                        onClick={() =>
                                            handleOpen("edit", exercise)
                                        }
                                    >
                                        Update
                                    </button>
                                </td>
                                <td className="text-right">
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
            )}
        </div>
    );
}

export default ExerciseTable;
