import { useRegister } from "@/hooks/useRegister";
import { RegisterForm } from "@/components/features/register/RegisterForm.tsx";

export default function RegisterPage() {
  const registerLogic = useRegister();

  return (
    <>
      <title>Cadastro | ETECH</title>
      <meta
        name="description"
        content="Crie sua conta na plataforma ETECH."
      />
      <main className="flex items-center justify-center min-h-screen p-4">
        <RegisterForm {...registerLogic} />
      </main>
    </>
  );
}