import { eventTypeMapping } from "@server/profiles/meta-mappting";
import { services } from "@server/services";
import { badRequest, successResponse } from "@shared/responses";
import { isEmpty } from "@utils/function-data";
import { NextFunction, Request, Response } from "express";

export class MetaDataController {

    public static asyncGetEventTypes = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const eventTypes = await services.eventTypeService.getAll();
            if (!isEmpty(eventTypes)) {
                const eventTypesView = eventTypes.map(item => eventTypeMapping.view(item));
                successResponse(res, "get all event-type", eventTypesView);
            } else {
                successResponse(res, "empty data");
            }
        } catch (error) {
            badRequest(res, (error as Error).message);
        }
    }
}