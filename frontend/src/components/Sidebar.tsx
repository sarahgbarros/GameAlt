import { Home, LogOut, User, X } from "lucide-react";
import { Link } from "react-router-dom"; // 1. IMPORTE O <Link>

type SidebarProps = {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
  // 2. REMOVIDO 'setCurrentPage'
};

function Sidebar({ isSidebarOpen, setIsSidebarOpen }: SidebarProps) { // 3. REMOVIDO 'setCurrentPage'
  
  // 4. A função 'navegar' não é mais necessária para links simples.

  // 5. Criamos uma função SÓ para o logout
  const handleLogout = () => {
    // Limpa a sessão do usuário
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    // Fecha a sidebar
    setIsSidebarOpen(false);
    // O <Link> fará a navegação
  };

  return (
    <aside
      className={`
        fixed top-0 left-0 z-40 w-64 h-full bg-gray-800 text-white 
        shadow-lg
        transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}
    >
      <div className="flex items-center justify-between h-16 px-4 bg-gray-900">
        <h2 className="text-xl font-bold text-white">ETECH</h2>
        <button
          onClick={() => setIsSidebarOpen(false)}
          className="text-gray-300 hover:text-white"
        >
          <X size={24} />
        </button>
      </div>

      <nav className="mt-4 p-4 flex flex-col space-y-2">
        {/* 6. TROCADO <button> por <Link> */}
        <Link
          to="/pagina1" // Rota definida no App.tsx
          onClick={() => setIsSidebarOpen(false)} // Só fecha a sidebar
          className="flex items-center gap-3 py-2 px-4 rounded hover:bg-gray-700 text-left"
        >
          <Home size={20} />
          <span>Início</span>
        </Link>
        
        {/* 7. TROCADO <button> por <Link> */}
        <Link
          to="/pagina2" // Rota definida no App.tsx
          onClick={() => setIsSidebarOpen(false)} // Só fecha a sidebar
          className="flex items-center gap-3 py-2 px-4 rounded hover:bg-gray-700 text-left"
        >
          <User size={20} />
          <span>Perfil</span>
        </Link>
        
        <hr className="border-gray-700" />
        
        {/* 8. TROCADO <button> por <Link> e usando o handleLogout */}
        <Link
          to="/login" // Rota de login
          onClick={handleLogout} // Limpa a sessão E fecha a sidebar
          className="flex items-center gap-3 py-2 px-4 rounded hover:bg-gray-700 text-left"
        >
          <LogOut size={20} />
          <span>Sair</span>
        </Link>
      </nav>
    </aside>
  );
}

export default Sidebar;