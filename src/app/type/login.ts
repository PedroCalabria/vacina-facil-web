export type Login = {
  email: string;
  password: string;
};

export type UserToken = {
  token: string;
  refreshToken: string;
};

export type TokenDTO = {
  idPatient: number;
  name: string;
  email: string;
  birthDate: string;
};

export type JwtPayload = {
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid'?: string;
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name': string;
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress': string;
  "birthDate": string;
  jti?: string;
  exp?: number;
  iss?: string;
  aud?: string;
};
