import { useLogin } from "../hooks/useLogin";
import { LoginForm } from "../components/features/login/LoginForm";

export default function LoginPage() {
  const loginLogic = useLogin();

  return (
    <>
      <title>Login | ETECH</title>
      <meta
        name="description"
        content="Faça login na plataforma ETECH para acessar seus projetos."
      />
      <main
        className="
        flex items-center justify-center min-h-screen 
        bg-gray-100 dark:bg-gray-900 
        transition-colors duration-300
      "
      >
        <LoginForm {...loginLogic} />
      </main>
    </>
  );
}
