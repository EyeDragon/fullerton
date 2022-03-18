import { ILogin } from "@client/entities/global-model";
import { IUser } from "@client/entities/user-model";
import { RESPONSE_STATUS } from "@utils/constant-data";
import { BaseAdapter } from "./base/base-adapter";

class AuthenticationAdapter extends BaseAdapter {

    public async asyncRequestToken(param: IUser) {
        const result = await this.POST<ILogin>({
            url: "request-token",
            body: param
        });
        if (result.status === RESPONSE_STATUS.SUCCESS) {
            return result.data;
        }
        return null;
    }

    public async asyncRemoveSession() {
        const result = await this.POST<boolean>({
            url: "sign-out"
        });
        return result.status;
    }

    public async asyncCheckAccessPage(keyPage: string) {
        const result = await this.GET<boolean>({
            url: "check-access-page",
            params: {
                page: keyPage
            }
        });
        if (result.status === RESPONSE_STATUS.SUCCESS) {
            return result.data;
        }
        return false;
    }

    public async asyncIsAdmin() {
        const result = await this.GET<boolean>({
            url: "is-admin"
        });
        if (result.status === RESPONSE_STATUS.SUCCESS) {
            return result.data;
        }
        return false;
    }
}

export const authenticationAdapter = new AuthenticationAdapter("Authentication");