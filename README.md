![](images/icon.png)

# Add NativeScript Files for VS Code

This extension allows you to add **NativeScript files with snippets included** to your VS Code project.

> Inspired by [Sebastian Baar](https://github.com/sebastianbaar/vscode-add-angular-files).

## Features

Right click on a file or a folder in your current project. There are two options added to the context menu `Add Page` and `Add Component`:

### Add Page

This command adds the following files to your folder (let's assume you typed `home`):
```
home-page.ts
home-page.xml
home-page.css
home-view-model.ts
```

### Add Component

This command adds the following files to your folder (let's assume you typed `clock`):
```
clock-component.ts
clock-component.xml
clock-component.css
```

**The naming of the files as well as the snippets are based on the official Hello World typescript template**

## Installation

1. Install Visual Studio Code 1.12.0 or higher
2. Launch Code
3. From the command palette `Ctrl`-`Shift`-`P` (Windows, Linux) or `Cmd`-`Shift`-`P` (OSX)
4. Select `Install Extension`
5. Type `add angular files` and press enter
6. Reload Visual Studio Code

# Disclaimer

**Important:** This extension due to the nature of it's purpose will create
files on your hard drive.
While it should not override any files during this process, I'm not giving any guarantees
or take any responsibility in case of lost data.

# License

MIT
