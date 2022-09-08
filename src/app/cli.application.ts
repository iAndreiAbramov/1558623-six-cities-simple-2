import { ICLICommand } from '../types/command.types';

type ParsedCommand = {
  [key: string]: string[];
}

export default class CliApplication {
  private commands: { [propertyName: string]: ICLICommand } = {};
  private defaultCommand = '--help';

  private parseCommand(cliArguments: string[]): ParsedCommand {
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

    return command ? { command: parsedArguments } : {};
  }

  public registerCommands(commandList: ICLICommand[]): void {
    commandList.forEach((command) => {
      this.commands[command.name] = command;
    });
  }

  private getCommand(commandName: string): ICLICommand {
    return this.commands[commandName] ?? this.commands[this.defaultCommand];
  }

  public processCommand(argv: string[]): void {
    const parsedCommand = this.parseCommand(argv);
    const [commandName] = Object.keys(parsedCommand);
    const command = this.getCommand(commandName);
    const commandArguments = parsedCommand[commandName] ?? [];
    command.execute(...commandArguments);
  }
}
