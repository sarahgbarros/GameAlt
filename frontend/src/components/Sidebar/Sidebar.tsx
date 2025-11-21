import React from "react";
import { NavLink } from "react-router-dom";
import { X, Home, User, LogOut, Info, Users, Mail, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

interface SidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Sidebar({
  isSidebarOpen,
  setIsSidebarOpen,
}: SidebarProps) {
  const NavLinkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      "inline-flex items-center w-full justify-start gap-3 px-3 py-2 rounded-md transition-colors text-sm font-medium",
      isActive
        ? "bg-accent text-accent-foreground hover:bg-accent" // Usamos accent aqui para o hover do link normal
        : "text-black dark:text-white hover:bg-accent hover:text-accent-foreground"
    );

  const NavLinkPrincipal = ({ isActive }: { isActive: boolean }) =>
    cn(
      "inline-flex items-center w-full justify-start gap-3 px-3 py-2 rounded-md transition-colors text-sm font-medium",
      // Usa primary para o destaque, independentemente do status ativo/inativo
      "bg-primary text-primary-foreground shadow-md hover:bg-primary/90",
      isActive && "bg-primary/80" // Levemente mais escuro se estiver ativo
    );

  return (
    <>
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 flex w-64 flex-col 
          border-r bg-background 
          transition-transform duration-300 ease-in-out 
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex items-center justify-between p-4 border-b h-16">
          <h1 className="text-2xl font-bold text-primary">Detech</h1>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X className="h-6 w-6" />
          </Button>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <NavLink to="/programacao" className={NavLinkPrincipal}>
            <Code className="h-4 w-4" />
            Programação Visual
          </NavLink>

          <Separator className="my-4" />

          <NavLink to="/home" className={NavLinkClass}>
            <Home className="h-4 w-4" />
            Dashboard
          </NavLink>

          <NavLink to="/perfil" className={NavLinkClass}>
            <User className="h-4 w-4" />
            Meu Perfil
          </NavLink>

          <Separator className="my-4" />

          <p className="px-3 text-xs font-medium uppercase text-muted-foreground">
            Saiba Mais
          </p>

          <NavLink to="/como-funciona" className={NavLinkClass}>
            <Info className="h-4 w-4" />
            Como Funciona
          </NavLink>
          <NavLink to="/sobre" className={NavLinkClass}>
            <Users className="h-4 w-4" />
            Sobre Nós
          </NavLink>
          <NavLink to="/contato" className={NavLinkClass}>
            <Mail className="h-4 w-4" />
            Contato
          </NavLink>
        </nav>

        <div className="p-4 border-t">
          <Button
            variant="ghost"
            className="w-full justify-start gap-2 text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <LogOut className="h-4 w-4" />
            Sair
          </Button>
        </div>
      </aside>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </>
  );
}
