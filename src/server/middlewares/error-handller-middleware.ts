import { serverError } from "@shared/responses";
import { NextFunction, Request, Response, Errback } from "express";

export class ErrorHandllerMiddleware {
    public static asyncCatchNotFound = async (req: Request, res: Response, next: NextFunction) => { 
        next("This route it not found");
    }

    public static asyncServerError = async (err: Errback, req: Request, res: Response, next: NextFunction) => {
        serverError(res, err);
    }
}