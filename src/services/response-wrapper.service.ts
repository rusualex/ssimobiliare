import { IWrappedResponse } from '../model/wrapped-response.model';

export class ResponseWrapperService {
  wrapOk(payload: any): IWrappedResponse {
    return {
      data: payload
    };
  }

  wrapException(error: any): IWrappedResponse {
    return {
      status: 'error',
      message: error.message,
      typeId: error.typeId
    };
  }

  wrapToken(message: any): IWrappedResponse {
    return {
      status: 'error',
      message
    }
  }
}
