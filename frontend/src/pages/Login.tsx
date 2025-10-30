import { useState } from "react";

type PaginaLoginProps = {
  setCurrentPage: (page: string) => void;
};

function Login({ setCurrentPage }: PaginaLoginProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const openHelpModal = () => {
    setShowHelp(true);
  };

  const closeHelpModal = () => {
    setShowHelp(false);
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 ${
        isDarkMode ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      {/* Help Modal */}
      {showHelp && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/20 flex items-center justify-center z-50">
          <div
            className={`relative w-full max-w-md p-6 rounded-2xl ${
              isDarkMode
                ? "bg-gray-800/95 text-gray-100 shadow-2xl shadow-gray-900/50"
                : "bg-white/95 text-gray-900 shadow-xl"
            }`}
          >
            <button
              onClick={closeHelpModal}
              className={`absolute top-4 right-4 ${
                isDarkMode
                  ? "text-gray-400 hover:text-gray-200"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <h2
              className={`text-2xl font-bold mb-4 ${
                isDarkMode ? "text-gray-100" : "text-gray-900"
              }`}
            >
              Instruções de Acesso
            </h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <h3
                  className={`font-medium ${
                    isDarkMode ? "text-gray-200" : "text-gray-800"
                  }`}
                >
                  Como fazer login:
                </h3>
                <p
                  className={`text-sm ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  1. Digite seu email no primeiro campo
                </p>
                <p
                  className={`text-sm ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  2. Digite sua senha no segundo campo
                </p>
                <p
                  className={`text-sm ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  3. Clique no botão "Entrar"
                </p>
              </div>
              <div className="space-y-2">
                <h3
                  className={`font-medium ${
                    isDarkMode ? "text-gray-200" : "text-gray-800"
                  }`}
                >
                  Dicas importantes:
                </h3>
                <p
                  className={`text-sm ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  • Você pode usar o Google para login rápido
                </p>
                <p
                  className={`text-sm ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  • Se esqueceu sua senha, clique em "Esqueceu a senha?"
                </p>
                <p
                  className={`text-sm ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  • Para maior conforto, ajuste o modo escuro/claro
                </p>
              </div>
              <div className="space-y-2">
                <h3
                  className={`font-medium ${
                    isDarkMode ? "text-gray-200" : "text-gray-800"
                  }`}
                >
                  Precisa de ajuda?
                </h3>
                <p
                  className={`text-sm ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Entre em contato com nosso suporte:
                </p>
                <p
                  className={`text-sm ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  suporte@etech.com
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div
        className={`w-full max-w-lg rounded-2xl p-8 md:p-10 shadow-lg ${
          isDarkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1
            className={`text-3xl font-bold mb-2 ${
              isDarkMode ? "text-gray-100" : "text-gray-900"
            }`}
          >
            Bem-vindo ao ETECH
          </h1>
          <p className={isDarkMode ? "text-gray-300" : "text-gray-600"}>
            Acesse sua conta para continuar
          </p>
        </div>

        {/* Social Login Buttons */}
        <div className="space-y-3 mb-8">
          <button
            className={`w-full flex items-center justify-center gap-3 px-4 py-3 border rounded-lg transition-colors ${
              isDarkMode
                ? "border-gray-700 hover:bg-gray-700/50 text-gray-200"
                : "border-gray-300 hover:bg-gray-50 text-gray-700"
            }`}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Continuar com Google
          </button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div
                className={`w-full border-t ${
                  isDarkMode ? "border-gray-700" : "border-gray-300"
                }`}
              ></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span
                className={`px-2 ${
                  isDarkMode
                    ? "bg-gray-800 text-gray-400"
                    : "bg-white text-gray-500"
                }`}
              >
                ou continue com email
              </span>
            </div>
          </div>
        </div>

        {/* Login Form */}
        <form className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className={`block text-sm font-medium mb-1 ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className={`h-5 w-5 ${
                    isDarkMode ? "text-gray-500" : "text-gray-400"
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </div>
              <input
                id="email"
                type="email"
                className={`w-full pl-10 pr-4 py-3 rounded-lg transition-colors ${
                  isDarkMode
                    ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
                    : "border-gray-300 text-gray-900 placeholder-gray-500"
                } focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                placeholder="seu@email.com"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label
                htmlFor="password"
                className={`block text-sm font-medium ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Senha
              </label>
              <button
                type="button"
                className={`text-sm font-medium ${
                  isDarkMode
                    ? "text-indigo-400 hover:text-indigo-300"
                    : "text-indigo-600 hover:text-indigo-500"
                }`}
              >
                Esqueceu a senha?
              </button>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className={`h-5 w-5 ${
                    isDarkMode ? "text-gray-500" : "text-gray-400"
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                id="password"
                type="password"
                className={`w-full pl-10 pr-4 py-3 rounded-lg transition-colors ${
                  isDarkMode
                    ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
                    : "border-gray-300 text-gray-900 placeholder-gray-500"
                } focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                placeholder="Digite sua senha"
              />
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="remember-me"
              type="checkbox"
              className={`h-4 w-4 rounded transition-colors ${
                isDarkMode
                  ? "border-gray-600 text-indigo-500"
                  : "border-gray-300 text-indigo-600"
              } focus:ring-indigo-500`}
            />
            <label
              htmlFor="remember-me"
              className={`ml-2 block text-sm ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Manter conectado
            </label>
          </div>

          <button
            type="button"
            onClick={() => setCurrentPage("pagina1")}
            className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white transition-all ${
              isDarkMode
                ? "bg-indigo-500 hover:bg-indigo-400 focus:ring-offset-gray-800"
                : "bg-indigo-600 hover:bg-indigo-700 focus:ring-offset-white"
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
          >
            Entrar
          </button>
        </form>

        {/* Footer */}
        <div className={`mt-8 text-center space-y-4`}>
          <p
            className={`text-sm ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Ainda não tem uma conta?{" "}
            <button
              className={`font-medium ${
                isDarkMode
                  ? "text-indigo-400 hover:text-indigo-300"
                  : "text-indigo-600 hover:text-indigo-500"
              }`}
            >
              Criar conta
            </button>
          </p>
          <p
            className={`text-xs ${
              isDarkMode ? "text-gray-500" : "text-gray-500"
            }`}
          >
            Ao continuar, você concorda com nossos{" "}
            <button
              className={`${
                isDarkMode
                  ? "text-indigo-400 hover:text-indigo-300"
                  : "text-indigo-600 hover:text-indigo-500"
              }`}
            >
              Termos de Serviço
            </button>{" "}
            e{" "}
            <button
              className={`${
                isDarkMode
                  ? "text-indigo-400 hover:text-indigo-300"
                  : "text-indigo-600 hover:text-indigo-500"
              }`}
            >
              Política de Privacidade
            </button>
          </p>
        </div>

        {/* Dark Mode Toggle and Help Button */}
        <div className="fixed bottom-4 right-4 flex items-center space-x-4">
          <button
            onClick={openHelpModal}
            className={`p-2 rounded-full transition-all ${
              isDarkMode
                ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            aria-label="Ajuda"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full transition-all ${
              isDarkMode
                ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            aria-label="Alternar modo escuro"
          >
            {isDarkMode ? (
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
