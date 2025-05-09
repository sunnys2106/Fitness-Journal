import LoginRegisterForm from "../components/LoginRegisterForm";

function Login(): JSX.Element {
    return <LoginRegisterForm route="/api/token/" method="login" />;
}

export default Login;
