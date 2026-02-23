export interface IRegisterUser {
  name: string;
  email: string;
  password: string;
  username: string;
}

export interface ILoginUser {
  email: string;
  password: string;
}

export interface IUserProfile {
  _id: string;
  name: string;
  email: string;
  username: string;
  createdAt?: string;
  problemsSolved?: number;
  problemsAttempted?: number;
  avatar?: string;
}
