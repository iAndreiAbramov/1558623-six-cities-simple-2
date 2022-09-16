export interface ICLICommand {
  readonly name: string;
  execute: (...params: string[]) => Promise<void> | void;
}

export interface IFileReader {
  readonly filename: string;
  read: () => void;
}
