import { Request, Response } from "express";
import { CreateSessionInput } from "../schema/auth.schema";
import { findByEmail, findUserById } from "../service/user.service";
import {
  findSessionById,
  signAccessToken,
  signRefreshToken,
} from "../service/auth.service";
import { get } from "lodash";
import { verifyJwt } from "../utils/jwt";

export async function createSessionHandler(
  req: Request<{}, {}, CreateSessionInput>,
  res: Response
) {
  const { email, password } = req.body;
  const user = await findByEmail(email);

  if (!user) {
    return res.send("Invalid Email or Password");
  }
  if (!user.verified) {
    return res.send("Please verify your email");
  }
  const isvalid = await user.validatePassword(password);
  if (!isvalid) {
    return res.send("Invalid Email or Password");
  }
  //   sign a access token and refresh token and send tokens
  const accesstoken = signAccessToken(user);
  const refreshtoken = await signRefreshToken({ userId: user._id.toString() });

  res.send({ accesstoken, refreshtoken });
}

export async function refreshAccessTokenHandler(req: Request, res: Response) {
  const refreshtoken = get(req, "headers.x-refresh") as string;
  const decoded = verifyJwt<{ session: string }>(
    refreshtoken,
    "refreshTokenPublicKey"
  );
  if (!decoded) {
    return res.status(401).send("Could not refresh access token");
  }
  const session = await findSessionById(decoded.session);
  if (!session || !session.valid) {
    return res.status(401).send("Could not refresh access token");
  }
  const user = await findUserById(String(session.user));
  if (!user) {
    return res.status(401).send("Could not refresh access token");
  }
  const accessToken = signAccessToken(user);
  return res.send({ accessToken });
}
