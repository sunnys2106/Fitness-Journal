function Navbar({ logout, handleOpen, workoutMode }) {
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
            <div className="navbar-center">
                <p className="btn btn-ghost text-xl">Fitness Journal</p>
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
