import { ILogin } from "@client/entities/global-model";
import { IUser } from "@server/models/user-model";
import { userMapping } from "@server/profiles/user-mapping";
import { services } from "@server/services";
import { badRequest, successResponse } from "@shared/responses";
import { StorageKey } from "@utils/constant-data";
import { isEmpty, isNullOrUndefined } from "@utils/function-data";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import moment from "moment";
import store from "store2";
import bcrypt from "bcrypt";

export class AuthenticationController {

    public static asyncLogin = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userModel = userMapping.model(req.body);
            const user = await services.userService.login(userModel.username);

            if (!isNullOrUndefined(user)) {
                const compare = bcrypt.compareSync(userModel.password, user.password);
                if (compare) {
                    store.session.set(StorageKey.SERVER_USER_INFO, user);
                    next();
                } else {
                    successResponse(res, "failed");
                }
            } else {
                successResponse(res, "failed");
            }
        } catch (error) {
            badRequest(res, (error as Error).message);
        }
    }

    public static asyncSignOut(req: Request, res: Response, next: NextFunction) {
        store.session.remove(StorageKey.SERVER_USER_INFO);
        successResponse(res, "sign out", true);
    }

    public static asyncRequestToken = async (req: Request, res: Response) => {
        try {
            const user = store.session.get(StorageKey.SERVER_USER_INFO) as IUser;
            const startedTime = new Date();
            const expiredTime = moment(startedTime).add(7, "days").toDate();
            const token = jwt.sign(
                {
                    sub: user.username,
                    exp: Math.floor(expiredTime.getTime() / 1000)
                },
                process.env.SECRET_KEY
            );
            const decode = jwt.decode(token, { complete: true });
            successResponse(res, "", {
                accessToken: token,
                tokenType: decode.header.typ,
                startedTime: startedTime.toLocaleDateString(),
                expiredTime: expiredTime.toLocaleDateString()
            } as ILogin);
        } catch (error) {
            badRequest(res, (error as Error).message);
        }
    }

    public static asyncCheckAccessPage = async (req: Request, res: Response) => {
        try {
            const isAccess = !isEmpty(store.session.get(StorageKey.SERVER_USER_INFO));
            const message = !isAccess ? "Don't have permission" : "";
            successResponse(res, message, isAccess);
        } catch (error) {
            badRequest(res, (error as Error).message);
        }
    }

    public static asyncIsAdmin = async (req: Request, res: Response) => {
        try {
            const user = store.session.get(StorageKey.SERVER_USER_INFO) as IUser;
            const isAdmin = user.role === "Admin";
            successResponse(res, "Welcome", isAdmin);
        } catch (error) {
            badRequest(res, (error as Error).message);
        }
    }
}