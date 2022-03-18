import { IGenericMeta } from "@client/entities/meta-models";
import { RESPONSE_STATUS } from "@utils/constant-data";
import { BaseAdapter } from "./base/base-adapter";

class MetaDataAdapter extends BaseAdapter {

    public async getEventTypes() {
        const result = await this.GET<IGenericMeta[]>({
            url: "event-types"
        });
        if (result.status === RESPONSE_STATUS.SUCCESS) {
            return result.data;
        }
        return null;
    }

}

export const metaDataAdapter = new MetaDataAdapter("MetaData");