import { NextFunction, Request, Response } from "express";

export const welcome = (req:Request, res:Response, next:NextFunction)=>{
    console.log(`Visitor is arrived in ${req.url}`)
    next()
}