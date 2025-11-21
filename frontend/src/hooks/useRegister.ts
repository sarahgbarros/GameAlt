import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { authService } from "../services/authService"; // Comentado por enquanto
import { z } from "zod";

const registerSchema = z
  .object({
    name: z
      .string()
      .min(3, { message: "O nome deve ter pelo menos 3 caracteres" }),
    email: z.string().email({ message: "Email inválido" }),
    password: z
      .string()
      .min(8, { message: "A senha deve ter no mínimo 8 caracteres" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não conferem",
    path: ["confirmPassword"],
  });

export function useRegister() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null); 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    const validation = registerSchema.safeParse({
      name,
      email,
      password,
      confirmPassword,
    });

    if (!validation.success) {
      setError(validation.error.issues[0].message);
      setIsLoading(false);
      return;
    }

    await new Promise((resolve) => setTimeout(resolve, 1500)); 

    if (email === "user@test.com") {
      setError("Este email já está em uso.");
      setIsLoading(false);
      return;
    }

    console.log("Cadastro simulado com sucesso:", { name, email, password });
    setSuccessMessage(
      "Cadastro realizado com sucesso! Redirecionando para o login..."
    );

    setTimeout(() => {
      navigate("/login");
    }, 2000);

    /* --- CÓDIGO REAL DA API (Para quando o back-end estiver pronto) ---
    try {
      const newUser = await authService.register({
        name: validation.data.name,
        email: validation.data.email,
        password: validation.data.password,
      });

      console.log('Usuário registrado:', newUser.name);
      setSuccessMessage("Cadastro realizado com sucesso! Redirecionando para o login...");
      
      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
    */
  };

  return {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    isLoading,
    error,
    successMessage,
    handleSubmit,
  };
}
