import express from "express";
import { singUp } from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post('/singUp',(req, res) =>{
    singUp(req.body).then((data)=>{
        res.status(200).json(data);
    }).catch((err) =>{
        console.error("Error on POST /singUp route: ", err);
        res.status(500).json({message: message});
    })
})

export default authRouter;