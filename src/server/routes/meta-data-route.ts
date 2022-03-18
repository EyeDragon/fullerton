import { MetaDataController } from "@server/controllers/meta-data-controller";
import { BaseRoute } from "./base/base-route";

export class MetaDataRoute extends BaseRoute {
    protected prefix: string = "MetaData";

    protected registerRoute() {
        this.router.get("/event-types/",
            MetaDataController.asyncGetEventTypes);
    }
}