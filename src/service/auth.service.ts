import { DocumentType } from "@typegoose/typegoose";
import { User, privateFields } from "../model/user.model";
import { signJwt } from "../utils/jwt";
import { omit } from "lodash";
import SessionModel, { Session } from "../model/session.model";

export function signAccessToken(user: DocumentType<User>) {
  const payload = omit(user.toJSON(), privateFields);
  const accesstoken = signJwt(payload, "accessTokenPrivateKey", {
    expiresIn: "15m",
  });
  return accesstoken;
}

export async function signRefreshToken({ userId }: { userId: string }) {
  const session = await createSessionHandler({
    userId,
  });
  const refreshtoken = signJwt(
    { session: session._id },
    "refreshTokenPrivateKey",
    {
      expiresIn: "1y",
    }
  );
  return refreshtoken;
}

export async function createSessionHandler({ userId }: { userId: string }) {
  return SessionModel.create({ user: userId });
}

export async function findSessionById(id: string) {
  return SessionModel.findById(id);
}
