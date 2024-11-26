import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    let snake_case_disposable = vscode.commands.registerCommand('extension.convert_to_snake_case', () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            return; 
        }

        const selection = editor.selection;
        const text = editor.document.getText(selection);

        if (!text) {
            vscode.window.showInformationMessage('вы не выделили текст');
            return;
        }

        const snake_case_text = to_snake_case(text);
        editor.edit(editBuilder => {
            editBuilder.replace(selection, snake_case_text);
        });
    });

    let camelCaseDisposable = vscode.commands.registerCommand('extension.convertToCamelCase', () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;
        }

        const selection = editor.selection;
        const text = editor.document.getText(selection);

        if (!text) {
            vscode.window.showInformationMessage('вы не выделили текст');
            return;
        }

        const camelCaseText = toCamelCase(text);
        editor.edit(editBuilder => {
            editBuilder.replace(selection, camelCaseText);
        });
    });

    let FormatMathDisposable = vscode.commands.registerCommand('extension.AddSpacesToMathOperators', () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            return; 
        }

        const selection = editor.selection;
        const text = editor.document.getText(selection);

        if (!text) {
            vscode.window.showInformationMessage('вы не выделили текст');
            return;
        }

        const formatted_text = AddSpacesAroundOperators(text);
        editor.edit(editBuilder => {
            editBuilder.replace(selection, formatted_text);
        });
    });


    context.subscriptions.push(camelCaseDisposable);
    context.subscriptions.push(snake_case_disposable);
    context.subscriptions.push(FormatMathDisposable);

}

export function deactivate() {}

function toCamelCase(text: string): string {
    return text.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) => {
        if (+match === 0) {
            return ""; 
        }
        return index === 0 ? match.toLowerCase() : match.charAt(0).toUpperCase() + match.slice(1).toLowerCase();
    });
}

function to_snake_case(text: string): string {
    return text.replace(/\d+/g, ' ').split(/ |\B(?=[A-Z])/).map((word) => word.toLowerCase()).join('_');
}

function AddSpacesAroundOperators(text: string): string {
    return text.replace(/s*([+]|[*]|[-/%&|=])s*/g, ' $1 ').trim().replace(/s+/g, ' ');
}
