import * as IGenericMetaClient from "@client/entities/meta-models";
import { IGenericMeta } from "@server/shared/common-model";
import { services } from "@server/services";

export const eventTypeMapping = {
    view: (model: IGenericMeta): IGenericMetaClient.IGenericMeta => {
        return {
            code: model.code,
            label: model.label
        }
    },
    model: async (code: string): Promise<IGenericMeta> => {
        const result = await services.eventTypeService.findByCode(code);
        return {
            _id: result._id,
            code: result.code,
            label: result.label
        }
    }
};