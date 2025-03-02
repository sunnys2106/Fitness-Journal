import { useNavigate } from "react-router-dom";

function Navbar({ logout, handleOpen, workoutMode }) {
    const navigate = useNavigate();

    return (
        <div className="navbar bg-base-100 mt-2">
            <div className="navbar-start">
                <button
                    className="btn btn-outline btn-success"
                    onClick={() => handleOpen("add")}
                >
                    {workoutMode ? "Create a Workout" : "Create an Exercise"}
                </button>
            </div>
            <div
                className="navbar-center"
                onClick={() => {
                    navigate("/");
                }}
            >
                <p className="btn btn-ghost text-xl">
                    {workoutMode ? "Fitness Journal" : "Back to Workouts"}
                </p>
            </div>
            <div className="navbar-end">
                <button className="btn btn-outline btn-info" onClick={logout}>
                    Logout
                </button>
            </div>
        </div>
    );
}

export default Navbar;
