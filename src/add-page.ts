import { window, workspace, TextEditor } from 'vscode';
import { FileContents } from './file-contents';
import { IFiles } from './file';
import * as fs from 'fs';
import * as path from 'path';
import * as Q from 'q';

export class AddPage {

  // Show input prompt for folder name 
  // The imput is also used to create the files with the respective name
  public showFileNameDialog(args): Q.Promise<string> {

    const deferred: Q.Deferred<string[]> = Q.defer<string[]>();
    var clickedFolderPath: string;

    if (args) {
      clickedFolderPath = args.fsPath
    }
    else {
      if (!window.activeTextEditor) {
        deferred.reject('Please open a file first.. or just right-click on a file/folder and use the context menu!');
        return deferred.promise;
      } else {
        clickedFolderPath = path.dirname(window.activeTextEditor.document.fileName);
      }
    }
    var newFolderPath: string = fs.lstatSync(clickedFolderPath).isDirectory() ? clickedFolderPath : path.dirname(clickedFolderPath);

    if (workspace.rootPath === undefined) {
      deferred.reject('Please open a project first. Thanks! :-)');
    }
    else {
      window.showInputBox({
        prompt: 'What\'s the name of the new page?',
        value: ''
      }).then(
        (fileName) => {
          if (!fileName || /[~`!#$%\^&*+=\[\]\\';,/{}|\\":<>\?\s]/g.test(fileName)) {
            deferred.reject('That\'s not a valid name! (no whitespaces or special characters)');
          } else {
            var params: string[] = [];
            params.push(newFolderPath);
            params.push(fileName);
            deferred.resolve(params);
          }
        },
        (error) => console.error(error)
        );
    }
    return deferred.promise;
  }

  // Get file contents and create the new files in the folder 
  public createFiles(params: string[]): Q.Promise<string> {

    const deferred: Q.Deferred<string> = Q.defer<string>();
    var folderName: string = params[0];
    var inputName: string = params[1];
    const fc: FileContents = new FileContents();
    const af: AddPage = new AddPage();

    // create an IFiles array including file names and contents
    var files: IFiles[] = [
      {
        name: path.join(folderName, `${inputName}-page.xml`),
        content: fc.pageContent(inputName)
      },
      {
        name: path.join(folderName, `${inputName}-page.ts`),
        content: fc.pageCodeContent(inputName)
      },
      {
        name: path.join(folderName, `${inputName}-view-model.ts`),
        content: fc.viewModelContent(inputName)
      },
      {
        name: path.join(folderName, `${inputName}-page.css`),
        content: fc.cssContent(inputName, "page")
      }
    ];

    // write files
    af.writeFiles(files).then((errors) => {
      if (errors.length > 0) {
        window.showErrorMessage(`${errors.length} file(s) could not be created. I'm sorry :-(`);
      }
      else {
        deferred.resolve(params);
      }
    });

    return deferred.promise;
  }

  public writeFiles(files: IFiles[]): Q.Promise<string[]> {

    const deferred: Q.Deferred<string[]> = Q.defer<string[]>();
    var errors: string[] = [];

    files.forEach(file => {
      fs.writeFile(file.name, file.content, (err) => {
        if (err) { errors.push(err.message) }
        deferred.resolve(errors);
      });
    });
    return deferred.promise;
  }

  // Open the created page in the editor
  public openFileInEditor(params: string[]): Q.Promise<TextEditor> {

    const deferred: Q.Deferred<TextEditor> = Q.defer<TextEditor>();
    var folderName: string = params[0];
    var inputName: string = params[1];
    var fullFilePath: string = path.join(folderName, `${inputName}-page.xml`);

    workspace.openTextDocument(fullFilePath).then((textDocument) => {
      if (!textDocument) { return; }
      window.showTextDocument(textDocument).then((editor) => {
        if (!editor) { return; }
        deferred.resolve(editor);
      });
    });

    return deferred.promise;
  }
}