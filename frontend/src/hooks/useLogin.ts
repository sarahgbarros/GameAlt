// src/hooks/useLogin.ts
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { authService } from "../services/authService"; // Comentado por enquanto
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  password: z
    .string()
    .min(6, { message: "A senha deve ter no mínimo 6 caracteres" }),
});

export function useLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // 1. Validação com Zod
    const validation = loginSchema.safeParse({ email, password });
    if (!validation.success) {
      setError(validation.error.issues[0].message);
      setIsLoading(false);
      return;
    }

    // 2. Simula um delay de rede (1 segundo)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // 3. Lógica de Login MOCK (Simulada)
    if (email === "user@test.com" && password === "123456") {
      const fakeToken = "xyz.fake-token.123";
      const fakeUser = {
        id: "1",
        name: "Usuário Teste",
        email: "user@test.com",
        plan: "premium",
      };

      localStorage.setItem("authToken", fakeToken);
      localStorage.setItem("userData", JSON.stringify(fakeUser));

      navigate("/home");
    } else {
      setError("Usuário ou senha inválidos.");
    }

    /* --- Código da API Real (Comentado) ---
    try {
      const { token, user } = await authService.login({ email, password });
      localStorage.setItem("authToken", token);
      localStorage.setItem("userData", JSON.stringify(user));
      console.log("Login Bem-sucedido!", user.name);
      navigate("/home"); // Navega para /home
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
    */

    // 4. Garante que o loading termine (para o mock)
    setIsLoading(false);
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    error,
    isLoading,
    handleSubmit,
  };
}
