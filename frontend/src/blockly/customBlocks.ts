import * as Blockly from "blockly/core";
import { javascriptGenerator, Order } from 'blockly/javascript';

Blockly.Blocks["mover_frente"] = {
	init: function (this: Blockly.Block) {
		this.appendValueInput("NAME").setCheck("Number").appendField("Mover para frente");
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(230);
		this.setTooltip("Move o robô para frente por X casas");
		this.setHelpUrl("");
	},
};

Blockly.Blocks["virar"] = {
	init: function (this: Blockly.Block) {
		var dropdown = new Blockly.FieldDropdown([
			["à direita ➡️", "DIREITA"],
			["à esquerda ⬅️", "ESQUERDA"],
		]);
		this.appendDummyInput().appendField("Virar").appendField(dropdown, "DIRECAO");
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(120);
		this.setTooltip("Vira o robô para a direita ou esquerda");
		this.setHelpUrl("");
	},
};


javascriptGenerator.forBlock["mover_frente"] = function (block: Blockly.Block) {
	var value_name = javascriptGenerator.valueToCode(block, "NAME", Order.ATOMIC);
	return `mover_frente(${value_name || 1});\n`; 
};

javascriptGenerator.forBlock["virar"] = function (block: Blockly.Block) {
	const dropdown_direcao = block.getFieldValue("DIRECAO");
	if (dropdown_direcao === "DIREITA") {
		return "virar_direita();\n";
	} else {
		return "virar_esquerda();\n";
	}
};