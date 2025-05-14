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
            if (!showUsernameError && !showEmailError && !showPasswordError) {
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
            }
        } catch (error: any) {
            alert(error?.response?.data?.detail || "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    const [usernameTouched, setusernameTouched] = useState(false);
    const isValidUsername = /^[A-Za-z0-9 -]{3,30}$/.test(username);
    const showUsernameError = usernameTouched && !isValidUsername;

    const [emailTouched, setemailTouched] = useState(false);
    const isValidEmail = (
        document.getElementById("emailInput") as HTMLInputElement
    )?.checkValidity();
    const showEmailError = emailTouched && !isValidEmail;

    const [passwordTouched, setpasswordTouched] = useState(false);
    const isValidPassword = (
        document.getElementById("passwordInput") as HTMLInputElement
    )?.checkValidity();
    const showPasswordError = passwordTouched && !isValidPassword;

    return (
        <dialog id="my_modal_3" className="modal" open={true}>
            <div className="modal-box">
                <h3 className="font-bold text-lg py-4">
                    {method === "login" ? "Login" : "Register"}
                </h3>
                <form method="dialog" onSubmit={handleSubmit}>
                    <label
                        className={`input input-bordered flex items-center gap-2 ${
                            showUsernameError ? "border-2 border-red-500" : ""
                        }`}
                    >
                        <div className="label">
                            <span className="label-text ">Username</span>
                        </div>
                        <input
                            className="form-input grow"
                            type="text"
                            value={username}
                            required
                            onBlur={() => setusernameTouched(true)}
                            onChange={(e) => setUsername(e.target.value)}
                            title="Only letters, numbers, spaces, or dashes. Max 30 characters."
                        />
                    </label>
                    {showUsernameError && (
                        <span className="text-red-500 text-sm ml-2">
                            Must contain only letters, numbers, spaces, or
                            dashes. 3-30 characters
                        </span>
                    )}

                    {method === "register" && (
                        <>
                            <label
                                className={`mt-5 input input-bordered flex items-center gap-2 ${
                                    showEmailError
                                        ? " border-2 border-red-500"
                                        : ""
                                }`}
                            >
                                <div className="label">
                                    <span className="label-text">Email</span>
                                </div>
                                <input
                                    id="emailInput"
                                    className="form-input grow"
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    onBlur={() => setemailTouched(true)}
                                />
                            </label>
                            {showEmailError && (
                                <span className="text-red-500 text-sm ml-2">
                                    Email address is invalid
                                </span>
                            )}
                        </>
                    )}

                    <label
                        className={`mt-5 input input-bordered flex items-center gap-2 ${
                            showPasswordError ? "border-2 border-red-500" : ""
                        }`}
                    >
                        <div className="label">
                            <span className="label-text">Password</span>
                        </div>
                        <input
                            id="passwordInput"
                            className="form-input grow"
                            type="password"
                            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{9,}$"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            onBlur={() => setpasswordTouched(true)}
                            title="Must be more than 8 characters, include a number, lowercase letter, uppercase letter"
                        />
                    </label>
                    {showPasswordError && (
                        <span className="text-red-500 text-sm ml-2">
                            Must be over 8 characters, including number,
                            lowercase and uppercase letter
                        </span>
                    )}

                    <div className="w-full flex justify-center">
                        {loading && <LoadingIndicator />}
                    </div>
                    <div className="mt-5  w-full flex justify-center">
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
