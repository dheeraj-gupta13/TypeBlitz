import Header from "../components/header";
import LoginForm from "../components/loginForm";
import RegisterForm from "../components/registerForm";

export default function Login() {
  return (
    <div>
      <Header fontFamily={"sans-sarif"} />
      <div className="text-white flex flex-row  gap-20 items-center justify-center py-20">
        <RegisterForm />
        <LoginForm />
      </div>
    </div>
  );
}
