import { eventTypeModel } from "@server/models/event-type-model";
import { IGenericMeta } from "@server/shared/common-model";

export class EventTypeService {
    public async getAll(): Promise<IGenericMeta[]> {
        return await eventTypeModel.find();
    }

    public async findByCode(code: string): Promise<IGenericMeta> {
        return await eventTypeModel.findOne({ code });
    }
}