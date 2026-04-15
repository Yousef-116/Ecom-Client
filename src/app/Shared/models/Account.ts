export interface IRegister {
  email: string;
  password: string;
  userName: string;
  displayName: string;
}

export interface IActive {
  email: string;
  token: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IResetPassword {
  email: string;
  password: string;
  token: string;
}

export interface IAuthResponse {
  message: string;
  token: string;
}
