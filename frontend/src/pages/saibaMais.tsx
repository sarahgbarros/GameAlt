import { BrainCircuit, Puzzle, Waypoints } from "lucide-react";

export default function SaibaMais() {
  return (
    <div className="bg-background">
      {/* Seção Hero */}
      <div className="text-center py-24 bg-primary/10">
        <h1 className="text-5xl font-bold text-primary mb-4">
          Robótica Educacional Inclusiva
        </h1>
        <p className="text-xl max-w-3xl mx-auto text-muted-foreground">
          Vamos além da tecnologia. Criamos pontes para o desenvolvimento 
          cognitivo, criativo e social de todos os estudantes[cite: 14].
        </p>
      </div>

      {/* Seção de Detalhes */}
      <div className="container mx-auto px-4 py-20 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="flex flex-col items-center text-center">
          <BrainCircuit className="h-16 w-16 text-primary mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Educação Prática e Cognitiva</h2>
          <p className="text-muted-foreground">
            A robótica educacional é um recurso poderoso para estimular a 
            criatividade, a resolução de problemas e o trabalho em equipe[cite: 30]. 
            Nossos kits adaptados focam na experimentação e na aprendizagem 
            baseada na ação.
          </p>
        </div>

        <div className="flex flex-col items-center text-center">
          <Puzzle className="h-16 w-16 text-primary mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Gamificação como Ferramenta</h2>
          <p className="text-muted-foreground">
            Usamos a gamificação para aplicar elementos de jogos, como 
            desafios e recompensas, para promover a motivação no 
            aprendizado[cite: 31]. Isso torna o processo empolgante e 
            aumenta o engajamento dos alunos[cite: 28].
          </p>
        </div>

        <div className="flex flex-col items-center text-center">
          <Waypoints className="h-16 w-16 text-primary mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Inclusão e Acessibilidade</h2>
          <p className="text-muted-foreground">
            Este é o nosso núcleo. Seguimos princípios pedagógicos que 
            garantem a participação de todos, respeitando as singularidades 
            de cada um[cite: 32]. Nossas adaptações são focadas em alunos 
            com TEA e outras condições[cite: 33].
          </p>
        </div>
      </div>
    </div>
  );
}