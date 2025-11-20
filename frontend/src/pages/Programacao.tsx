import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Play, RotateCcw } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import "blockly/blocks";
import * as Blockly from "blockly/core";
import { WorkspaceSvg } from "blockly/core";
import "blockly/javascript";
import { javascriptGenerator } from "blockly/javascript";
import "../blockly/customBlocks";
import { toolbox } from "../blockly/toolbox";
import Arena from "../components/Game/Arena/Arena";
import axios from "axios"

const API_URL = "http://localhost:8000/api/robot"; // Atenção: porta 8000 se rodar local, 8001 se for docker
const WS_URL = "ws://localhost:8000/api/robot/ws";

interface RobotState {
	x: number;
	y: number;
	dir: number;
	isExecuting: boolean;
}

export default function Programacao() {
	const [connectionStatus, setConnectionStatus] = useState("disconnected");
	const blocklyDiv = useRef<HTMLDivElement>(null);
	const workspaceRef = useRef<WorkspaceSvg | null>(null);
	const isCancelledRef = useRef<boolean>(false);
	const [generatedCode, setGeneratedCode] = useState<string>("");
	const wsRef = useRef<WebSocket | null>(null);

	const [robotState, setRobotState] = useState<RobotState>({
		x: 0,
		y: 0,
		dir: 0,
		isExecuting: false,
	});

	useEffect(() => {
		let workspaceInstance: WorkspaceSvg | null = null;
		let resizeObserver: ResizeObserver | null = null;

		if (blocklyDiv.current) {
			workspaceInstance = Blockly.inject(blocklyDiv.current, {
				toolbox: toolbox,
				trashcan: true,
				move: {
					scrollbars: true,
					drag: true,
					wheel: true,
				},
				sounds: false,
			});

			workspaceRef.current = workspaceInstance;

			resizeObserver = new ResizeObserver(() => {
				if (workspaceInstance) {
					Blockly.svgResize(workspaceInstance);
				}
			});

			resizeObserver.observe(blocklyDiv.current);

			workspaceRef.current.addChangeListener(() => {
				if (workspaceRef.current) {
					const code = javascriptGenerator.workspaceToCode(workspaceRef.current);
					setGeneratedCode(code);
				}
			});
		}

		return () => {
			if (workspaceRef.current) {
				workspaceRef.current.dispose();
			}
			if (resizeObserver) {
				resizeObserver.disconnect();
			}
		};
	}, []);

	useEffect(() => {
		const checkInitial = async () => {
			try {
				const res = await axios.get(`${API_URL}/status`);
				if (res.data.connected) {
					setConnectionStatus("connected");
					connectWebSocket();
				}
			} catch (e) { setConnectionStatus("disconnected"); }
		};
		checkInitial();

		// Cleanup ao sair da página
		return () => {
			if (wsRef.current) wsRef.current.close();
		};
	}, []);

	const connectWebSocket = () => {
		if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) return;

		const ws = new WebSocket(WS_URL);
		wsRef.current = ws;

		ws.onopen = () => console.log("🟢 WS Conectado sob demanda");

		ws.onmessage = (event) => {
			try {
				const data = JSON.parse(event.data);
				if (data.type === "status" && data.connected === false) {
					setConnectionStatus("disconnected");
					ws.close();
				}
			} catch (e) { console.error(e); }
		};

		ws.onerror = (e) => console.error("🔴 Erro WS", e);
	};

	const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

	const handleExecute = async (): Promise<void> => {
		if (robotState.isExecuting) return;
		isCancelledRef.current = false;
		setRobotState((prevState) => ({ ...prevState, isExecuting: true }));

		const commands = generatedCode
			.replace(/;/g, "")
			.split("\n")
			.filter((cmd) => cmd.trim() !== "");

		console.log("Comandos processados:", commands);

		const apiCommands: string[] = [];

		commands.forEach(cmd => {
			if (cmd.includes("mover_frente")) {
				const valor = parseInt(cmd.match(/\d+/)?.[0] || "1");
				for (let i = 0; i < valor; i++) apiCommands.push("andar");
			}
			else if (cmd.includes("virar_direita")) apiCommands.push("virar_direita");
			else if (cmd.includes("virar_esquerda")) apiCommands.push("virar_esquerda");
		});

		if (connectionStatus === "connected") {
			axios.post(`${API_URL}/execute`, { commands: apiCommands })
				.catch(err => console.error("Erro ao enviar comandos:", err));
		}

		for (const command of commands) {
			if (isCancelledRef.current) {
				console.log("Execução cancelada pelo reset.");
				break;
			}

			const hasValue = command.includes("(");
			const commandName = hasValue ? command.substring(0, command.indexOf("(")) : command;
			const value = hasValue ? parseInt(command.substring(command.indexOf("(") + 1, command.indexOf(")")), 10) : NaN;

			switch (commandName) {
				case "mover_frente":
					const steps = !isNaN(value) ? value : 1;
					setRobotState((currentState) => {
						const logicalDir = ((currentState.dir % 360) + 360) % 360;
						let newX = currentState.x;
						let newY = currentState.y;

						if (logicalDir === 0) newY -= steps; // Cima
						if (logicalDir === 90) newX += steps; // Direita
						if (logicalDir === 180) newY += steps; // Baixo
						if (logicalDir === 270) newX -= steps; // Esquerda

						newX = Math.max(0, Math.min(9, newX));
						newY = Math.max(0, Math.min(9, newY));
						return { ...currentState, x: newX, y: newY };
					});
					await sleep(600);
					break;

				case "virar_direita":
					setRobotState((currentState) => ({
						...currentState,
						dir: currentState.dir + 90,
					}));
					await sleep(400);
					break;

				case "virar_esquerda":
					setRobotState((currentState) => ({
						...currentState,
						dir: currentState.dir - 90,
					}));
					await sleep(400);
					break;
				default:
					break;
			}
		}

		if (!isCancelledRef.current) {
			setRobotState((prevState) => ({ ...prevState, isExecuting: false }));
		}
	};

	const handleReset = () => {
		isCancelledRef.current = true;
		setRobotState({ x: 0, y: 0, dir: 0, isExecuting: false });
	};

	const handleConnect = async () => {
		try {
			if (connectionStatus === "connected") {
				setConnectionStatus("disconnected"); 
				if (wsRef.current) wsRef.current.close(); 
				await axios.post(`${API_URL}/disconnect`);
			} else {
				setConnectionStatus("connecting");

				await axios.post(`${API_URL}/connect`);

				setConnectionStatus("connected");
				connectWebSocket(); // 
			}
		} catch (error) {
			console.error("Erro de conexão:", error);
			setConnectionStatus("disconnected");
			alert("Erro ao conectar. Verifique se o Backend está rodando.");
		}
	};

	const statusColor = cn("h-3 w-3 rounded-full", connectionStatus === "connected" && "bg-green-500 animate-pulse", connectionStatus === "connecting" && "bg-yellow-500 animate-spin", connectionStatus === "disconnected" && "bg-destructive");

	const manualMove = async (action: string) => {
        console.log("Manual:", action);
        
        if (connectionStatus === "connected") {
            try {
                await axios.post(`${API_URL}/execute`, { commands: [action] });
            } catch (e) { console.error(e); }
        }

        setRobotState((currentState) => {
            const logicalDir = ((currentState.dir % 360) + 360) % 360;
            let { x, y } = currentState;

            if (action === "andar") {
                if (logicalDir === 0) y -= 1;      // Cima
                if (logicalDir === 90) x += 1;     // Direita
                if (logicalDir === 180) y += 1;    // Baixo
                if (logicalDir === 270) x -= 1;    // Esquerda
            } 
            else if (action === "virar_direita") {
                return { ...currentState, dir: currentState.dir + 90 };
            } 
            else if (action === "virar_esquerda") {
                return { ...currentState, dir: currentState.dir - 90 };
            }

            return { 
                ...currentState, 
                x: Math.max(0, Math.min(9, x)), 
                y: Math.max(0, Math.min(9, y)) 
            };
        });
    };

	return (
		<div className="flex flex-col h-full overflow-hidden">
			<Card className="rounded-none border-t-0 border-x-0 border-b">
				<div className="flex items-center justify-between p-3 md:p-4">
					<div className="flex items-center gap-4">
						<Button size="sm" onClick={handleExecute} disabled={robotState.isExecuting} className="bg-primary hover:bg-primary/90">
							<Play className="h-4 w-4 mr-2" />
							{robotState.isExecuting ? "Executando..." : "Rodar Código"}
						</Button>
						<Button size="sm" variant="outline" onClick={handleReset}>
							<RotateCcw className="h-4 w-4 mr-2" />
							Reiniciar Posição
						</Button>
						<Separator orientation="vertical" className="h-6 mx-2 hidden md:block" />
						<span className="text-sm text-muted-foreground hidden md:block">Blocos: Mover (Frente, Trás, Rotação)</span>
					</div>

					<div className="flex items-center gap-3">
						<Button size="sm" onClick={handleConnect} variant={connectionStatus === "connected" ? "destructive" : "default"} disabled={connectionStatus === "connecting"}>
							<span className={statusColor} />
							{connectionStatus === "connected" ? "Desconectar Robô" : connectionStatus === "connecting" ? "Conectando..." : "Conectar Robô"}
						</Button>
					</div>
				</div>
			</Card>

			<div className="flex flex-1 p-4 gap-4 overflow-hidden">
				<Card className="flex-3/4 flex flex-col w-full lg:w-[68%] h-full">
					<CardHeader>
						<CardTitle className="text-xl">Área de Programação Visual (Scratch)</CardTitle>
					</CardHeader>
					<CardContent className="flex-1 p-0 relative min-h-[400px]">
						<div ref={blocklyDiv} className="absolute inset-0 w-full h-full" id="blockly-container" />
					</CardContent>
				</Card>

				<Card className="flex-1/4 flex flex-col w-full lg:w-[32%]">
					<CardHeader>
						<CardTitle className="text-xl">Visualizador do Robô/Boneco</CardTitle>
					</CardHeader>
					<CardContent className="flex-1 flex flex-col p-0">
						<div className="flex-1 flex items-center justify-center p-6 overflow-hidden">
							<div className="w-full">
								<Arena robotState={robotState} />
							</div>
						</div>

						<div className="p-4 border-t">
							<CardTitle className="text-sm mb-2">Controle Manual (Debug)</CardTitle>
							<div className="grid grid-cols-3 gap-2">
								<Button variant="outline" className="col-start-1 row-start-2" onClick={() => manualMove("virar_esquerda")}>
									Esquerda
								</Button>
								<Button variant="outline" className="col-start-2 row-start-2" onClick={() => manualMove("andar")}>
									Frente
								</Button>
								<Button variant="outline" className="col-start-3 row-start-2" onClick={() => manualMove("virar_direita")}>
									Direita
								</Button>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
