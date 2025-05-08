import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import LoadingIndicator from "./LoadingIndicator";

function LoginRegisterForm({ route, method }) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            const res = await api.post(route, { username, password, email });
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/");
            } else {
                navigate("/login");
            }
        } catch (error) {
            alert(error);
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
                        <button className="btn btn-wide btn-outline btn-info">
                            {method === "login" ? "Login" : "Register"}
                        </button>
                    </div>
                    {method === "login" ? (
                        <p className="text-center mt-4">
                            Don't have an account?{" "}
                            <a
                                href="/register"
                                className="text-blue-500 underline"
                            >
                                Register here
                            </a>
                        </p>
                    ) : (
                        <p className="text-center mt-4">
                            Already have an account?{" "}
                            <a
                                href="/login"
                                className="text-blue-500 underline"
                            >
                                Login here
                            </a>
                        </p>
                    )}
                </form>
            </div>
        </dialog>
    );
}

export default LoginRegisterForm;
