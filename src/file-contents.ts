export class FileContents {

    private camelCase (input: string): string {
        return input.replace( /-([a-z])/ig, function( all, letter ) {
            return letter.toUpperCase();
        });
    }

    public pageContent(inputName: string): string {
        var inputUpperCase: string = this.inputToUpperCase(inputName);
        var pageContent: string = `<Page xmlns="http://schemas.nativescript.org/tns.xsd" navigatingTo="navigatingTo" class="page">\n` +
            `<Page.actionBar>\n` +
            `\t<ActionBar title="${inputUpperCase} Page" icon="" class="action-bar">\n` +
            `\t\t</ActionBar>\n` +
            `\t</Page.actionBar>\n` +
            `\t<Label class="${inputName}-page" text="${inputUpperCase} Page!"/>\n` +
            `</Page>`;
        return pageContent;
    }

    public pageCodeContent(inputName: string): string {
        var inputUpperCase: string = this.inputToUpperCase(inputName);
        var pageCodeContent: string = `import { EventData } from 'data/observable';\n` +
            `import { Page } from 'ui/page';\n` +
            `import { ${inputUpperCase}ViewModel } from './${inputName}-view-model';\n` +
            `\n` +
            `export function navigatingTo(args: EventData) {\n` +
            `\tlet page = <Page>args.object;\n` +
            `\tpage.bindingContext = new ${inputUpperCase}ViewModel();\n` +
            `}`;
        return pageCodeContent;
    }

    public viewModelContent(inputName: string): string {
        var inputUpperCase: string = this.inputToUpperCase(inputName);
        var viewModelContent: string = `import {Observable} from 'data/observable';\n` +
            `\n` +
            `export class ${inputUpperCase}ViewModel extends Observable {\n` +
            `\n` +
            `\tconstructor() {\n` +
                `\t\tsuper();\n` +
                `\n` +
            `\t}\n` +
            `\n` +
            `}`;     
        return viewModelContent;
    }

    public componentContent(inputName: string): string {
        var inputUpperCase: string = this.inputToUpperCase(inputName);
        var componentContent: string = `\n` + 
            `<!-- http://moduscreate.com/custom-components-in-nativescript/ -->\n` +
            `\n` +
            `<Label class="${inputName}-component" loaded="onLoaded" text="${inputUpperCase} Component!"/>`;
        return componentContent;
    }

    public componentCodeContent(inputName: string): string {
        var inputUpperCase: string = this.inputToUpperCase(inputName);
        var componentCodeContent: string = `import { EventData } from 'data/observable'\n` +
            `\n` +
            `// http://moduscreate.com/custom-components-in-nativescript/\n` +
            `\n` +
            `export function onLoaded(args: EventData) {\n` +
             `\tvar label = args.object;\n` +
             `}`;
        return componentCodeContent;
    }

    public cssContent(inputName: string, fileName: string): string {
        var cssContent: string = `.${inputName}-${fileName} {\n\n}`;
        return cssContent;
    }

    inputToUpperCase(inputName: string): string {
        var inputUpperCase: string;       
        inputUpperCase = inputName.charAt(0).toUpperCase() + inputName.slice(1);
        return this.camelCase(inputUpperCase);
    }
}