const vscode = require('vscode');

/**
 * @param {string} expr
 */
function safeEvalSingleLine(expr) {
	return Function(`return (${expr});`)();
}

/**
 * @param {string} expr
 */
function safeEvalMultiLine(expr) {
	return Function(expr)();
}

/**
 * @param {string} expr
 * @param {bool}   isSingleLine
 */
function showResult(expr, isMultiLine) {
	try {
		const result = (isMultiLine ? safeEvalMultiLine(expr) : safeEvalSingleLine(expr));
		vscode.window.showInformationMessage(`${result}`);
	} catch(ex) {
		vscode.window.showErrorMessage(ex.message);
		console.log(ex.stack);
	}
}

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	context.subscriptions.push(
		vscode.commands.registerCommand('extension.evalInput', function () {
			vscode.window.showInputBox({
				placeHolder: "e.g. 100+3, 0xffffffff-1, (10).toString(16)",
			}).then(str => {
				showResult(str, false);
			});
		})
	);

	context.subscriptions.push(
		vscode.commands.registerCommand('extension.evalSelectedSingleLine', function () {
			const editor = vscode.window.activeTextEditor;
			if (!editor) {
				vscode.window.showErrorMessage("評価する処理を選択した状態でコマンドを実行してください");
				return;
			}
			const str = editor.document.getText(editor.selection);
			showResult(str, false);
		})
	);

	context.subscriptions.push(
		vscode.commands.registerCommand('extension.evalSelectedMultiLine', function () {
			const editor = vscode.window.activeTextEditor;
			if (!editor) {
				vscode.window.showErrorMessage("評価する処理を選択した状態でコマンドを実行してください");
				return;
			}
			const str = editor.document.getText(editor.selection);
			showResult(str, true);
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
