// src/components/LoginForm.tsx

// 1. IMPORTS
import { useLogin } from '../../../hooks/useLogin';    
import { useTheme } from '../../../context/ThemeContext'; 
import { 
  AtSign,       
  Lock,         
  Sun,          
  Moon,         
  Loader2,      
  AlertCircle   
} from 'lucide-react';

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
  
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="
      w-full max-w-md p-8 space-y-6 
      bg-white dark:bg-gray-800 
      rounded-xl shadow-2xl
      transition-colors duration-300
      relative
    ">
      
      {/* --- Botão de Tema (Modo Dark) --- */}
      <button 
        onClick={toggleTheme} 
        className="
          absolute top-4 right-4 p-2 rounded-full 
          text-gray-500 dark:text-gray-400
          hover:bg-gray-100 dark:hover:bg-gray-700
          transition-colors
        "
        aria-label="Mudar tema"
      >
        {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
      </button>

      {/* --- Cabeçalho --- */}
      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
          Acesse sua conta
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Bem-vindo de volta!
        </p>
      </div>

      {/* --- Área de Erro --- */}
      {error && (
        <div 
          className="
            flex items-center gap-3 p-3 
            bg-red-50 dark:bg-red-900/30 
            border border-red-200 dark:border-red-500/30 
            rounded-lg
          "
          aria-live="polite"
        >
          <AlertCircle className="text-red-500" size={20} />
          <p className="text-sm font-medium text-red-600 dark:text-red-300">
            {error}
          </p>
        </div>
      )}

      {/* --- Formulário --- */}
      <form className="space-y-6" onSubmit={handleSubmit}>
        
        {/* --- Campo de Email --- */}
        <div>
          <label 
            htmlFor="email" 
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Email
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
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
              className="
                w-full pl-10 pr-3 py-2 
                border border-gray-300 dark:border-gray-600
                rounded-md shadow-sm 
                bg-white dark:bg-gray-700
                text-gray-900 dark:text-white
                placeholder-gray-400 dark:placeholder-gray-500
                focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
                disabled:opacity-50
              "
            />
          </div>
          <p className="mt-1.5 text-xs text-gray-500 dark:text-gray-400">
            Use o email cadastrado no sistema.
          </p>
        </div>

        {/* --- Campo de Senha --- */}
        <div>
          <label 
            htmlFor="password" 
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Senha
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
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
              className="
                w-full pl-10 pr-3 py-2 
                border border-gray-300 dark:border-gray-600
                rounded-md shadow-sm 
                bg-white dark:bg-gray-700
                text-gray-900 dark:text-white
                placeholder-gray-400 dark:placeholder-gray-500
                focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
                disabled:opacity-50
              "
            />
          </div>
          <p className="mt-1.5 text-xs text-gray-500 dark:text-gray-400">
            Mínimo de 6 caracteres.
          </p>
        </div>

        {/* --- Links Extras (Ex: Esqueci a senha) --- */}
        <div className="flex items-center justify-end">
          <div className="text-sm">
            <a 
              href="#" // TODO: Mudar para a rota de "esqueci a senha"
              className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
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
            className="
              w-full flex justify-center py-2.5 px-4 
              border border-transparent rounded-md shadow-sm 
              text-sm font-medium text-white 
              bg-blue-600 hover:bg-blue-700 
              dark:bg-blue-500 dark:hover:bg-blue-600
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
              disabled:opacity-60 disabled:cursor-not-allowed
              transition-all
            "
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin" />
                Entrando...
              </span>
            ) : (
              'Entrar'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;