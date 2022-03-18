import express from "express";

export abstract class BaseRoute {
    protected readonly router: express.Router = express.Router();

    protected abstract readonly prefix: string;
    protected abstract registerRoute();

    public initialize(app: express.Express) {
        this.registerRoute();
        app.use(`/${process.env.LOCAL_BE}/${this.prefix}`, this.router);
    }
}

type TypeBaseRoute = { new(): BaseRoute; }
export interface IBaseRoute extends TypeBaseRoute { };