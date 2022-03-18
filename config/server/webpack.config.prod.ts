import { DefinePlugin, Configuration } from "webpack";

import webpack from "../webpack.config";
import env from "../../environments/prod.env";
import { IndexConfig } from "../helpers";
import { definePlugin, mergeDeep } from "../../utils/function-data";

webpack[IndexConfig.Server] = mergeDeep(webpack[IndexConfig.Server], {
    mode: "production",
    devtool: "source-map",
    plugins: [
        new DefinePlugin(definePlugin(env))
    ]
} as Configuration);

export default webpack[IndexConfig.Server];
