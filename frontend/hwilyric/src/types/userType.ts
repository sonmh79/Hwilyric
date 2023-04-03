import { ReactElement } from "react";

export interface ISignupTypes {
  email: string;
  password: string;
  nickname: string;
}

export interface ILoginTypes {
  email: string;
  password: string;
}

export interface IModifyTypes {
  nickname: string;
}

export interface IUserInfoTypes {
  userType: string;
  accessToken : string;
}

export interface IPrivateRouteProps {
  component ?: ReactElement; // Router.tsx에서 PrivateRoute가 감싸고 있는 Componet Element
  authenticated : boolean; // true :인증을 반드시 해야하만 접속가능, false : 인증을 반디스 안해야만 접속 가능
}