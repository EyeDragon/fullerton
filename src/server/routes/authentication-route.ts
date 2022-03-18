import { AuthenticationController } from "@server/controllers/authentication-controller";
import { BaseRoute } from "./base/base-route";

export class AuthenticationRoute extends BaseRoute {
    protected prefix: string = "Authentication";

    protected registerRoute() {
        this.router.post("/request-token/",
            AuthenticationController.asyncLogin,
            AuthenticationController.asyncRequestToken);

        this.router.get("/check-access-page/:page",
            AuthenticationController.asyncCheckAccessPage);

        this.router.get("/is-admin/",
            AuthenticationController.asyncIsAdmin);

        this.router.post("/sign-out",
            AuthenticationController.asyncSignOut);
    }
}