import RegisterPage from "./RegisterPage";
import LoginPage from "./LoginPage";
import ContactForm from "./ContactForm";

export default function AuthPage() {
    return (
        <main>
            <h1>Authentication Page</h1>
            <LoginPage />
            <RegisterPage />
        </main>
    )
}