import CliApplication from './app/cli.application';
import { helpCommand } from './cli-command/help.command';
import { versionCommand } from './cli-command/version.command';

const CLIManager = new CliApplication();
CLIManager.registerCommands([helpCommand, versionCommand]);
CLIManager.processCommand(process.argv);
