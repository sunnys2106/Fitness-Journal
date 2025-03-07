import { useNavigate } from "react-router-dom";

function WorkoutTable({ workouts, onDelete, handleOpen }) {
    const navigate = useNavigate();
    return (
        <div className="overflow-x-auto mt-10">
            <table className="table table-zebra">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                    </tr>
                </thead>
                <tbody>
                    {workouts.map((workout) => (
                        <tr
                            key={workout.id}
                            className="hover cursor-pointer"
                            onClick={() => {
                                navigate("/workout", {
                                    state: {
                                        workoutId: workout.id,
                                        workoutName: workout.name,
                                    },
                                });
                            }}
                        >
                            <td>{workout.name}</td>
                            <td className="text-right space-x-5">
                                <button
                                    className="btn btn-outline btn-warning"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleOpen("edit", workout);
                                    }}
                                >
                                    Update
                                </button>
                                <button
                                    className="btn btn-outline btn-error"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onDelete(workout.id);
                                    }}
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

export default WorkoutTable;
