# vscode-pylsp extension

Unofficial LSP extension for [pylsp](https://github.com/python-lsp/python-lsp-server).
This repository has no affiliation with them.

This extension is very bare bones. It's the bare minimum to have a working LSP client for VSCode.

Due to the modular nature of `pylsp`, which enables you to choose your linter/formatter etc, this extension does not install anything for you. You'll have to do that yourself.
The only requirement is that the `pylsp` executable is available in your `$PATH` environment variable.

For documentation see [pylsp's](https://github.com/python-lsp/python-lsp-server) documentation.

# Installation(VSCode extension only)

## Install from source

```shell
git clone https://github.com/jhzn/vscode-pylsp
cd vscode-pylsp
yarn install_extension
```

# Configuring

Configuring `pylsp` can be done via the `settings.json` file.

See: https://github.com/python-lsp/python-lsp-server/blob/develop/CONFIGURATION.md for the options

# Notice

This is early software, do not expect perfection.

# Hacking on this extension

1. Run `yarn; yarn build; code .` in the root directory
1. Navigate to src/extension.ts
1. Hit F5 to open a new VSCode instance in a debugger running this extension.
1. Navigate to some Python code in VSCode

# Inspiration

https://github.com/microsoft/vscode-extension-samples/blob/main/lsp-sample/client/src/extension.ts

https://github.com/palantir/python-language-server/tree/develop/vscode-client

https://gitlab.com/torokati44/vscode-glspc

# License

[MIT](LICENSE)
