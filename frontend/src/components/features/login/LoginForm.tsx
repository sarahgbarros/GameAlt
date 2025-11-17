import { Link } from "react-router-dom";
import { useLogin } from "../../../hooks/useLogin";
import { useTheme } from "../../../contexts/ThemeContext"; // 1. IMPORTAR O useTheme
import { AtSign, Lock, Loader2, AlertCircle } from "lucide-react"; // 2. IMPORTAR OS ÍCONES

type LoginFormProps = ReturnType<typeof useLogin>;

export function LoginForm({
  email,
  setEmail,
  password,
  setPassword,
  error,
  isLoading,
  handleSubmit,
}: LoginFormProps) {
  const { theme } = useTheme(); // 3. CHAMAR O HOOK PARA OBTER A VARIÁVEL 'theme'

  // Classes reutilizáveis para os inputs (para manter o código limpo)
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
      <div className="text-center">
        <h2
          className={`
          text-3xl font-extrabold
          ${theme === "light" ? "text-gray-900" : "text-white"}
        `}
        >
          Acesse sua conta
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

      {/* --- Formulário --- */}
      <form className="space-y-6" onSubmit={handleSubmit}>
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
          <p className={helperTextClassName}>
            Use o email cadastrado no sistema.
          </p>
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
          <p className={helperTextClassName}>Mínimo de 6 caracteres.</p>
        </div>

        {/* --- Links Extras (Esqueci a senha) --- */}
        <div className="flex items-center justify-end">
          <div className="text-sm">
            <a
              href="#" // TODO: Mudar para a rota de "esqueci a senha"
              className={`
                font-medium
                ${
                  theme === "light"
                    ? "text-blue-600 hover:text-blue-500"
                    : "text-blue-400 hover:text-blue-300"
                }
              `}
            >
              Esqueceu a senha?
            </a>
          </div>
        </div>

        {/* --- Botão de Envio --- */}
        <div>
          <button
            type="submit"
            disabled={isLoading}
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
                Entrando...
              </span>
            ) : (
              "Entrar"
            )}
          </button>
        </div>
      </form>

      {/* --- Link para Cadastro --- */}
      <p
        className={`
        text-center text-sm
        ${theme === "light" ? "text-gray-600" : "text-gray-400"}
      `}
      >
        Não tem uma conta?{" "}
        <Link
          to="/register"
          className={`
            font-medium
            ${
              theme === "light"
                ? "text-blue-600 hover:text-blue-500"
                : "text-blue-400 hover:text-blue-300"
            }
          `}
        >
          Cadastre-se
        </Link>
      </p>
    </div>
  );
}
