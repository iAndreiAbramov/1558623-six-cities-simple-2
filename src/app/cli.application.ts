#!/home/andrey/.nvm/versions/node/v16.16.0/bin/node

import { ICLICommand } from '../types/command.types';

type TParsedCommand = {
  [key: string]: string[];
};

export default class CliApplication {
  private commands: { [commandName: string]: ICLICommand } = {};
  private defaultCommand = '--help';

  public registerCommands(commandList: ICLICommand[]): void {
    commandList.forEach((command) => {
      this.commands[command.name] = command;
    });
  }

  public processCommand(argv: string[]): void {
    const parsedCommand = this.parseCommand(argv);
    const [commandName] = Object.keys(parsedCommand);
    const command = this.getCommand(commandName);
    const commandArguments = parsedCommand[commandName] ?? [];
    command.execute(...commandArguments);
  }

  private parseCommand(cliArguments: string[]): TParsedCommand {
    let command = '';
    let parsedArguments: string[] = [];

    cliArguments.forEach((argument) => {
      if (argument.startsWith('--')) {
        command = argument;
        parsedArguments = [];
      } else if (command) {
        parsedArguments.push(argument);
      }
    });

    return command ? { [command]: parsedArguments } : {};
  }

  private getCommand(commandName: string): ICLICommand {
    return this.commands[commandName] ?? this.commands[this.defaultCommand];
  }
}
