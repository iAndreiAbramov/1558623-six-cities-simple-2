export interface ICLICommand {
  readonly name: string;
  execute: (...params: string[]) => void;
}

export interface IFileReader {
  readonly filename: string;
  read: () => void;
}
