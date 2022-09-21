export interface IDBClient {
  connect: (uri: string) => void;
  disconnect: () => void;
}
