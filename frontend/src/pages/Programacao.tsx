import  { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Play, RotateCcw, /*Power*/ Zap, MousePointer } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export default function Programacao() {
  const [connectionStatus, setConnectionStatus] = useState("disconnected");
  const [webhookUrl, /*setWebhookUrl*/] = useState("ws://192.168.1.100:8080");

  const handleConnect = () => {
    if (connectionStatus === "connected") {
      setConnectionStatus("disconnected");
    } else {
      setConnectionStatus("connecting");
      setTimeout(() => setConnectionStatus("connected"), 1500);
    }
  };

  const statusColor = cn(
    "h-3 w-3 rounded-full",
    connectionStatus === "connected" && "bg-green-500 animate-pulse",
    connectionStatus === "connecting" && "bg-yellow-500 animate-spin",
    connectionStatus === "disconnected" && "bg-destructive"
  );

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <Card className="rounded-none border-t-0 border-x-0 border-b">
        <div className="flex items-center justify-between p-3 md:p-4">
          <div className="flex items-center gap-4">
            <Button
              size="sm"
              onClick={() => {}}
              className="bg-primary hover:bg-primary/90"
            >
              <Play className="h-4 w-4 mr-2" />
              Rodar Código
            </Button>
            <Button size="sm" variant="outline">
              <RotateCcw className="h-4 w-4 mr-2" />
              Reiniciar
            </Button>
            <Separator
              orientation="vertical"
              className="h-6 mx-2 hidden md:block"
            />
            <span className="text-sm text-muted-foreground hidden md:block">
              Blocos: Mover (Frente, Trás, Rotação)
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-muted-foreground hidden md:block">
              {webhookUrl}
            </span>
            <Button
              size="sm"
              onClick={handleConnect}
              variant={
                connectionStatus === "connected" ? "destructive" : "default"
              }
              disabled={connectionStatus === "connecting"}
            >
              <span className={statusColor} />
              {connectionStatus === "connected"
                ? "Desconectar Robô"
                : connectionStatus === "connecting"
                ? "Conectando..."
                : "Conectar Robô"}
            </Button>
          </div>
        </div>
      </Card>

      <div className="flex flex-1 p-4 gap-4">
        <Card className="flex-3/4 flex flex-col w-full lg:w-[68%]">
          <CardHeader>
            <CardTitle className="text-xl">
              Área de Programação Visual (Scratch)
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 p-0">
            <div className="bg-secondary flex items-center justify-center h-full text-muted-foreground p-6">
              <Zap className="h-6 w-6 mr-2" />
              Área reservada para a montagem de blocos (Blockly/Interface
              customizada)
            </div>
          </CardContent>
        </Card>

        <Card className="flex-1/4 flex flex-col w-full lg:w-[32%]">
          <CardHeader>
            <CardTitle className="text-xl">
              Visualizador do Robô/Boneco
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col p-0">
            <div className="bg-primary/10 flex items-center justify-center h-4/6 text-primary p-6 rounded-t-lg">
              <MousePointer className="h-8 w-8 mr-2" />
              Simulação 2D do Boneco/Robô
            </div>

            <div className="p-4 border-t">
              <CardTitle className="text-sm mb-2">
                Controle Manual (Debug)
              </CardTitle>
              <div className="grid grid-cols-3 gap-2">
                <Button variant="outline" className="col-span-3">
                  Frente
                </Button>
                <Button variant="outline">Esquerda</Button>
                <Button variant="outline">Parar</Button>
                <Button variant="outline">Direita</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
