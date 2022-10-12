import { StatusCodes } from 'http-status-codes';

export default class HttpError extends Error {
  public httpCode!: StatusCodes;
  public detail?: string;

  constructor({
    httpCode,
    message,
    detail,
  }: {
    httpCode: StatusCodes;
    message: string;
    detail?: string;
  }) {
    super(message);

    this.httpCode = httpCode;
    this.detail = detail;
  }
}
