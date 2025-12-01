export class CustomError extends Error {
  success: boolean;
  code: number;
  data: any;

  constructor(message: string, statusCode: number, data: any = null) {
    super(message);
    this.success = false;
    this.data = data;
    this.code = statusCode;
  }
}
