import { ICLICommand } from '../types/command.types';
import { logCyan } from '../utils/chalk.utils.js';
import chalk from 'chalk';

class HelpCommand implements ICLICommand {
  readonly name = '--help';

  execute(): void {
    logCyan(`
        ${chalk.bold.underline.blue('Программа для подготовки данных для REST API сервера.')}
        ${chalk.underline.blue('Пример:')}
            main.js --<command> [--arguments]
        ${chalk.underline.blue('Команды:')}
            --version:                   # выводит номер версии
            --help:                      # печатает этот текст
            --import <path>:             # импортирует данные из TSV
            --generate <n> <path> <url>  # генерирует n тестовых данных
        `);
  }
}

export const helpCommand = new HelpCommand();
