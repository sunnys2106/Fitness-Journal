import LoginRegisterForm from "../components/LoginRegisterForm";

function Register(): JSX.Element {
    return <LoginRegisterForm route="/api/user/register/" method="register" />;
}

export default Register;
