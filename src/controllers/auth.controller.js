import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SECRET_KEY = "clave_secreta";

export const singUp = async (body) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(body.password, saltRounds);

  let payload = {
    name: body.name,
    lastname: body.lastname,
    email: body.email,
    password: hashedPassword,
    birthdate: body.birthdate,
    role: body.role,
  };

  let data = await User.create(payload);
  return data;
};

export const logIn = async (body) => {
  const email = body.email;
  let user = await User.findOne({ where: { email: email } });
  if (!user) {
    throw new Error("Email not found");
  }
  if (await bcrypt.compare(body.password, user.password)) {
    const userInfo = {
      id: user.id,
      email: user.email,
      name: user.name,
      lastname: user.lastname,
      role: user.role,
    };
    const token = jwt.sign(userInfo, SECRET_KEY, { expiresIn: 10 * 60 });
    return { token: token };
  } else {
    throw new Error("Password incorrect");
  }
};
