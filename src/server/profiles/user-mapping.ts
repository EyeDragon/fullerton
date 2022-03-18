import * as IUserClient from "@client/entities/user-model";
import * as IUserSever from "@server/models/user-model";

export const userMapping = {
    view: (model: IUserSever.IUser): IUserClient.IUser => {
        return {
            username: model?.username ?? null,
            role: model.role
        }
    },
    model: (model: IUserClient.IUser): IUserSever.IUser => {
        return {
            username: model.username ?? null,
            password: model.password,
            role: model.role
        }
    }
};