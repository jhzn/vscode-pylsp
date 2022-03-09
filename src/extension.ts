/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
"use strict";

import { commands, window, workspace, ExtensionContext } from "vscode";
import {
  LanguageClient,
  LanguageClientOptions,
  ServerOptions,
} from "vscode-languageclient/node";

const lspConfigKey = "pylsp";
let client: LanguageClient;

function getLanguageClient(
  command: string,
  args: string[],
  documentSelector: string[]
): LanguageClient {
  const serverOptions: ServerOptions = {
    command,
    args,
  };
  const clientOptions: LanguageClientOptions = {
    documentSelector: documentSelector,
    synchronize: {
      configurationSection: lspConfigKey,
    },
  };
  return new LanguageClient(command, serverOptions, clientOptions);
}

export async function activate(context: ExtensionContext) {
  let executable = workspace
    .getConfiguration(lspConfigKey)
    .get<string>("executable");
  if (!executable) {
    window.showErrorMessage(
      "'pylsp' executable was not found in $PATH. Follow install guide: https://github.com/python-lsp/python-lsp-server"
    );
    return;
  }
  const getClient = () => getLanguageClient(executable, ["-vv"], ["python"]);

  client = getClient();
  context.subscriptions.push(client.start());

  context.subscriptions.push(
    commands.registerCommand(`${lspConfigKey}.restartServer`, async () => {
      await killServer();
      client = getClient();
      client.start();
    })
  );
}

export function deactivate(): Thenable<void> | undefined {
  return killServer();
}

async function killServer(): Promise<void> {
  await client.stop();
}
