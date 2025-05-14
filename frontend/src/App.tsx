import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import WorkoutPage from "./pages/WorkoutPage";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import ExercisePage from "./pages/ExercisePage";
import Rectangle from "./components/Rectangle";

function Logout(): JSX.Element {
    localStorage.clear();
    return <Navigate to="/login" />;
}

function RegisterAndLogout(): JSX.Element {
    localStorage.clear();
    return <Register />;
}

function App(): JSX.Element {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <Rectangle>
                            <ProtectedRoute>
                                <WorkoutPage />
                            </ProtectedRoute>
                        </Rectangle>
                    }
                />
                <Route
                    path="/home"
                    element={
                        <Rectangle>
                            <ProtectedRoute>
                                <WorkoutPage />
                            </ProtectedRoute>
                        </Rectangle>
                    }
                />
                <Route
                    path="/workout"
                    element={
                        <Rectangle>
                            <ProtectedRoute>
                                <ExercisePage />
                            </ProtectedRoute>
                        </Rectangle>
                    }
                />
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/register" element={<RegisterAndLogout />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
