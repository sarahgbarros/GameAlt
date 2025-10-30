type PaginaLoginProps = {
  setCurrentPage: (page: string) => void;
};

function Login({ setCurrentPage }: PaginaLoginProps) {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <div className="p-10 bg-white rounded-lg shadow-xl text-center">
        <h2 className="text-2xl font-bold mb-6">Login ETECH</h2>
        <button
          onClick={() => setCurrentPage('pagina1')}
          className="w-full px-4 py-2 font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          Simular Login (Ir para Página 1)
        </button>
      </div>
    </div>
  );
}

export default Login;
