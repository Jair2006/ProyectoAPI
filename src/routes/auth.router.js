import express from "express";
import { logIn, singUp } from "../controllers/auth.controller.js";


const authRouter = express.Router();

authRouter.post("/singUp", (req, res) => {
  singUp(req.body)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.error("Error on POST /singUp route: ", err);
      res.status(500).json({ message: err });
    });
});

authRouter.post("/logIn", (req, res) => {
  logIn(req.body)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.error("Error on POST /logIn route: ", err);
      res.status(500).json({ message: err.message });
    });
});

export default authRouter;
