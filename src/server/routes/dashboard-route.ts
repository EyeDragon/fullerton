import { DashboardController } from "@server/controllers/dashboard-controller";
import { GlobalMiddleware } from "@server/middlewares/global-middleware";
import { BaseRoute } from "./base/base-route";

export class DashboardRoute extends BaseRoute {
    protected prefix: string = "Dashboard";

    protected registerRoute() {
        this.router.get("/get-all-booking",
            DashboardController.asyncGetAllBooking);

        this.router.post("/create-booking",
            DashboardController.asyncCreateBooking);

        this.router.put("/update-status",
            GlobalMiddleware.asyncIsAdmin,
            DashboardController.asyncUpdateStatusBooking);

        this.router.delete("/cancel-booking/:id",
            DashboardController.asyncCancelBooking);
    }
}