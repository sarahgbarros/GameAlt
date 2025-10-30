import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Roboimg from "../assets/robo.png";

function PaginaUm() {
  return (
    <div className="bg-[#6C94C4] min-h-screen text-white">
      <Navbar />

      <section className="flex flex-col md:flex-row justify-between items-center px-10 md:px-20 py-16 md:py-24">
        <div className="max-w-lg text-left">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Detech</h2>
          <p className="text-base md:text-lg leading-relaxed mb-6 text-white/90">
            Nosso projeto apresenta um modelo inovador de ensino voltado para o
            Ensino Fundamental II, com foco na democratização da educação digital.
            No centro dessa proposta está um Sistema de Aprendizagem Prática
            composto por dois elementos integrados: um robô físico e um ambiente
            virtual gamificado, conectados perfeitamente via Bluetooth.
          </p>

          <button className="bg-[#1C4ED8] hover:bg-[#1A3FC1] px-6 py-3 rounded-lg font-semibold shadow-md transition-all">
            SAIBA MAIS
          </button>
        </div>

      <div className="mt-10 md:mt-0 flex justify-center">
        <img
          src={Roboimg}
          alt="Robô"
          className="w-80 md:w-100"
        />
      </div>

      </section>
    </div>
  );
}

export default PaginaUm;