import { ICLICommand } from '../types/command.types';

class HelpCommand implements ICLICommand {
  readonly name = '--help';

  execute(): void {
    console.log(`
        Программа для подготовки данных для REST API сервера.
        Пример:
            main.js --<command> [--arguments]
        Команды:
            --version:                   # выводит номер версии
            --help:                      # печатает этот текст
            --import <path>:             # импортирует данные из TSV
            --generator <n> <path> <url> # генерирует произвольное количество тестовых данных
        `);
  }
}

export const helpCommand = new HelpCommand();
