import { useState } from 'react';

import AppLayout from './components/AppLayout.tsx';

import Login from './pages/Login.tsx';
import PaginaUm from './pages/PaginaUm.tsx';
import PaginaDois from './pages/PaginaDois.tsx';
import Teste from './pages/Teste.tsx';


function App() {
  const [currentPage, setCurrentPage] = useState('login'); 

  const renderPage = () => {
    switch (currentPage) {
      case 'pagina1':
        return <PaginaUm />;
      case 'pagina2':
        return <PaginaDois />;
      case 'teste':
        return <Teste />
      default:
        return <PaginaUm />; 
    }
  };

  if (currentPage === 'login') {
    return <Login setCurrentPage={setCurrentPage} />;
  }

  
  return (
    <AppLayout setCurrentPage={setCurrentPage}>
      {renderPage()}
    </AppLayout>
  );
}

export default App;


