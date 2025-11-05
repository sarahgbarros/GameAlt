import { useRegister } from "../../../hooks/useRegister";
import { useTheme } from "../../../contexts/ThemeContext";
import { useNavigate } from "react-router-dom";
import {
  User,
  AtSign,
  Lock,
  Loader2,
  AlertCircle,
  CheckCircle,
  ArrowLeft,
} from "lucide-react";

type RegisterFormProps = ReturnType<typeof useRegister>;

export function RegisterForm({
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  error,
  successMessage,
  isLoading,
  handleSubmit,
}: RegisterFormProps) {
  const { theme } = useTheme();

  const inputClassName = `
    w-full pl-10 pr-3 py-2
    border ${theme === "light" ? "border-gray-300" : "border-gray-600"}
    rounded-md shadow-sm
    ${
      theme === "light"
        ? "bg-white text-gray-900 placeholder-gray-400"
        : "bg-gray-700 text-white placeholder-gray-500"
    }
    focus:outline-none focus:ring-2 ${
      theme === "light" ? "focus:ring-blue-500" : "focus:ring-blue-400"
    }
    disabled:opacity-50
  `;

  const labelClassName = `
    block text-sm font-medium mb-1
    ${theme === "light" ? "text-gray-700" : "text-gray-300"}
  `;

  const iconSpanClassName = "absolute inset-y-0 left-0 flex items-center pl-3";

  const helperTextClassName = `
    mt-1.5 text-xs
    ${theme === "light" ? "text-gray-500" : "text-gray-400"}
  `;
  const navigate = useNavigate();
  return (
    <div
      className={`
        w-full max-w-md p-8 space-y-6
        ${theme === "light" ? "bg-white" : "bg-gray-800"}
        rounded-xl shadow-2xl
        transition-colors duration-300
        relative
      `}
    >
      {/* --- Cabeçalho --- */}
      <div className="text-center relative">
        <button
          type="button"
          onClick={() => navigate("/login")}
          className={`
            absolute left-0 top-1/2 -translate-y-1/2 
            p-2 rounded-full
            ${
              theme === "light"
                ? "text-gray-500 hover:bg-gray-100"
                : "text-gray-400 hover:bg-gray-700"
            }
            transition-colors
          `}
          aria-label="Voltar para login"
        >
          <ArrowLeft size={20} />
        </button>
        <h2
          className={`
          text-3xl font-extrabold
          ${theme === "light" ? "text-gray-900" : "text-white"}
        `}
        >
          Crie sua conta
        </h2>
      </div>

      {/* --- Área de Erro (Vermelha) --- */}
      {error && (
        <div
          className={`
            flex items-center gap-3 p-3
            ${
              theme === "light"
                ? "bg-red-50 border-red-200"
                : "bg-red-900/30 border-red-500/30"
            }
            border rounded-lg
          `}
          aria-live="polite"
        >
          <AlertCircle className="text-red-500" size={20} />
          <p
            className={`
            text-sm font-medium
            ${theme === "light" ? "text-red-600" : "text-red-300"}
          `}
          >
            {error}
          </p>
        </div>
      )}

      {/* --- Área de Sucesso (Verde) --- */}
      {successMessage && (
        <div
          className={`
            flex items-center gap-3 p-3 
            ${
              theme === "light"
                ? "bg-green-50 border-green-200"
                : "bg-green-900/30 border-green-500/30"
            } 
            border rounded-lg
          `}
        >
          <CheckCircle className="text-green-500" size={20} />
          <p
            className={`
            text-sm font-medium 
            ${theme === "light" ? "text-green-600" : "text-green-300"}
          `}
          >
            {successMessage}
          </p>
        </div>
      )}

      {/* --- Formulário --- */}
      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* --- Campo de Nome --- */}
        <div>
          <label htmlFor="name" className={labelClassName}>
            Nome
          </label>
          <div className="relative">
            <span className={iconSpanClassName}>
              <User className="h-5 w-5 text-gray-400" />
            </span>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isLoading}
              placeholder="Seu nome completo"
              required
              className={inputClassName}
            />
          </div>
        </div>

        {/* --- Campo de Email --- */}
        <div>
          <label htmlFor="email" className={labelClassName}>
            Email
          </label>
          <div className="relative">
            <span className={iconSpanClassName}>
              <AtSign className="h-5 w-5 text-gray-400" />
            </span>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              placeholder="seu@email.com"
              required
              className={inputClassName}
            />
          </div>
        </div>

        {/* --- Campo de Senha --- */}
        <div>
          <label htmlFor="password" className={labelClassName}>
            Senha
          </label>
          <div className="relative">
            <span className={iconSpanClassName}>
              <Lock className="h-5 w-5 text-gray-400" />
            </span>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              placeholder="••••••••"
              required
              className={inputClassName}
            />
          </div>
          <p className={helperTextClassName}>Mínimo de 8 caracteres.</p>
        </div>

        {/* --- Campo de Confirmar Senha --- */}
        <div>
          <label htmlFor="confirmPassword" className={labelClassName}>
            Confirmar Senha
          </label>
          <div className="relative">
            <span className={iconSpanClassName}>
              <Lock className="h-5 w-5 text-gray-400" />
            </span>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={isLoading}
              placeholder="••••••••"
              required
              className={inputClassName}
            />
          </div>
        </div>

        {/* --- Botão de Envio --- */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading || !!successMessage}
            className={`
              w-full flex justify-center py-2.5 px-4
              border border-transparent rounded-md shadow-sm
              text-sm font-medium text-white
              ${
                theme === "light"
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-blue-500 hover:bg-blue-600"
              }
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
              disabled:opacity-60 disabled:cursor-not-allowed
              transition-all
            `}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin" />
                Registrando...
              </span>
            ) : (
              "Criar conta"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
