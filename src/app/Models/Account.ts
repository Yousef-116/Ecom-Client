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
