import { useReveal } from "../hooks/useReveal";
import { useOutletContext } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Roboimg from "../assets/robo.png";
import { useState, useEffect } from "react";

type SidebarContext = {
  setIsSidebarOpen: (open: boolean) => void;
};

function Home() {
  const { setIsSidebarOpen } = useOutletContext<SidebarContext>();

  // 1. ESTADO PARA O BOTÃO DE SCROLL
  const [showScrollButton, setShowScrollButton] = useState(false);

  useReveal();

  // 2. LÓGICA DO BOTÃO DE SCROLL
  useEffect(() => {
    // Função que verifica a posição da rolagem
    const handleScroll = () => {
      // Mostrar o botão se a rolagem for maior que 300px (aproximadamente a primeira tela)
      if (window.scrollY > 300) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    // Adiciona o listener de evento
    window.addEventListener("scroll", handleScroll);

    // Função de limpeza: remove o listener quando o componente é desmontado
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // O array vazio garante que o useEffect rode apenas na montagem

  return (
    <div className="bg-[#6C94C4] min-h-screen text-white">
      <Navbar setIsSidebarOpen={setIsSidebarOpen} />

      {/* HERO */}
      <section className="flex flex-col md:flex-row justify-between items-center px-12 md:px-24 py-24 md:py-32">
        {/* TEXTO ESQUERDA */}
        <div className="max-w-xl text-left">
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 reveal">
            Detech
          </h2>

          <p className="text-lg md:text-xl leading-relaxed text-white/95 mb-10 reveal">
            Uma proposta inovadora que democratiza o ensino digital no Ensino
            Fundamental II. Nossa plataforma conecta robótica, prática e
            gamificação para tornar o aprendizado mais intuitivo, interativo e
            divertido.
          </p>

          <button className="bg-[#1C4ED8] hover:bg-[#1A3FC1] px-8 py-4 rounded-lg font-semibold shadow-lg transition-all reveal">
            SAIBA MAIS
          </button>
        </div>

        {/* BENEFÍCIOS + ROBO */}
        {/* ALTERAÇÃO AQUI: gap-16 -> gap-12 e md:mt-0 -> md:mt-12 */}
        <div className="flex flex-col md:flex-row items-center gap-12 mt-16 md:mt-12">
          {/* BENEFÍCIOS PREMIUM */}
          <div className="space-y-10 reveal">
            {/* ITEM 1 - EMOJI ATUALIZADO */}
            <div className="flex items-start gap-6 max-w-md">
              <span className="text-5xl">🧪</span>
              <div>
                <h3 className="text-3xl font-bold mb-2">Educação prática</h3>
                <p className="text-white/95 text-lg md:text-xl leading-relaxed">
                  Atividades reais, experimentação imediata e aprendizagem
                  baseada na ação — conectando teoria com prática de verdade.
                </p>
              </div>
            </div>

            {/* ITEM 2 - EMOJI ATUALIZADO */}
            <div className="flex items-start gap-6 max-w-md">
              <span className="text-5xl">🤖</span>
              <div>
                <h3 className="text-3xl font-bold mb-2">
                  Experiência gamificada
                </h3>
                <p className="text-white/95 text-lg md:text-xl leading-relaxed">
                  Missões, progressão, recompensas e desafios que tornam o
                  estudo motivador e empolgante para crianças e adolescentes.
                </p>
              </div>
            </div>

            {/* ITEM 3 - EMOJI ATUALIZADO */}
            <div className="flex items-start gap-6 max-w-md">
              <span className="text-5xl">📶</span>
              <div>
                <h3 className="text-3xl font-bold mb-2">Conexão inteligente</h3>
                <p className="text-white/95 text-lg md:text-xl leading-relaxed">
                  Integração rápida e estável com o robô via Bluetooth,
                  garantindo precisão e uma experiência sem interrupções.
                </p>
              </div>
            </div>
          </div>

          {/* IMAGEM DO ROBÔ */}
          <img
            src={Roboimg}
            alt="Robô"
            className="w-[260px] md:w-[380px] drop-shadow-2xl reveal"
          />
        </div>
      </section>

      {/* BOTÃO VOLTAR AO TOPO (APENAS SE showScrollButton for true) */}
      {showScrollButton && ( // 👈 Renderização condicional
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="
            fixed bottom-8 right-8
            bg-white text-[#1C4ED8]
            w-12 h-12 rounded-full 
            shadow-xl 
            flex items-center justify-center 
            text-2xl font-bold
            hover:bg-blue-100
            transition-all
            z-50
          "
        >
          ↑
        </button>
      )}
    </div>
  );
}

export default Home;
