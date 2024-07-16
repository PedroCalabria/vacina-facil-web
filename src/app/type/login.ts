export type Login = {
  email: string;
  password: string;
};

export type UserToken = {
  token: string;
  refreshToken: string;
};

export type TokenDTO = {
  name: string;
  email: string;
};

export type JwtPayload = {
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid'?: string;
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name': string;
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress': string;
  jti?: string;
  exp?: number;
  iss?: string;
  aud?: string;
};
