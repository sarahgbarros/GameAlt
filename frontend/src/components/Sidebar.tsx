import { Home, LogOut, User, X } from "lucide-react";

type SidebarProps = {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
  setCurrentPage: (page: string) => void;
};

function Sidebar({ isSidebarOpen, setIsSidebarOpen, setCurrentPage }: SidebarProps) {
  
  const navegar = (pagina: string) => {
    setCurrentPage(pagina);
    setIsSidebarOpen(false);
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
        <button
          onClick={() => navegar('pagina1')}
          className="flex items-center gap-3 py-2 px-4 rounded hover:bg-gray-700 text-left"
        >
          <Home size={20} />
          <span>Início</span>
        </button>
        <button
          onClick={() => navegar('pagina2')}
          className="flex items-center gap-3 py-2 px-4 rounded hover:bg-gray-700 text-left"
        >
          <User size={20} />
          <span>Perfil</span>
        </button>
        <hr className="border-gray-700" />
        <button
          onClick={() => navegar('teste')}
          className="flex items-center gap-3 py-2 px-4 rounded hover:bg-gray-700 text-left"
        >
          <LogOut size={20} />
          <span>Sair (Login)</span>
        </button>
      </nav>
    </aside>
  );
}

export default Sidebar;