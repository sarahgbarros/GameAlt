import { useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";
import { useReveal } from "../hooks/useReveal";
import Roboimg from "../assets/robo.png";
import { Button } from "@/components/ui/button";
import { ArrowUp, FlaskConical, Bot, Signal } from "lucide-react";
import React from "react";

type SidebarContext = {
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function Home() {
  useOutletContext<SidebarContext>();
  const [showScrollButton, setShowScrollButton] = useState(false);

  useReveal();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="bg-primary text-primary-foreground min-h-screen">
      <section className="flex flex-col md:flex-row justify-between items-center px-12 md:px-24 py-24 md:py-32">
        <div className="max-w-xl text-left">
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 reveal">
            Detech
          </h2>

          <p className="text-lg md:text-xl leading-relaxed text-primary-foreground/90 mb-10 reveal">
            Uma proposta inovadora que democratiza o ensino digital no Ensino
            Fundamental II. Nossa plataforma conecta robótica, prática e
            gamificação para tornar o aprendizado mais intuitivo, interativo e
            divertido.
          </p>

          <Button
            size="lg"
            className="px-8 py-6 text-lg font-semibold shadow-lg reveal bg-primary-foreground text-primary hover:bg-primary-foreground/90"
          >
            SAIBA MAIS
          </Button>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-12 mt-16 md:mt-12">
          <div className="space-y-10 reveal">
            <div className="flex items-start gap-6 max-w-md">
              <FlaskConical className="h-10 w-10 text-primary-foreground/80 flex-shrink-0" />
              <div>
                <h3 className="text-3xl font-bold mb-2">Educação prática</h3>
                <p className="text-primary-foreground/90 text-lg md:text-xl leading-relaxed">
                  Atividades reais, experimentação imediata e aprendizagem
                  baseada na ação — conectando teoria com prática de verdade.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6 max-w-md">
              <Bot className="h-10 w-10 text-primary-foreground/80 flex-shrink-0" />
              <div>
                <h3 className="text-3xl font-bold mb-2">
                  Experiência gamificada
                </h3>
                <p className="text-primary-foreground/90 text-lg md:text-xl leading-relaxed">
                  Missões, progressão, recompensas e desafios que tornam o
                  estudo motivador e empolgante para crianças e adolescentes.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6 max-w-md">
              <Signal className="h-10 w-10 text-primary-foreground/80 flex-shrink-0" />
              <div>
                <h3 className="text-3xl font-bold mb-2">Conexão inteligente</h3>
                <p className="text-primary-foreground/90 text-lg md:text-xl leading-relaxed">
                  Integração rápida e estável com o robô via Bluetooth,
                  garantindo precisão e uma experiência sem interrupções.
                </p>
              </div>
            </div>
          </div>

          <img
            src={Roboimg}
            alt="Robô"
            className="w-[260px] md:w-[380px] drop-shadow-2xl reveal"
          />
        </div>
      </section>

      {showScrollButton && (
        <Button
          variant="secondary"
          size="icon"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 w-12 h-12 rounded-full shadow-xl z-50"
        >
          <ArrowUp className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
}

export default Home;
