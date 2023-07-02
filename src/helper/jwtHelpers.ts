import jwt, { JwtPayload, Secret } from 'jsonwebtoken';

export const createToken = (
  payload: Record<string, unknown>,
  secret: Secret,
  expireTime: string
) => {
  const token = jwt.sign(payload, secret, { expiresIn: expireTime });
  return token;
};

export const verifyToken = (token: string, secret: Secret): JwtPayload => {
  return jwt.verify(token, secret) as JwtPayload;
};
