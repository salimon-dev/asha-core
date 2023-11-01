import { Request, Response } from "express";
import * as yup from "yup";
import { UsersModel } from "../../models/user";
import { generateJWT, md5 } from "../../utils/jwt";
import { now } from "../../utils/time";

function validate(req: Request, res: Response) {
  const validationSchema = yup.object({
    username: yup.string().required(),
    password: yup.string().required(),
  });
  try {
    const body = validationSchema.validateSync(req.body, { abortEarly: false });
    return body;
  } catch (err) {
    const error = err as yup.ValidationError;
    res.status(400).send(error.inner.map((item) => ({ path: item.path, message: item.message })));
  }
}

export default async function register(req: Request, res: Response) {
  const body = validate(req, res);
  if (!body) return;
  const user = await UsersModel.create({
    username: body.username,
    password: md5(body.password),
    createdAt: now(),
    updatedAt: now(),
  });
  const token = generateJWT(user._id.toString(), 3600);
  res.send({ user, token, expiresAt: now() + 3600 });
}
