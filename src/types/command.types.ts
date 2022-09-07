export interface ICommand {
  readonly name: string;
  execute: (...params: string[]) => void;
}
