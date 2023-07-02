/* eslint-disable @typescript-eslint/no-this-alias */
import { IUser, IUserMethods, UserModel } from './user.interface';
import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import config from '../../../config';
const userSchema = new Schema<IUser, Record<string, never>, IUserMethods>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    needPasswordChange: {
      type: Boolean,
      default: true,
    },
    passwordChangeAt: {
      type: Date,
    },
    student: {
      type: Schema.Types.ObjectId,
      ref: 'student',
    },

    faculty: {
      type: Schema.Types.ObjectId,
      ref: 'faculty',
    },
    admin: {
      type: Schema.Types.ObjectId,
      ref: 'admin',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

userSchema.methods.isUserExist = async function (
  id: string
): Promise<Partial<IUser> | null> {
  return await User.findOne(
    { id },
    { id: 1, password: 1, needPasswordChange: 1, role: 1 }
  );
};

userSchema.methods.isPaswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};

userSchema.pre('save', async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_solt_round)
  );

  next();
});

export const User = model<IUser, UserModel>('user', userSchema);
