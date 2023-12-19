export interface Response {
  result: any;
  success: boolean;
  message: string;
  status: number;
  timestamp: number;
  id: number;
}

export enum Status {
  IDLE,
  LOADING,
  SUCCESS,
  ERROR,
}
