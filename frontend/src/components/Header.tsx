import { Menu } from "lucide-react";

type HeaderProps = {
  setIsSidebarOpen: (isOpen: boolean) => void;
};

function Header({ setIsSidebarOpen }: HeaderProps) {
  return (
    <header className="flex items-center h-16 bg-white shadow-md z-10 shrink-0">
      <button
        onClick={() => setIsSidebarOpen(true)}
        className="px-6 py-4 text-gray-700 hover:text-gray-900 focus:outline-none"
        aria-label="Abrir menu"
      >
        <Menu size={24} />
      </button>
      <h1 className="text-lg font-semibold text-gray-800">Dashboard</h1>
    </header>
  );
}

export default Header;