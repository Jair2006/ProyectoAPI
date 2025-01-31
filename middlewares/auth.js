import jwt from "jsonwebtoken";

const SECRET_KEY = "clave_secreta";

export const isAdmin = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    res.status(403).send("Not authorized");
  }
  try {
    const decoded = jwt.verify(token.split(" ")[1], SECRET_KEY);
    console.log(decoded);
    if (!decoded || decoded.role !== "admin") {
      res.status(403).send("Not authorized");
    } else {
      next();
    }
  } catch (err) {
    console.error("Error on Auth", err);
    res.status(500).json({ message: err.message });
  }
};

export const isEmployee = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    res.status(403).send("Not authorized");
  }
  try {
    const decoded = jwt.verify(token.split(" ")[1], SECRET_KEY);
    console.log(decoded);
    if (!decoded || (decoded.role !== "employee" && decoded.role !== "admin")) {
      res.status(403).send("Not authorized");
    } else {
      next();
    }
  } catch (err) {
    console.error("Error on Auth", err);
    res.status(500).json({ message: err.message });
  }
};

export const isClient = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    res.status(403).send("Not authorized");
  }
  try {
    const decoded = jwt.verify(token.split(" ")[1], SECRET_KEY);
    console.log(decoded);
    if (
      !decoded ||
      (decoded.role !== "client" &&
        decoded.role !== "employee" &&
        decoded.role !== "admin")
    ) {
      res.status(403).send("Not authorized");
    } else {
      next();
    }
  } catch (err) {
    console.error("Error on Auth", err);
    res.status(500).json({ message: err.message });
  }
};
