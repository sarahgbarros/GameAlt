import { Bot, Gamepad2, Accessibility } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function ComoFunciona() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Como o Detech Revoluciona a Sala de Aula
        </h1>
        <p className="text-xl text-muted-foreground">
          Nossa plataforma é construída sobre três pilares que tornam o
          impossível, possível.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="shadow-lg hover:shadow-primary/20 transition-shadow">
          <CardHeader className="items-center">
            <div className="p-4 bg-primary/10 rounded-full">
              <Bot className="h-10 w-10 text-primary" />
            </div>
            <CardTitle className="pt-4 text-2xl">Robótica Prática</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground">
              Chega de teoria abstrata. Aqui, os alunos aprendem construindo.
              Nossos kits dão vida aos conceitos de código e engenharia,
              transformando ideias em robôs que se movem.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-primary/20 transition-shadow">
          <CardHeader className="items-center">
            <div className="p-4 bg-primary/10 rounded-full">
              <Gamepad2 className="h-10 w-10 text-primary" />
            </div>
            <CardTitle className="pt-4 text-2xl">
              Aprendizado Gamificado
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground">
              Por que o aprendizado deve ser chato? Nós o transformamos em um
              jogo. Alunos embarcam em missões, ganham recompensas e sobem de
              nível, tornando a jornada educacional viciante e divertida.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-primary/20 transition-shadow">
          <CardHeader className="items-center">
            <div className="p-4 bg-primary/10 rounded-full">
              <Accessibility className="h-10 w-10 text-primary" />
            </div>
            <CardTitle className="pt-4 text-2xl">Inclusão Real</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground">
              Este é o nosso coração. Nossas interfaces são de baixo estímulo,
              projetadas para alunos com autismo (TEA). Garantimos um ambiente
              calmo onde todos podem brilhar, sem sobrecarga sensorial.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
