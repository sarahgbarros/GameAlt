import { useRegister } from "../hooks/useRegister";
import { RegisterForm } from "../components/features/register/RegisterForm";
import { useTheme } from "../contexts/ThemeContext";

export default function RegisterPage() {
  const registerLogic = useRegister();
  const { theme } = useTheme();

  return (
    <>
      <title>Cadastro | ETECH</title>
      <meta name="description" content="Crie sua conta na plataforma ETECH." />

      <main
        className={`
          flex items-center justify-center min-h-screen 
          ${theme === "light" ? "bg-gray-100" : "bg-gray-900"} 
          transition-colors duration-300 py-12
        `}
      >
        <RegisterForm {...registerLogic} />
      </main>
    </>
  );
}
