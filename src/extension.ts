'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { AddPage } from './add-page';
import { AddComponent } from './add-component';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "vscode-add-nativescript-files" is now active!');

  var addPage = vscode.commands.registerCommand('extension.addPage', (args) => {
    const addPage: AddPage = new AddPage();
    addPage.showFileNameDialog(args)
      .then(addPage.createFiles)
      .then(addPage.openFileInEditor)
      .catch((err) => {
        if (err) {
          vscode.window.showErrorMessage(err);
        }
      });
  });

  var addComponent = vscode.commands.registerCommand('extension.addComponent', (args) => {
    const addComponent: AddComponent = new AddComponent();
    addComponent.showFileNameDialog(args)
      .then(addComponent.createFiles)
      .then(addComponent.openFileInEditor)
      .catch((err) => {
        if (err) {
          vscode.window.showErrorMessage(err);
        }
      });
  });

  context.subscriptions.push(addPage);
  context.subscriptions.push(addComponent);
}

// this method is called when your extension is deactivated
export function deactivate() {
}