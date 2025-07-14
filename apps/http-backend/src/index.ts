import express from "express";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common";
import { middleware } from "./middleware";
import {CreateUserSchema,SigninSchema,CreateRoomSchema} from "@repo/common/types"
const app = express();

app.get("/",(req,res)=>{
    res.json("hello")
})
app.post("/signup",async (req,res)=>{
    const data = CreateUserSchema.safeParse(req.body)
    if(!data.success){
        return res.json({
            message:"Incorrect Value"
        })
    }
})
app.post("/signin",async (req,res)=>{
   const data = SigninSchema.safeParse(req.body)
    if(!data.success){
        return res.json({
            message:"Incorrect Value"
        })
    }

    const userId = 1;
    const token = jwt.sign({
        userId
    },JWT_SECRET)
    res.json({
        token
    })
})
app.post("/room", middleware ,async (req,res)=>{
    //dbcall
    const data = CreateRoomSchema.safeParse(req.body)
    if(!data.success){
        return res.json({
            message:"Incorrect Value"
        })
    }
    res.json({
        roomId:123
    })
    
})


app.listen(3001)