import { badRequest } from "@shared/responses";
import { NextFunction, Request, Response } from "express";
import camelcaseKeys from "camelcase-keys";
import jwt from "jsonwebtoken";
import { IUser } from "@server/models/user-model";
import { StorageKey } from "@utils/constant-data";
import store from "store2";

export class GlobalMiddleware {
    public static asyncValidEmail = async (req: Request, res: Response, next: NextFunction) => {
        if (req?.params?.email) {
            next();
        } else {
            badRequest(res);
        }
    }

    public static asyncCamelCase = async (req: Request, res: Response, next: NextFunction) => {
        req.body = camelcaseKeys(req.body, { deep: true });
        req.params = camelcaseKeys(req.params, { deep: true });
        req.query = camelcaseKeys(req.query, { deep: true });
        next();
    }

    public static asyncAuthentication = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const anonymous = ["Authentication/request-token"];
            if (req.url.indexOf(`/data/`) > -1 && !anonymous.some(x => req.url.includes(`/data/${x}`))) {
                const token = req.headers.authorization?.split(" ")?.pop() ?? null;
                jwt.verify(token, process.env.SECRET_KEY);
            }
            next();
        } catch (err) {
            badRequest(res, (err as Error).message);
        }
    }

    public static asyncIsAdmin = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = store.session.get(StorageKey.SERVER_USER_INFO) as IUser;
            const isAdmin = user.role === "Admin";
            if (isAdmin) {
                next();
            } else {
                badRequest(res, "Don't have permission");
            }
        } catch (error) {
            badRequest(res, (error as Error).message);
        }
    }
}