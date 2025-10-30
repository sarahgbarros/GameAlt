import { useEffect, useRef, useState } from "react";
import "../main.css";
import * as Blockly from "blockly/core";
import { WorkspaceSvg } from "blockly/core";
import { javascriptGenerator } from "blockly/javascript";
import "blockly/blocks";
import "blockly/javascript";
import "../blockly/customBlocks";
import { toolbox } from "../blockly/toolbox";
import Arena from "../components/game/Arena/Arena";

interface RobotState {
	x: number;
	y: number;
	dir: number;
	isExecuting: boolean;
}

function Teste() {
	const blocklyDiv = useRef<HTMLDivElement>(null);
	const workspaceRef = useRef<WorkspaceSvg | null>(null);
	const isCancelledRef = useRef<boolean>(false);
	const [generatedCode, setGeneratedCode] = useState<string>("");
	const [robotState, setRobotState] = useState<RobotState>({ x: 0, y: 0, dir: 0, isExecuting: false });

	useEffect(() => {
		let workspaceInstance: WorkspaceSvg | null = null;

		if (blocklyDiv.current) {
			workspaceInstance = Blockly.inject(blocklyDiv.current, {
				toolbox: toolbox,
				trashcan: true,
				move: {
					scrollbars: true,
					drag: true,
					wheel: true,
				},
			});

			workspaceRef.current = workspaceInstance;

			workspaceRef.current.addChangeListener(() => {
				if (workspaceRef.current) {
					const code = javascriptGenerator.workspaceToCode(workspaceRef.current);
					setGeneratedCode(code);
				}
			});
		}

		return () => {
			workspaceRef.current?.dispose();
		};
	}, []);

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

		for (const command of commands) {
			if (isCancelledRef.current) {
				console.log("Execução cancelada pelo reset.");
				break;
			}

			const hasValue = command.includes("(");
			const commandName = hasValue ? command.substring(0, command.indexOf("(")) : command;
			const value = hasValue ? parseInt(command.substring(command.indexOf("(") + 1, command.indexOf(")")), 10) : NaN;

			console.log(`Executando: ${commandName}, Valor: ${value}`);

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

		if (workspaceRef.current) {
			workspaceRef.current.clear();
		}
	};

	return (
		<div className="page-container">
			<header className="App-header">
				<h1>Simulador de Robô com Blockly</h1>
				<div className="header-buttons">
					<button onClick={handleReset} className="reset-button">
						Resetar
					</button>
					<button onClick={handleExecute} className="execute-button" disabled={robotState.isExecuting}>
						{robotState.isExecuting ? "Executando..." : "Executar Comandos"}
					</button>
				</div>
			</header>

			<div className="main-container">
				<div className="editor-container">
					<div ref={blocklyDiv} id="blockly-container" />
				</div>
				<div className="simulation-container">
					<Arena robotState={robotState} />
				</div>
			</div>
		</div>
	);
}

export default Teste;
