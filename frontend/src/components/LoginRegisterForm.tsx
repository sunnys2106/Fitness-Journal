import { useState } from "react";
import api from "../api";
import { useNavigate, Link } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import LoadingIndicator from "./LoadingIndicator";

type LoginRegisterFormProps = {
    route: string;
    method: "login" | "register";
};

function LoginRegisterForm({
    route,
    method,
}: LoginRegisterFormProps): JSX.Element {
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [loading, setLoading] = useState<boolean>(false);

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        setLoading(true);
        e.preventDefault();

        try {
            const payload =
                method === "login"
                    ? { username, password }
                    : { username, password, email };

            const res = await api.post(route, payload);
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/");
            } else {
                navigate("/login");
            }
        } catch (error: any) {
            alert(error?.response?.data?.detail || "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <dialog id="my_modal_3" className="modal" open={true}>
            <div className="modal-box">
                <h3 className="font-bold text-lg py-4">
                    {method === "login" ? "Login" : "Register"}
                </h3>
                <form method="dialog" onSubmit={handleSubmit}>
                    <label className="my-4 input input-bordered flex items-center gap-2">
                        <div className="label">
                            <span className="label-text">Username</span>
                        </div>
                        <input
                            className="form-input"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </label>
                    {method === "register" && (
                        <label className="my-4 input input-bordered flex items-center gap-2">
                            <div className="label">
                                <span className="label-text">Email</span>
                            </div>
                            <input
                                className="form-input"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </label>
                    )}

                    <label className="my-4 input input-bordered flex items-center gap-2">
                        <div className="label">
                            <span className="label-text">Password</span>
                        </div>
                        <input
                            className="form-input"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                    <div className="w-full flex justify-center">
                        {loading && <LoadingIndicator />}
                    </div>
                    <div className="mt-4 w-full flex justify-center">
                        <button
                            className="btn btn-wide btn-outline btn-info"
                            type="submit"
                            disabled={loading}
                        >
                            {loading
                                ? "Please wait..."
                                : method === "login"
                                ? "Login"
                                : "Register"}
                        </button>
                    </div>
                    {method === "login" ? (
                        <p className="text-center mt-4">
                            Don't have an account?{" "}
                            <Link
                                to="/register"
                                className="text-blue-500 underline"
                            >
                                Register here
                            </Link>
                        </p>
                    ) : (
                        <p className="text-center mt-4">
                            Already have an account?{" "}
                            <Link
                                to="/login"
                                className="text-blue-500 underline"
                            >
                                Login here
                            </Link>
                        </p>
                    )}
                </form>
            </div>
        </dialog>
    );
}

export default LoginRegisterForm;
