function WorkoutTable({ workouts, onDelete, handleOpen }) {
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
                        <tr key={workout.id} className="hover">
                            <td>{workout.name}</td>
                            <td>
                                <button
                                    className="btn btn-outline btn-warning"
                                    onClick={() => handleOpen("edit", workout)}
                                >
                                    Update
                                </button>
                            </td>
                            <td>
                                <button
                                    className="btn btn-outline btn-error"
                                    onClick={() => onDelete(workout.id)}
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
