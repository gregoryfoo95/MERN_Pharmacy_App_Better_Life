import RegisterPage from "./RegisterPage";
import LoginPage from "./LoginPage";
import ForgotPassword from "./ForgotPassword";


export default function AuthPage() {
    return (
        <main>
            <h1>Authentication Page</h1>
            <LoginPage />
            <RegisterPage />
            <ForgotPassword />
        </main>
    )
}