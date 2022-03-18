import { genericMeta, IGenericMeta } from "@server/shared/common-model";
import { Document, model, Schema } from "mongoose";

const eventTypeSchema = new Schema<IGenericMeta>({
    ...genericMeta
});

export const eventTypeModel = model<IGenericMeta & Document>("EventType", eventTypeSchema, "EventType");