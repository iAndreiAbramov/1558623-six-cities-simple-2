export interface ICLICommand {
  readonly name: string;
  execute: (...params: string[]) => void;
}
