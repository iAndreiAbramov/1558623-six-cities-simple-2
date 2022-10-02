export interface IDbClient {
  connect: (uri: string) => void;
  disconnect: () => void;
}
