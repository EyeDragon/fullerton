import { Express } from "express";
import { AuthenticationRoute } from "../authentication-route";
import { DashboardRoute } from "../dashboard-route";
import { MetaDataRoute } from "../meta-data-route";
import { IBaseRoute } from "./base-route";

export class RegisterRoute {
    private constructor() { }

    public static init(app: Express) {
        const routes: IBaseRoute[] = [
            AuthenticationRoute,
            DashboardRoute,
            MetaDataRoute
        ];
        routes.forEach(x => (new x()).initialize(app));
    }
}