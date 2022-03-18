import { DefinePlugin, Configuration } from "webpack";
import NodemonPlugin from "nodemon-webpack-plugin";

import webpack from "../webpack.config";
import env from "../../environments/dev.env";
import { IndexConfig, root } from "../helpers";
import { definePlugin, mergeDeep } from "../../utils/function-data";

webpack[IndexConfig.Server] = mergeDeep(webpack[IndexConfig.Server], {
    mode: "development",
    watch: true,
    devtool:  "cheap-module-source-map",
    plugins: [
        new DefinePlugin(definePlugin(env)),
        new NodemonPlugin({
            "script": `${root("dist/server/server.js")}`,
            "ignore": ["*.js.map", "js/*", "*.html"],
            "env": env,
            "delay": 500
        })
    ]
} as Configuration);

export default webpack[IndexConfig.Server];
