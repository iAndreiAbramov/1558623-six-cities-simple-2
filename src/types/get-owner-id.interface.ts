export interface IGetOwnerId {
  getOwnerId(documentId: string): Promise<string | void | Buffer | undefined>
}
