import { Document, Schema, model } from "mongoose";
import { IEntity } from "./common";

export interface IUser extends IEntity {
  username: string;
  password: string;
}

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Number, required: true },
  updatedAt: { type: Number, required: true },
});

export const UsersModel = model<IUser>("user", UserSchema);
export type UserDoc = IUser & Document;
