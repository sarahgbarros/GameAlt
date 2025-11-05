// src/pages/Login.tsx
import { useLogin } from "../hooks/useLogin";
import { LoginForm } from "../components/features/login/LoginForm";
import { useTheme } from "../contexts/ThemeContext"; // 1. IMPORTE O HOOK DE TEMA

export default function LoginPage() {
  const loginLogic = useLogin();
  const { theme } = useTheme(); // 2. CHAME O HOOK PARA PEGAR O TEMA ATUAL

  return (
    <>
      <title>Login | ETECH</title>
      <meta
        name="description"
        content="Faça login na plataforma ETECH para acessar seus projetos."
      />
      <main
        className={`
          flex items-center justify-center min-h-screen 
          ${theme === "light" ? "bg-gray-100" : "bg-gray-900"} 
          transition-colors duration-300
        `}
      >
        <LoginForm {...loginLogic} />
      </main>
    </>
  );
}
