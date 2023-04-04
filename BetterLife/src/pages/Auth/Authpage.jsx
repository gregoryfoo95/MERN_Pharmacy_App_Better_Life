import RegisterPage from "./RegisterPage";
import LoginPage from "./LoginPage";
import ForgotPassword from "./ForgotPassword";


export default function AuthPage({ setUser }) {
    return (
        <main>
            <h1>Authentication Page</h1>
            <LoginPage setUser={setUser}/>
            <RegisterPage />
            <ForgotPassword />
        </main>
    )
}