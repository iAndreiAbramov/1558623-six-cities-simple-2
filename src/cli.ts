#!/Users/user/.nvm/versions/node/v16.16.0/bin/node

import CliApplication from './app/cli.application.js';
import { helpCommand } from './cli-command/help.command.js';
import { versionCommand } from './cli-command/version.command.js';
import { importCommand } from './cli-command/import.command.js';

const CLIManager = new CliApplication();
CLIManager.registerCommands([helpCommand, versionCommand, importCommand]);
CLIManager.processCommand(process.argv);
