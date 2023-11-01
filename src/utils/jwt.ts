import jwt from "jsonwebtoken";
import config from "config";

export function signJwt(
  object: Object,
  keyName: "accessTokenPrivateKey" | "refreshTokenPrivateKey",
  options?: jwt.SignOptions | undefined
) {
  const signingKey = Buffer.from(config.get(keyName)).toString("base64");
  console.log(keyName);
  console.log(signingKey);
  return jwt.sign(object, signingKey, {
    ...options,
    algorithm: "HS256",
  });
}

export function verifyJwt<T>(
  token: string,
  keyName: "accessTokenPublicKey" | "refreshTokenPublicKey"
): T | null {
  const publickey = Buffer.from(config.get<string>(keyName), "base64").toString(
    "ascii"
  );
  try {
    const decoded = jwt.verify(token, publickey) as T;
    return decoded;
  } catch (error) {
    return null;
  }
}
