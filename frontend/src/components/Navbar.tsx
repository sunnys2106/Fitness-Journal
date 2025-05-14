import { useNavigate } from "react-router-dom";
import { Exercise, Workout } from "../types";

type NavbarProps<T> = {
    logout: () => void;
    handleOpen: (mode: "add" | "edit", item?: T) => void;
    workoutName: string | null;
};

function Navbar<T>({
    logout,
    handleOpen,
    workoutName,
}: NavbarProps<T>): JSX.Element {
    const navigate = useNavigate();

    return (
        <div className="navbar bg-base-100 mt-2 rounded-xl ">
            <div className="navbar-start">
                <button
                    className="btn btn-outline btn-success"
                    onClick={() => handleOpen("add")}
                >
                    {workoutName ? "Create an Exercise" : "Create a Workout"}
                </button>
            </div>
            <div className="navbar-center">
                <p className="btn btn-ghost text-xl">
                    {workoutName ? workoutName : "My Workouts"}
                </p>
            </div>
            <div className="navbar-end space-x-5">
                {workoutName ? (
                    <button
                        className="btn btn-outline"
                        onClick={() => {
                            navigate("/");
                        }}
                    >
                        Back to My Workouts
                    </button>
                ) : null}
                <button className="btn btn-outline btn-info" onClick={logout}>
                    Logout
                </button>
            </div>
        </div>
    );
}

export default Navbar;
