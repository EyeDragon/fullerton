import { userModel, IUser } from "@server/models/user-model";

export class UserService {
    public async login(username: string) {
        username = username.toLowerCase();
        const result: IUser = await userModel.findOne({ username });
        return result;
    }

}