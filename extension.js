const vscode = require('vscode');

/**
 * @param {string} expr
 */
function safeEvalSingleLine(expr) {
	return Function(`return (${expr});`)();
}

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	context.subscriptions.push(
		vscode.commands.registerCommand('extension.evalInput', function () {
			vscode.window.showInputBox({
				placeHolder: "e.g.",
			}).then(str => {
				try {
					const result = safeEvalSingleLine(str);
					vscode.window.showInformationMessage(`${result}`);
				} catch(ex) {
					vscode.window.showErrorMessage(ex.message);
					console.log(ex.stack);
				}
			});
		})
	);

	context.subscriptions.push(
		vscode.commands.registerCommand('extension.evalSelected', function () {
			vscode.window.showInformationMessage('Hello World!');
		})
	);

}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
